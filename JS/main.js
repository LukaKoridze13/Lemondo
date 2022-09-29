import Data from '../Data/data.js'
let domains = Data.domainList;
let categories = Data.categories;
let not = true;
if (not) {
    domains = domains.map((item) => {
        item.categories.map((category) => {
            categories.map((it) => {
                if (category === it.id) {
                    item.categories.push(it.name)
                }
            })
        })
        return item
    })
}
const DOMAINS = domains;
let domainZones = [];
let filteredDomains = domains

let prices = domains.map((items) => {
    return items.price
})
prices = prices.sort((a, b) => b - a);
let highestPrice = prices[0]
let filters = {
    name: 'a',
    priceMin: 0,
    priceMax: highestPrice,
    symbolMin: 0,
    symbolMax: 30,
    categories: [],
    zone: []
};
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

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            if (!filters.categories.includes(category.name)) {
                filters.categories.push(category.name)
            }
        } else {
            filters.categories.splice(filters.categories.indexOf(category.name), 1);
        }
        filter();
    })
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

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            if (!filters.zone.includes(zone)) {
                filters.zone.push(zone)
            }
        } else {
            filters.zone.splice(filters.zone.indexOf(zone), 1);
        }
        filter();
    })
})

// Products
let parent = document.querySelector('main .products .content_desktop .middle .right')
let parentMobile = document.querySelector('.content_mobile .right')

drawCards();




// Range Dragging
let minPrice = document.querySelector('.minPrice')
let maxPrice = document.querySelector('.maxPrice')
let minSymbol = document.querySelector('.minSymbol')
let maxSymbol = document.querySelector('.maxSymbol')
let barPrice = document.querySelector('.barPrice')
let barSymbol = document.querySelector('.barSymbol')
let minPriceInp = document.querySelector('#minPrice')
let maxPriceInp = document.querySelector('#maxPrice')
let minSymbolInp = document.querySelector('#minSymbol')
let maxSymbolInp = document.querySelector('#maxSymbol')
let dat = barPrice.getBoundingClientRect()
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
            minPriceInp.value = parseInt(highestPrice * startGreen / 100)
            barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
        } else if (e.clientX < (maxPrice.getBoundingClientRect().x - 13)) {
            minPrice.value = 0;
        }
        filters.priceMin = parseInt(minPriceInp.value)
        filter();
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
            maxPriceInp.value = parseInt(highestPrice * endGreen / 100)
            barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
        } else if (e.clientX > (minPrice.getBoundingClientRect().x + minPrice.getBoundingClientRect().width + 10)) {
            maxPriceInp.value = highestPrice
        }
        filters.priceMax = parseInt(maxPriceInp.value)
        filter();
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
            minSymbolInp.value = parseInt(30 * startGreen / 100)
            barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
        } else if (e.clientX < (maxSymbol.getBoundingClientRect().x - 13)) {
            minSymbolInp.value = 0

        }
        filters.symbolMin = parseInt(minSymbolInp.value)
        filter();
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
            maxSymbolInp.value = parseInt(30 * endGreen / 100)
            barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
        } else if (e.clientX > (minSymbol.getBoundingClientRect().x + minSymbol.getBoundingClientRect().width + 10)) {
            maxSymbolInp.value = 30

        }
        filters.symbolMax = parseInt(maxSymbolInp.value)
        filter();
    }
}


// Inputs

minPriceInp.addEventListener('keyup', (e) => {

    if (e.target.value > highestPrice) {
        e.target.value = highestPrice
    } else if (e.target.value < 0) {
        e.target.value = 0
    }
    let calc = Math.round(e.target.value / highestPrice * dat.width)
    minPrice.style.left = `${calc}px`
    let startGreen = Math.round((e.target.value / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((maxPriceInp.value / highestPrice * 100) * 10) / 10
    if (maxPriceInp.value === '') {
        maxPriceInp.value = highestPrice
    }
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`

    filters.priceMin = parseInt(minPriceInp.value)
    filter();
});
maxPriceInp.addEventListener('keyup', (e) => {
    if (e.target.value > highestPrice) {
        e.target.value = highestPrice
    } else if (e.target.value < 0) {
        e.target.value = 0
    }
    let calc = Math.round(e.target.value / highestPrice * dat.width)
    maxPrice.style.left = `${calc}px`
    let startGreen = Math.round((minPriceInp.value / highestPrice * 100) * 10) / 10
    let endGreen = Math.round((e.target.value / highestPrice * 100) * 10) / 10
    if (minPriceInp.value === '') {
        minPriceInp.value = 0
    }
    barPrice.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`

    filters.priceMax = parseInt(maxPriceInp.value)
    filter();


});
minSymbolInp.addEventListener('keyup', (e) => {
    if (e.target.value > 30) {
        e.target.value = 30
    } else if (e.target.value < 0) {
        e.target.value = 0
    }
    let calc = Math.round(e.target.value / 30 * dat.width)
    minSymbol.style.left = `${calc}px`
    let startGreen = Math.round((e.target.value / 30 * 100) * 10) / 10
    let endGreen = Math.round((maxSymbolInp.value / 30 * 100) * 10) / 10
    if (maxSymbolInp.value === '') {
        maxSymbolInp.value = 30
    }
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
    filters.symbolMin = parseInt(minSymbolInp.value)
    filter();

});
maxSymbolInp.addEventListener('keyup', (e) => {
    if (e.target.value > 30) {
        e.target.value = 30
    } else if (e.target.value < 0) {
        e.target.value = 0
    }
    let calc = Math.round(e.target.value / 30 * dat.width)
    maxSymbol.style.left = `${calc}px`
    let startGreen = Math.round((minSymbolInp.value / 30 * 100) * 10) / 10
    let endGreen = Math.round((e.target.value / 30 * 100) * 10) / 10
    if (minSymbolInp.value === '') {
        minSymbolInp.value = 0
    }
    barSymbol.style.background = `linear-gradient(to right, #696974, #696974 ${startGreen - 1}%,#99CC66 ${startGreen}%,#99CC66 ${endGreen + 5}%, #696974 ${endGreen + 6}%)`
    filters.symbolMax = parseInt(maxSymbolInp.value)
    filter();
});


// Sortings
let date = document.querySelector('.sorters .date')
let deadline = document.querySelector('.sorters .deadline')
let price = document.querySelector('.sorters .price')
let alphabet = document.querySelector('.sorters .alphabet')
let reversed = false;
deadline.addEventListener('click', () => {
    if (!reversed) {
        filteredDomains = filteredDomains.reverse();
        drawSearchedCards();
        reversed = !reversed;
    }
})
date.addEventListener('click', () => {
    if (reversed) {
        filteredDomains = filteredDomains.reverse();
        drawSearchedCards();
        reversed = !reversed;
    }
})
price.addEventListener('click', () => {
    filteredDomains = filteredDomains.sort((a, b) => {
        return a.price - b.price
    })
    drawSearchedCards();
})
alphabet.addEventListener('click', () => {
    filteredDomains = filteredDomains.sort(function (a, b) {
        var textA = a.domainName.toUpperCase();
        var textB = b.domainName.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    drawSearchedCards();
})




// Filters
let search = document.querySelector('.search');
search.addEventListener('keyup', (e) => {
    filters.name = e.target.value
    filter()
})
search.addEventListener('change', (e) => {
    filters.name = e.target.value
    filter()
})


function filter() {
    if (filters.minPrice === undefined) {
        filters.minPrice = 0;
    }
    if (filters.maxPrice === undefined) {
        filters.maxPrice = highestPrice;
    }
    if (filters.minSymbol === undefined) {
        filters.minSymbol = 0;
    }
    if (filters.maxSymbol === undefined) {
        filters.maxSymbol = 30;
    }
    let newMassive = []
    filteredDomains.forEach((item) => {
        let web = item.domainName + item.domainExtension
        if (web.includes(filters.name)) {
            newMassive.push(item)
        }
    })
    DOMAINS.forEach((item) => {
        let web = item.domainName + item.domainExtension
        if (web.includes(filters.name)) {
            if (!newMassive.includes(item)) {
                newMassive.push(item)
            }
        }
    })
    filteredDomains = newMassive
    drawSearchedCards();

}




function drawCards() {
    parent.innerHTML = '';
    parentMobile.innerHTML = '';
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
function drawSearchedCards() {
    parent.innerHTML = '';
    parentMobile.innerHTML = '';
    filteredDomains.forEach((product, index) => {
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
    filteredDomains.forEach((product, index) => {
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

