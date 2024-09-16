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

async function loadProducts() {
    try {
        const response = await fetch('http://localhost:3000/product/list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const products = await response.json();
        console.log(products)

        const tableBody = document.getElementById('productsTbody');
        tableBody.innerHTML = '';

        products.forEach(product => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = product.product_id;
            idCell.className = 'idproduct';


            const nombreHeladoCell = document.createElement('td');
            nombreHeladoCell.textContent = product.nombre_helado;

            const descripcionCell = document.createElement('td');
            descripcionCell.textContent = product.descripcion;

            const precioCell = document.createElement('td');
            precioCell.textContent = product.precio;

            const tamañoCell = document.createElement('td');
            tamañoCell.textContent = product.tamaño;
            tamañoCell.className = 'product-size';

            const disponibilidadCell = document.createElement('td');
            disponibilidadCell.textContent = product.disponibilidad;
            disponibilidadCell.classList.add('product-avalivity'); 

            const imagenCell = document.createElement('td');
            imagenCell.textContent = product.imagen;
            imagenCell.classList.add('product-image'); 

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Actualizar';
            updateButton.className = 'update_button';
            updateButton.onclick = () => updateProduct(product.product_id);

            row.appendChild(idCell);
            row.appendChild(nombreHeladoCell);
            row.appendChild(descripcionCell);
            row.appendChild(precioCell);
            row.appendChild(tamañoCell);
            row.appendChild(disponibilidadCell);
            row.appendChild(imagenCell);
            row.appendChild(updateButton);


            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);  
    }
};
function updateProduct (id) {
    window.location.href = `./refreshProduct.html?id=${id}`;
}