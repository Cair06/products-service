document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("productForm");
    const productTable = document.getElementById("productTable").getElementsByTagName('tbody')[0];
    const errorMessage = document.createElement('div');
    errorMessage.style.color = 'red';
    form.appendChild(errorMessage);

    function displayProducts(products) {
        productTable.innerHTML = "";
        products.forEach(product => {
            const row = productTable.insertRow();
            row.insertCell(0).textContent = product.name;
            row.insertCell(1).textContent = product.description;
            row.insertCell(2).textContent = product.price;
        });
    }

    function fetchProducts() {
        fetch('/api/products/')
            .then(response => response.json())
            .then(data => {
                displayProducts(data);
            });
    }

    fetchProducts();

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const productData = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            price: parseFloat(document.getElementById("price").value)
        };

        if (productData.price <= 0) {
            errorMessage.textContent = "Price must be a positive number!";
            return;
        } else {
            errorMessage.textContent = "";
        }

        fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error("Ошибка при отправке данных", response);
            }
        })
        .then(data => {
            fetchProducts();
            form.reset();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    });
});
