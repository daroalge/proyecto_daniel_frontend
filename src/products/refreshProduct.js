window.onload = async (event) => {
    const idProduct = getQueryParams('id');
    const product = await loadProduct(idProduct);
    const id = document.getElementById('product_id');
    const name = document.getElementById('nombreHelado');
    const description = document.getElementById('description');
    const price = document.getElementById('price');
    const size = document.getElementById('size');
    const availability = document.getElementById('availability');
    const image = document.getElementById('image');
    const updateProductsForm = document.getElementById('updateProductsForm');


    id.value = product.product_id;
    name.value = product.nombre_helado;
    description.value = product.descripcion;
    price.value = product.precio;
    size.value = product.tamaño;
    availability.value = product.disponibilidad;
    image.value = product.imagen;

    updateProductsForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        await actulizarProductos( id.value, name.value, description.value, price.value, size.value, availability.value, image.value );
    })


};

function getQueryParams(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

async function loadProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/list/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const categories = await response.json();
        return categories[0];
    } catch (error) {
        
    };
};

async function actulizarProductos(id, nameHelado, descripcionHelado, precioHelado, tamañoHelado, disponibilidadHelado, imagenHelado){
    try {
        const response = await fetch(`http://localhost:3000/products/list/updateProducts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nameHelado, descripcionHelado, precioHelado, tamañoHelado, disponibilidadHelado, imagenHelado}),
        });
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: '¡Producto Actualizado!',
                text: 'El producto ha sido actualizado correctamente.',
                timer: 5000
              });
        } else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: 'Error al Actualizar Producto',
                text: 'No se pudo actualizar el producto. Por favor, intenta nuevamente más tarde.',
                timer: 5000
              });
        }
} catch (error) {
    Swal.fire({
        position: "center",
        icon: "warning",
        title: "Error Interno",
        text: "Ocurrió un problema inesperado. Por favor, inténtalo más tarde.",
        timer: 5000
      });
}
};