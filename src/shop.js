window.onload = (event) => {
    const encodeData = window.location.hash.substring(1);
    const data = JSON.parse(atob(encodeData));
    console.log (data);
};

document.addEventListener("DOMContentLoaded", () => {
    const mainShop = document.getElementById("mainShop");
    function createProduct(product) {
      const mainShopItemDiv = document.createElement("div");
      mainShopItemDiv.className = "mainShop__item";

      const mainShopItemProductDiv = document.createElement("div");
      mainShopItemProductDiv.className = "mainShop__item--product";

      const imagen = document.createElement("img");
      imagen.src = product.imagen;
      imagen.alt = product.descripcion;

      const mainShopItemDescriptionDiv = document.createElement("div");
      mainShopItemDescriptionDiv.className = "mainShop__item--description";

      const h2 = document.createElement("h2");
      h2.textContent = product.nombre_helado;

      const h5 = document.createElement("h5");
      h5.textContent = product.descripcion;

      const mainShopItemStartDiv = document.createElement("div");
      mainShopItemStartDiv.className = "mainShop__item--star";

      for (let contador = 1; contador <= 5; contador++) {
        const star = document.createElement("i");
        star.className = "bi_shop bi-star-fill";
        mainShopItemStartDiv.appendChild(star);
      }
      const h4 = document.createElement("h4");
      h4.textContent = new Intl.NumberFormat('es-CO',{
            style:'currency',
            currency:'COP',
            minimumFractionDigits:2
        }).format(product.precio);

      const iconoCart = document.createElement("i");
      iconoCart.className = "bi bi-cart-fill cart";

      mainShopItemDescriptionDiv.appendChild(h2);
      mainShopItemDescriptionDiv.appendChild(h5);
      mainShopItemDescriptionDiv.appendChild(mainShopItemStartDiv);
      mainShopItemDescriptionDiv.appendChild(h4);

      mainShopItemProductDiv.appendChild(imagen);
      mainShopItemProductDiv.appendChild(mainShopItemDescriptionDiv);
      mainShopItemProductDiv.appendChild(iconoCart);

      mainShopItemDiv.appendChild(mainShopItemProductDiv);

      return mainShopItemDiv;
    }
    function listProducts() {
      fetch("http://localhost:3000/product/list")
        .then((response) => response.json())
        .then((productos) => {
          productos.forEach((producto) => {
            const productItem = createProduct(producto);
            mainShop.appendChild(productItem);
          });
        });
    }
    listProducts();
  });