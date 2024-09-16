window.onload = (event) => {
    const productsForm = document.getElementById('createProductsForm');

    productsForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const nombreHeladoProduct = document.getElementById('nombreHelado').value;
        const productDescription = document.getElementById('description').value;
        const priceProduct = document.getElementById('price').value;
        const sizeProduct = document.getElementById('size').value;
        const availabilityProduct = document.getElementById('availability').value;
        const imageProduct = document.getElementById('image').value;

        try {
            const response = await fetch ('http://localhost:3000/products/list/createProducts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombreHeladoProduct, productDescription, priceProduct, sizeProduct, availabilityProduct, imageProduct }),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: '¡Producto Creado!',
                    text: 'El producto ha sido creado exitosamente.',
                    timer: 5000
                  });
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: 'Error al Crear Producto',
                    text: 'No se pudo crear el producto. Por favor, intenta nuevamente más tarde.',
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
    });
};