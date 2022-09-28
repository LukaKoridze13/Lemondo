import data from '../Data/data.js';
import Data from '../Data/data.js'
let domains = Data.domainList;
let categories = Data.categories;
let domainZones = [];

// Creating available domains list
domains.forEach((dom) => {
    if (!domainZones.includes(dom.domainExtension)) {
        domainZones.push(dom.domainExtension);
    }
})

// Domains on the market
let domainCount = document.querySelector('.domenebiMarketze span')
domainCount.innerText = domains.length

// Sorting
let sorters = document.querySelectorAll('.sorters p')
let sortImage = document.createElement('img')
sortImage.style.marginLeft = '5px'
sortImage.src = '../Images/sort.svg'
sorters.forEach((option) => {
    option.addEventListener('click', (e) => {
        sorters.forEach((item) => {
            if (item.classList.contains('activeSort')) {
                item.children[0].remove();
            }
            item.classList.remove('activeSort')
        })
        option.classList.add('activeSort')
        option.appendChild(sortImage)
    })
})


// Categories
let categoriesDiv = document.querySelector('.categoriesDiv')
categories.forEach((category) => {
    let box = document.createElement('div')
    box.style.display = 'flex'
    box.style.alignItems = 'center'
    box.style.marginTop = '25px'
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = category.name
    checkbox.id = category.name
    let label = document.createElement('label')
    label.setAttribute('for', category.name)
    label.innerText = category.name
    box.appendChild(checkbox)
    box.appendChild(label)
    categoriesDiv.appendChild(box)
})

// Domain Zones
let domainZone = document.querySelector('.domainZones')
domainZones.forEach((zone) => {
    let box = document.createElement('div')
    box.style.display = 'flex'
    box.style.alignItems = 'center'
    box.style.marginTop = '25px'
    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.name = zone
    checkbox.id = zone
    let label = document.createElement('label')
    label.setAttribute('for', zone)
    label.innerText = zone
    box.appendChild(checkbox)
    box.appendChild(label)
    domainZone.appendChild(box)
})

// Products
let parent = document.querySelector('main .products .content_desktop .middle .right')
let parentMobile = document.querySelector('.content_mobile .right')

drawCards();

function drawCards() {
    domains.forEach((product, index) => {
        let card = document.createElement('div');
        let left = document.createElement('div');
        let right = document.createElement('div');
        let img = document.createElement('img');
        img.src = '../Images/btn_dropdown.svg'
        let name = document.createElement('p');
        name.innerText = product.domainName + product.domainExtension;
        let priceGel = document.createElement('p');
        priceGel.innerText = product.price + " ₾";
        let priceUsd = document.createElement('p');
        priceUsd.innerText = Math.round(product.price / 2.85 * 10) / 10 + " $";
        let div = document.createElement('div');
        let cart = document.createElement('img');
        cart.src = '../Images/cart_white.svg';


        // Appends
        parent.appendChild(card)
        card.appendChild(left);
        card.appendChild(right);
        left.appendChild(img);
        left.appendChild(name);
        right.appendChild(div);
        right.appendChild(cart);
        div.appendChild(priceGel);
        div.appendChild(priceUsd);

        // CLassing
        card.classList.add('cardModel');
        left.classList.add('leftCard');
        right.classList.add('rightCard');
        priceGel.classList.add('gel');
        priceUsd.classList.add('usd');

    })
    domains.forEach((product, index) => {
        let card = document.createElement('div');
        let left = document.createElement('div');
        let right = document.createElement('div');
        let img = document.createElement('img');
        img.src = '../Images/btn_dropdown.svg'
        let name = document.createElement('p');
        name.innerText = product.domainName + product.domainExtension;
        let priceGel = document.createElement('p');
        priceGel.innerText = product.price + " ₾";
        let priceUsd = document.createElement('p');
        priceUsd.innerText = Math.round(product.price / 2.85 * 10) / 10 + " $";
        let div = document.createElement('div');
        let cart = document.createElement('img');
        cart.src = '../Images/cart_white.svg';


        // Appends
        parentMobile.appendChild(card)
        card.appendChild(left);
        card.appendChild(right);
        left.appendChild(img);
        left.appendChild(name);
        right.appendChild(div);
        right.appendChild(cart);
        div.appendChild(priceGel);
        div.appendChild(priceUsd);

        // CLassing
        card.classList.add('cardModel');
        left.classList.add('leftCard');
        right.classList.add('rightCard');
        priceGel.classList.add('gel');
        priceUsd.classList.add('usd');

    })
}


// Range Dragging
let minPrice = document.querySelector('.minPrice')
let maxPrice = document.querySelector('.maxPrice')
let minSymbol = document.querySelector('.minSymbol')
let maxSymbol = document.querySelector('.maxSymbol')
let barPrice = document.querySelector('.barPrice')
let barSymbol = document.querySelector('.barSymbol')


document.addEventListener('mousedown', (e) => {
    add()
})
document.addEventListener('mouseup', () => {
    remove()
})
// Adding Drag Event
function add() {
    document.addEventListener('mousemove', drag)
}
// Remove Drag Event
function remove() {
    document.removeEventListener('mousemove', drag)
}
// Drag
function drag(e) {
    if (e.target.classList.contains('minPrice')) {
        let dat = barPrice.getBoundingClientRect()
        if (e.clientX > (dat.x + 9) && e.clientX < (maxPrice.getBoundingClientRect().x - 13)) {
            e.target.style.left = `${e.clientX - dat.x - 10}px`
            let startGreen = Math.round((parseInt(e.target.style.left) / dat.width * 100) * 10) / 10
            let endGreen = Math.round((parseInt(maxPrice.style.left) / dat.width * 100) * 10) / 10
            if (maxPrice.style.left === '') {
                endGreen = 100;
            }
            barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
        }
    }
    if (e.target.classList.contains('maxPrice')) {
        let dat = barPrice.getBoundingClientRect()
        if (e.clientX > (minPrice.getBoundingClientRect().x + minPrice.getBoundingClientRect().width + 10) && e.clientX < (dat.x + dat.width - 12)) {
            e.target.style.left = `${e.clientX - dat.x - 10}px`
            let startGreen = Math.round((parseInt(minPrice.style.left) / dat.width * 100) * 10) / 10
            let endGreen = Math.round((parseInt(e.target.style.left) / dat.width * 100) * 10) / 10
            if (minPrice.style.left === '') {
                startGreen = 0;
            }
            barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`

        }
    }
    if (e.target.classList.contains('minSymbol')) {
        let dat = barSymbol.getBoundingClientRect()
        if (e.clientX > (dat.x + 9) && e.clientX < (maxSymbol.getBoundingClientRect().x - 13)) {
            e.target.style.left = `${e.clientX - dat.x - 10}px`
            let startGreen = Math.round((parseInt(e.target.style.left) / dat.width * 100) * 10) / 10
            let endGreen = Math.round((parseInt(maxSymbol.style.left) / dat.width * 100) * 10) / 10
            if (maxSymbol.style.left === '') {
                endGreen = 100;
            }
            barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`

        }
    }
    if (e.target.classList.contains('maxSymbol')) {
        let dat = barSymbol.getBoundingClientRect()
        if (e.clientX > (minSymbol.getBoundingClientRect().x + minSymbol.getBoundingClientRect().width + 10) && e.clientX < (dat.x + dat.width - 12)) {
            e.target.style.left = `${e.clientX - dat.x - 10}px`
            let startGreen = Math.round((parseInt(minSymbol.style.left) / dat.width * 100) * 10) / 10
            let endGreen = Math.round((parseInt(e.target.style.left) / dat.width * 100) * 10) / 10
            if (minSymbol.style.left === '') {
                startGreen = 0;
            }
            barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
        }
    }
}