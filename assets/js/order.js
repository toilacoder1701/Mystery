window.onload = () => {
    let sectionUser = JSON.parse(window.localStorage.getItem('sectionUserName'));
    console.log(sectionUser);
    if (sectionUser.role === 'user') {
        renderOrderUser(sectionUser.username);
    } else {
        renderOrder();
    }
}

function renderOrder() {
    let orderList = JSON.parse(localStorage.getItem('cartList'));
    let htmls = orderList.map(order => {
        return `
        <li class="order__info">
            <span class="order__data --1">${order.id}</span>
            <span class="order__data --2">${order.user.name}</span>
            <span class="order__data --3">${order.date}</span>
            <span class="order__data --4">${formatPrice(order.total)}</span>
            <span class="order__data --5>Đang xử lý</span>
            <span class="btn order__data --6" onclick="handleChangeStatus('${order.id}')">Xem chi tiết</span>
        </li>
        `
    })
    document.querySelector('.order-wrapper').innerHTML = htmls.join('');
}

function renderOrderUser(username) {
    let orderList = JSON.parse(localStorage.getItem('cartList'));
    let filterList = orderList.filter(order => order.user.username === username);
    console.log(filterList);
    let htmls = filterList.map(order => {
        return `
        <li class="order__info">
            <div class="order__data --1">${order.id}</div>
            <div class="order__data --2">${order.user.name}</div>
            <div class="order__data --3">${order.date}</div>
            <div class="order__data --4">${formatPrice(order.total)}</div>
            <div class="order__data --5">Đang xử lý</div>
            <div class="btn order__data --6" onclick="handleChangeStatus('${order.id}')">Xem chi tiết</div>
        </li>
                
        `
    })
    document.querySelector('.order-wrapper').innerHTML = htmls.join('');
}
function handleChangeStatus(id) {
    let orderList = JSON.parse(localStorage.getItem('cartList'));
    let index = orderList.findIndex(product => product.id === id);
    localStorage.setItem('orderToView', JSON.stringify(orderList[index]));
    window.location.replace('./viewOrder.html');
}

function handleDeleteOrder(id) {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    let index = cartList.findIndex(order => order.id === id);
    cartList.splice(index, 1);
    localStorage.setItem('cartList', JSON.stringify(cartList))
    let sectionUser = JSON.parse(window.localStorage.getItem('sectionUserName'));
    renderOrderUser(sectionUser.username);
}