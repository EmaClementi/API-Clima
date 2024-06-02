let botonBuscar = document.getElementById("botonBuscar");
const clave = '490aabb8938c99666e4b169985ab7cea'

function ciudadPorDefecto() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=tandil&lang=es&appid=${clave}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                let noEncontrado = document.getElementById('noEncontrado');
                noEncontrado.innerHTML = 'La ciudad no Existe';
               
                throw new Error('Error al hacer la solicitud: ' + response.status);
                
            }
            noEncontrado.innerHTML = '';
            return response.json();
        })
        .then(data => {
            mostrarDatosClima('tandil', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
ciudadPorDefecto();

botonBuscar.addEventListener("click", () => {
    let ciudad = document.getElementById('inputCiudad').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=${clave}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                let noEncontrado = document.getElementById('noEncontrado');
                noEncontrado.innerHTML = 'La ciudad no Existe';
               
                throw new Error('Error al hacer la solicitud: ' + response.status);
                
            }
            noEncontrado.innerHTML = '';
            return response.json();
        })
        .then(data => {
            console.log(data);
            mostrarDatosClima(ciudad, data);
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function mostrarDatosClima(ciudad, datosClima) {

    let listaDatosClima = document.createElement('ul'); // Aca creo una lista para agregar los datos del clima de cada ciudad, por cada ciudad se crea una nueva lista.
    listaDatosClima.style = 'margin: 10px 0px'
    let divHora = document.createElement('div'); // creo un div que me va a mostrar en la cabecera la hora
    divHora.classList.add('card-header', 'divHora'); // agrego clases de boostrap
    let ahora = new Date(); 
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    divHora.textContent = `Hora actual: ${horas}:${minutos}` // agrego la hora al div que cree
    listaDatosClima.appendChild(divHora); // agrego el div completo de la hora a la lista.

    let nombreCiudad = document.createElement('li'); // creo un elemento de la lista
    nombreCiudad.textContent = `Ciudad: ${ciudad}`; // lo obtengo del objeto json
    nombreCiudad.classList.add('list-group-item'); // le agrego una clase de boostrap
    listaDatosClima.appendChild(nombreCiudad); // lo agrego a la lista y hago lo mismo con todos los elementos del objeto

    let clima = document.createElement('li');
    let imagenIcono = document.createElement('img');
    imagenIcono.src = `https://openweathermap.org/img/wn/${datosClima.weather[0].icon}.png` // aca obtengo el icono que hace referencia al tipo de clima actual, lo provee la api
    clima.textContent = `Clima: ${datosClima.weather[0].description} `;
    clima.classList.add('list-group-item');
    clima.appendChild(imagenIcono);
    listaDatosClima.appendChild(clima);

    let temperatura = document.createElement('li');
    temperatura.textContent = `Temperatura: ${Math.round(datosClima.main.temp - 273.15)} °C`;
    temperatura.classList.add('list-group-item');
    listaDatosClima.appendChild(temperatura);

    let presion = document.createElement('li');
    presion.textContent = `Presión: ${datosClima.main.pressure} hPa`;
    presion.classList.add('list-group-item');
    listaDatosClima.appendChild(presion);

    let humedad = document.createElement('li');
    humedad.textContent = `Humedad: ${datosClima.main.humidity}%`;
    humedad.classList.add('list-group-item');
    listaDatosClima.appendChild(humedad);

    let viento = document.createElement('li');
    viento.textContent = `Velocidad del Viento: ${Math.round(datosClima.wind.speed * 3.6)} km/h`;
    viento.classList.add('list-group-item');
    listaDatosClima.classList.add('list-group', 'list-group-flush')
    listaDatosClima.appendChild(viento);

    let visibilidad = document.createElement('li');
    visibilidad.textContent = `Visibilidad: ${(datosClima.visibility / 1000).toFixed(1)} km`;
    visibilidad.classList.add('list-group-item');
    listaDatosClima.appendChild(visibilidad);

    let containerClima = document.createElement('div'); // este div sirve como contenedor de cada lista e imagen que se crea dinamicamente
    let containerPadre = document.getElementById('containerPadre');// este es el contenedor padre, el que contiene cada ciudad con su imagen, sirve para ordenar y darle estilo las listas con su imagen
    containerPadre.appendChild(containerClima);
    containerClima.classList.add('card', 'd-flex', 'flex-row', 'align-items-center'); // son estilos de bootstrap 
    containerClima.appendChild(listaDatosClima);


    let velocidadViento = Math.round(datosClima.wind.speed * 3.6); // aca pasamos la velocidad del viento a km, se evalua la velocidad en kilometros tienendo en cuenta la escala de beaufort, que en base a la velocidad del viento, hay un clima especifico
    let imagen = document.createElement('img')
    imagen.classList.add('imagen');
        if(velocidadViento >= 0 && velocidadViento <= 2){
            imagen.src = 'imagenes/rango1.png';
            containerClima.appendChild(imagen);
        }else if(velocidadViento > 2 && velocidadViento <= 6){
            imagen.src = 'imagenes/rango2.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 7 && velocidadViento <= 11){
            imagen.src = 'imagenes/rango3.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 12 && velocidadViento <= 19){
            imagen.src = 'imagenes/rango4.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 20 && velocidadViento <= 29){
            imagen.src = 'imagenes/rango5.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 30 && velocidadViento <= 39){
            imagen.src = 'imagenes/rango7.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 40 && velocidadViento <= 50){
            imagen.src = 'imagenes/rango7.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 51 && velocidadViento <= 61){
            imagen.src = 'imagenes/rango8.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 62 && velocidadViento <= 74){
            imagen.src = 'imagenes/rango9.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 75 && velocidadViento <= 87){
            imagen.src = 'imagenes/rango10.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 88 && velocidadViento <= 101){
            imagen.src = 'imagenes/rango11.png'
            containerClima.appendChild(imagen);
        }else if(velocidadViento >= 102 && velocidadViento <= 117){
            imagen.src = 'imagenes/rango12.png'
            containerClima.appendChild(imagen);
        }else{
            imagen.src = 'imagenes/rango13.png'
            containerClima.appendChild(imagen);
        }
      
}
let botonEliminar = document.getElementById('botonBorrar'); // capturo un boton para eliminar toda la pantalla, igual que el boton buscar con los mismos estilos de bootstrap
botonEliminar.addEventListener('click', () => { // para poder borrar todas las listas con sus imagenes, directamente vacio al contenedor padre.
    containerPadre.innerHTML = '';
});

