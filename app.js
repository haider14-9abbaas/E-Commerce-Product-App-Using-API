document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    const cart = [];
    const wishlist = [];

    fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(data => {
            const products = data.slice(0, 14);
            console.log(products)

            for (const product of products) {
                const productCardHTML = `
                    <div class="product-card">
                        <img src="${product.thumbnailUrl}" alt="${product.title}" class="product-image">
                        <div class="product-info">
                            <h3 class="product-title">${product.title}</h3>
                            <p class="price">$${(products.indexOf(product) + 1) * 10}.99</p>
                            <button class="buy-button" data-id="${product.id}">Add to Cart</button>
                            <button class="wishlist-button" data-id="${product.id}">Add to Wishlist</button>
                        </div>
                    </div>
                `;
                productGrid.innerHTML += productCardHTML;
            }

            document.querySelectorAll('.buy-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    const product = products.find(p => p.id == productId);
                    cart.push(product);
                    alert(`${product.title} added to cart!`);
                });
            });

            document.querySelectorAll('.wishlist-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    const product = products.find(p => p.id == productId);
                    wishlist.push(product);
                    alert(`${product.title} added to wishlist!`);
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
