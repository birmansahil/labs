const productsGrid = document.querySelector(".products-grid");

fetch("products.json").then((response) => {
    return response.json();
}).then(data => {
    data.map(product => {
        productsGrid.innerHTML += `
        <div class="product" onclick="location.href='productDetails.html?product-id='+${product.id}">
            <img src=${product.image_source} alt=${product.image_alt} />
            <p>${product.name}</p>
        </div>
        `
    })
})