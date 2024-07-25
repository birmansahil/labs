let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

fetch("products.json").then((response) => {
    return response.json();
}).then(data => {
    return data.find(product => product.id === urlParams("product-id"));
}).then(product => {
    console.log(product);
})