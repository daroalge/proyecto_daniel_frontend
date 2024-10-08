window.onload = (event) => {
    //const encodeData = window.location.hash.substring(1);
    //const data = JSON.parse(atob(encodeData));
    //console.log(data);

    loadProducts();

    const createProducts = document.getElementById('createProducts');
    const updateProducts = document.getElementById('updateProducts');
    const deleteProducts = document.getElementById('deleteProducts');


    createProducts.addEventListener('click', function(event){
        window.location.href = './createProduct.html';
    });

    updateProducts.addEventListener('click', function(event) {
        window.location.href = './updateProduct.html';
    });

    deleteProducts.addEventListener('click', function(event) {
        window.location.href = './deleteProduct.html';
    });
};
const apiUrl = 'https://proyecto-daniel-backend.vercel.app';
async function loadProducts() {
    try {
        const response = await fetch(`${apiUrl}/product/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const products = await response.json();
        console.log(products)

        products.sort((a, b) => a.product_id - b.product_id);

        const tableBody = document.getElementById('productsTbody');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = product.product_id;

            const nombreHeladoCell = document.createElement('td');
            nombreHeladoCell.textContent = product.nombre_helado;

            const descripcionCell = document.createElement('td');
            descripcionCell.textContent = product.descripcion;

            const precioCell = document.createElement('td');
            precioCell.textContent = product.precio;

            const tamañoCell = document.createElement('td');
            tamañoCell.textContent = product.tamaño;
            tamañoCell.classList.add('product-size'); 

            const disponibilidadCell = document.createElement('td');
            disponibilidadCell.textContent = product.disponibilidad;
            disponibilidadCell.classList.add('product-avalivity'); 

            const imagenCell = document.createElement('td');
            imagenCell.textContent = product.imagen;
            imagenCell.classList.add('product-image'); 

            row.appendChild(idCell);
            row.appendChild(nombreHeladoCell);
            row.appendChild(descripcionCell);
            row.appendChild(precioCell);
            row.appendChild(tamañoCell);
            row.appendChild(disponibilidadCell);
            row.appendChild(imagenCell);


            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);  
    }
}