// Variables

const carrito = document.querySelector('#carrito'); //linea 23
const contenedorCarrito = document.querySelector('#lista-carrito tbody '); // lo que contenga el carrtio
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos'); //Linea 85
let articulosCarrito = [];


cargarEventListener();
function cargarEventListener () {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    // Vaciar Carrito

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML()
    })
};


//Funciones 
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')) { // Verificas que el usuario haya presionao en agregar carrito
        const cursoSeleccionado = e.target.parentElement.parentElement;  // Me lleva al elemto padre (div completo por ej)
        leerDatosCurso(cursoSeleccionado)
    }
    
};

//Elimina curso

function eliminarCurso(e) {
    
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        // Eliminar cursos del carrito;

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId )

        console.log(articulosCarrito)
        carritoHTML() // Volvemos a iterar sobre el carrito y mostar el html
    }
    alert('Articulo eliminado de forma correcta')
    
}

//Lee el contendio del HTML al que le dimos click

function leerDatosCurso(curso) { // Seria curso seleccionado
    

    //Crear objeto con contenido del curso actual;
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span ').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Verificar si el elemento ya existe
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id )
        
    
    if (existe) {
        const cursos = articulosCarrito.map( curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad ++;
                return curso; // retorna el objeto actualizado
                
            } else {
                return curso; // retorna los objetos que no son duplicados
            }
        } )
        articulosCarrito = [...cursos];
        
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
        console.log(articulosCarrito);

    }
    //Agrega elementos al arreglo de carritos
    carritoHTML()
    alert('Articulo agregado de forma correcta')
};


//Muestra el carrito de compras en el html
function carritoHTML() {

    //Limpiar el HTML
    limpiarHTML()
    


    // Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = ` 
            <td> <img src=${imagen} /> </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}" > x </a> </td>
        `

        //Agrega el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row)
    })
    
}

function limpiarHTML() {
    //Forma lenta
    // contenedorCarrito.innerHTML = '';
    
    while (contenedorCarrito.firstChild) { // Comprueba si hay un hijo y lo elimina
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


