let contactos = [];

const formContacto = document.getElementById("formContacto");
const listaContactos = document.getElementById("listaContactos");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const detalleContacto = document.getElementById("detalleContacto");

formContacto.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();

    if (nombre === "" || telefono === "" || correo === "") {
        mostrarMensaje("Complete todos los campos.", "error");
        return;
    }

    if (nombre.length < 3) {
        mostrarMensaje("El nombre debe tener al menos 3 caracteres.", "error");
        return;
    }

    if (!validarCorreo(correo)) {
        mostrarMensaje("Ingrese un correo válido.", "error");
        return;
    }

    if (telefono.length < 9) {
        mostrarMensaje("El teléfono debe tener al menos 9 dígitos.", "error");
        return;
    }

    const contacto = {
        nombre: nombre,
        telefono: telefono,
        correo: correo
    };

    contactos.push(contacto);

    mostrarContactos();
    limpiarFormulario();
    mostrarMensaje("Contacto registrado correctamente.", "correcto");
});

function mostrarContactos() {
    listaContactos.innerHTML = "";

    if (contactos.length === 0) {
        listaContactos.innerHTML = "<p>No hay contactos registrados.</p>";
        contador.textContent = "0 contactos";
        return;
    }

    contactos.forEach(function(contacto, indice) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("contacto");

        tarjeta.innerHTML = `
            <h3>${contacto.nombre}</h3>
            <p><strong>Teléfono:</strong> ${contacto.telefono}</p>
            <p><strong>Correo:</strong> ${contacto.correo}</p>

            <div class="acciones">
                <button class="btn-ver" onclick="verContacto(${indice})">Ver información</button>
                <button class="btn-eliminar" onclick="eliminarContacto(${indice})">Eliminar</button>
            </div>
        `;

        listaContactos.appendChild(tarjeta);
    });

    contador.textContent = contactos.length + " contactos";
}
function verContacto(indice) {
    const contacto = contactos[indice];

    detalleContacto.innerHTML = `
        <strong>Nombre:</strong> ${contacto.nombre}<br>
        <strong>Teléfono:</strong> ${contacto.telefono}<br>
        <strong>Correo electrónico:</strong> ${contacto.correo}
    `;
}

function eliminarContacto(indice) {
    const confirmar = confirm("¿Desea eliminar este contacto?");

    if (confirmar) {
        contactos.splice(indice, 1);
        mostrarContactos();
        detalleContacto.textContent = "Seleccione un contacto para visualizar su información.";
        mostrarMensaje("Contacto eliminado correctamente.", "correcto");
    }
}

function limpiarFormulario() {
    formContacto.reset();
}

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;

    setTimeout(function() {
        mensaje.textContent = "";
        mensaje.className = "";
    }, 3000);
}

function validarCorreo(correo) {
    const expresion = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresion.test(correo);
}