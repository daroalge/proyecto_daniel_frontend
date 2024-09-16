window.onload = (event) => {

//LOGIN
    const mainAuth__login = document.getElementById('mainAuth__login');
    const loginMessage = document.getElementById('loginMessage');

    mainAuth__login.addEventListener('submit', async function(event) {

        event.preventDefault();
        
        const username = document.getElementById('userName__login').value;
        const password = document.getElementById('password__login').value;

        try {
            const response = await fetch ('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password}),
            });

            const data = await response.json();
            const rol = data.role;
            localStorage.setItem("role", rol);
            const encodeData = btoa(JSON.stringify(data));

            if (response.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Inicio de Sesión Exitoso",
                    text: "Bienvenido, has iniciado sesión correctamente.",
                    timer: 5000
                  });
                if(rol==="usuario")window.location.href = `../html/shop.html#${encodeData}`;
                if(rol === "administrador" || rol === "trabajador")window.location.href = `../html/dashboard.html#${encodeData}`;

            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error de Inicio de Sesión",
                    text: "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
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

// REGISTER
    const mainAuth__register=document.getElementById('mainAuth__register');
const registerMessage=document.getElementById('registerMessage');

mainAuth__register.addEventListener('submit', async function(event){
    event.preventDefault();

    const newFirstName = document.getElementById ('firstName').value;
    const newLastName = document.getElementById ('lastName').value;
    const newUserName = document.getElementById ('userName').value;
    const newEmail = document.getElementById ('email').value;
    const newPhone = document.getElementById ('phone').value;
    const newPassword = document.getElementById ('password').value;

    try {
        const response = await fetch ('http://localhost:3000/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName:newFirstName, lastName: newLastName, userName: newUserName, email:newEmail, phone: newPhone, password: newPassword})
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Registro Exitoso",
                text: "Tu cuenta ha sido creada correctamente.",
                timer: 5000
              });
            
        } else {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Error en el Registro",
                text: "No pudimos completar tu registro. Por favor, revisa los datos e inténtalo nuevamente.",
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
}