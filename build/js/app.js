const nombre =  document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const formulario = document.querySelector(".formulario");
let click = false;

const datos = {
    nombre: "",
    apellido: "",
    email: "",
    password: ""
}

nombre.addEventListener("input", leerCampos);
apellido.addEventListener("input", leerCampos);
email.addEventListener("input", leerCampos);
password.addEventListener("input", leerCampos);
formulario.addEventListener("submit", validarCampos);

function leerCampos(e) {
    e.preventDefault();
    datos[e.target.id] = e.target.value;
}

function validarCampos(e) {
    e.preventDefault();
    click = true
    const {nombre, apellido, email, password} = datos;
    if(nombre != "" && apellido != "" && email != "" && password != "") {
        eliminarError("todos");
        validarEmail(email);
    } else {
        if (nombre == "") {
            mostrarError("First Name cannot be empty.", "nombre");
        } else {
            eliminarError("nombre")
        }

        if (apellido == "") {
            mostrarError("Last Name cannot be empty.", "apellido");
        } else {
            eliminarError("apellido")
        }

        if (email == "") {
            mostrarError("Email cannot be empty.", "email");
        } else {
            eliminarError("email")
            validarEmail(email);
        }

        if (password == "") {
            mostrarError("Password cannot be empty.", "password");
        } else {
            eliminarError("password")
        }
    }
}

function mostrarError(mensaje, campo) {  
    const boton = document.querySelector(".boton");
    boton.disabled = true;
    const texto = document.createElement("P");
    const espacioMsj = document.querySelector(`.mensaje-${campo}`);

    texto.textContent = mensaje;
    texto.classList.add("error");
    texto.contains(texto);
    espacioMsj.appendChild(texto);

    nombre.classList.add("fade-out");
    apellido.classList.add("fade-out");
    email.classList.add("fade-out");
    password.classList.add("fade-out");

    if (campo == "nombre") {
        nombre.classList.add("icono-error");
        nombre.classList.add("campo-error");
        nombre.classList.remove("campo-validado");
        nombre.placeholder = "";
    }

    if (campo == "apellido") {
        apellido.classList.add("icono-error");
        apellido.classList.add("campo-error");
        apellido.classList.remove("campo-validado");
        apellido.placeholder = "";
    }

    if (campo == "email") {
        email.classList.add("icono-error");
        email.classList.add("campo-error");
        email.classList.remove("campo-validado");
        email.placeholder = "";
        
    }
    if (campo == "password") {
        password.classList.add("icono-error");
        password.classList.add("campo-error");
        password.classList.remove("campo-validado");
        password.placeholder = "";
    }

    //Elimina el mensaje despues de 4 segundos
    setTimeout(() => {
        
        texto?.remove()
        nombre.classList.remove("icono-error");
        apellido.classList.remove("icono-error");
        email.classList.remove("icono-error");
        password.classList.remove("icono-error");

        nombre.placeholder = "First Name";
        apellido.placeholder = "Last Name";
        email.placeholder = "Email Address";
        password.placeholder = "Password";

        boton.disabled = false;

    }, 4000);
}

function eliminarError(campo) {
    
    if (campo == "nombre") {
        nombre.classList.remove("campo-error");
        nombre.classList.add("campo-validado");
    }
    
    if (campo == "apellido") {
        apellido.classList.remove("campo-error");
        apellido.classList.add("campo-validado");
    }
    
    if (campo == "email") {
        email.classList.remove("campo-error");
        email.classList.add("campo-validado");
        
    }

    if (campo == "password") {
        password.classList.remove("campo-error");
        password.classList.add("campo-validado");
        
    }

    if(campo == "todos") {
        nombre.classList.remove("campo-error");
        nombre.classList.add("campo-validado");
        apellido.classList.remove("campo-error");
        apellido.classList.add("campo-validado");
        email.classList.remove("campo-error");
        email.classList.add("campo-validado");
        password.classList.remove("campo-error");
        password.classList.add("campo-validado");
    }

}

function validarEmail(email) {
    const re = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    let bandera = re.exec(email);
    if(!bandera) {
        mostrarError("Looks like this is not a Email.", "email");
    } else {
        eliminarError("email")
    }
}