window.onload = (event) => {
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

            
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'eliminar';
            deleteButton.className = 'delete_button';
            deleteButton.onclick = () => deleteCategory(product.product_id);
            

            row.appendChild(idCell);
            row.appendChild(nombreHeladoCell);
            row.appendChild(descripcionCell);
            row.appendChild(precioCell);
            row.appendChild(tamañoCell);
            row.appendChild(disponibilidadCell);
            row.appendChild(imagenCell);
            row.appendChild(deleteButton);


            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error(error);  
    }
}

async function deleteCategory(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/list/deleteProducts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: '¡Producto Eliminado!',
                text: 'El producto ha sido eliminado correctamente.',
                timer: 5000
            });
            then(() => {
                location.reload(); 
            });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Error al Eliminar Producto',
                text: 'No se pudo eliminar el producto. Por favor, intenta nuevamente más tarde.',
                timer: 5000
            });
        }
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: 'Error al Eliminar Producto',
            text: 'No se pudo eliminar el producto. Por favor, intenta nuevamente más tarde.',
            timer: 5000
        });
    }
}