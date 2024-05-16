let botonBuscar = document.getElementById("botonBuscar");
const clave = 'a0ec3d99569b3eb577eb031b8d35db04'

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
    divHora.classList.add('card-header'); // agrego clases de boostrap
    let ahora = new Date(); 
    let horas = ahora.getHours();
    let minutos = ahora.getMinutes();
    divHora.textContent = `Hora actual: ${horas}:${minutos}` // agrego la hora al div que cree
    listaDatosClima.appendChild(divHora); // agrego el div completo de la hora a la lista.

    let nombreCiudad = document.createElement('li'); // creo un elemento de la lista
    nombreCiudad.textContent = `Ciudad: ${ciudad}`; // lo obtengo del objeto json
    nombreCiudad.classList.add('list-group-item'); // le agrego una clase de boostrap
    listaDatosClima.appendChild(nombreCiudad); // lo agrego al div padre, osea a la lista y hago lo mismo con todos los elementos del objeto

    let clima = document.createElement('li');
    clima.textContent = `Clima: ${datosClima.weather[0].description}`;
    clima.classList.add('list-group-item');
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

    let containerClima = document.getElementById('containerClima'); // capturo al contenedor principal, el de todas las listas, le doy clases de boostrap, y le agrego la lista completa
    containerClima.classList.add('card');
    containerClima.appendChild(listaDatosClima);
}

