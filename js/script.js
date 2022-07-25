class Restaurante{
    constructor(){
        this.nombre = `Session`;
        this.direccion = `Siria 381`;
        this.usuario = `session`;
        this.clave = `123`;
        this.reservasMaxPorDia = 45;
        this.reservas = [];
    }

// METODOS PARA REGISTRAR NUEVA RESERVA
    cargarDatosReserva(nombre, telefono, cantPersonas, horaReserva, fecha){
        let res = new Reserva();
        res.cargaDatos(nombre, telefono, cantPersonas, horaReserva,fecha);
        if (this.controlMaxReservas(res.diaReserva, parseInt(res.cantPersonas)) === 'true'){
            this.reservas.push(res);
            localStorage.setItem(`reservas`, JSON.stringify(this.reservas));
            return `true`;
        }else{
            return `false`;
        }
    }

    // VERIFICA QUE NO SE EXCEDA EL LIMITE DIARIO
    controlMaxReservas(fechaCorrienteReserva,cantPersonas){
        let capacidadAcumulada = cantPersonas;
        this.reservas.forEach( reserva => {
            if (reserva.diaReserva === fechaCorrienteReserva.toISOString()){
                capacidadAcumulada =  capacidadAcumulada + parseInt(reserva.cantPersonas);
            }
        });
        if (capacidadAcumulada <= this.reservasMaxPorDia){
            return 'true';
        }
    }
    //------------------------
// -----------------------


    mostrarProximasReservas(){
        console.log(this.reservas);
        const reservasProximas = this.reservas.filter(reservasProx => reservasProx.reservaPendiente === 'true');
        reservasProximas.sort(function(a, b){
            let primerFecha = new Date(a.diaReserva);
            let segundaFecha = new Date(b.diaReserva);
            if (primerFecha < segundaFecha) return -1;
            if (primerFecha > segundaFecha) return 1;
            return 0;
        });
        console.log(reservasProximas);
        return reservasProximas;
    }

/*
    confirmarReserva(){
        let nombreReserva = prompt(`Ingrese el nombre del dueño de la reserva:`);
        let reservaCompletada = this.reservas.find(reservaPen => reservaPen.nombreResponsable === nombreReserva);
        const index = this.reservas.indexOf(reservaCompletada);
        this.reservas[index].reservaPendiente = 'false';
    }
*/
}

class Reserva{
    constructor(){
        this.nombreReserva;
        this.telReserva;
        this.cantPersonas;
        this.diaReserva;
        this.horaReserva;
        this.reservaPendiente = 'true';
    }
    cargaDatos(nombre, telefono, cantPersonasReserva, hora, fecha){
        this.nombreReserva = nombre;
        this.telReserva = telefono;
        this.cantPersonas = parseInt(cantPersonasReserva);
        this.horaReserva = hora;
        this.diaReserva = new Date(fecha);
    }
}

//FECHAS
const DateTime = luxon.DateTime;
const hoy = DateTime.now();

//DOM
const mostrarFormulario = document.getElementById("formulario");
const volverMenuPrincipal = document.getElementById("volverMenuPrincipal");
const registarReserva = document.getElementById("registarReserva");



//FUNCIONES

const reservasStorage = () =>{
    let reservasRecuperar = JSON.parse(localStorage.getItem(`reservas`));
    console.log(reservasRecuperar);
    if (!!reservasRecuperar && reservasRecuperar.length > 0) {
        let i = 0;
        for (const reserva of reservasRecuperar){
            console.log(i);
            controlador.reservas[i] = reserva;
            console.log(controlador.reservas[i]);
            i++;
        }
        console.log(controlador.reservas);
    }else{
        obtenerReservaAsync();
    }
    console.log(controlador);
}

const obtenerReservaAsync = async () => {
    try{        
        const reservasFetch = await fetch('./json/reservas.json');
        const reservasBack = await reservasFetch.json(); 
        let i = 0;
        for (const reserva of reservasBack){
            // const {nombre, telefono, cantPer, diaRes, reservaPen} = reserva;
            controlador.reservas[i] = reserva;
            i++;
        }
    } catch{
        mostrarFormulario.innerHTML = 'Fallo al recuperar Reservas del Back';
    }finally{
    }
}

const imprimirFormulario = () =>{
    mostrarFormulario.innerHTML = `
    <form id="formularioReservas" class="formularioReserva">
        <input id="nombreReserva" type="text" autocomplete="off" placeholder="Ingresar el nombre de la persona a cargo de la reserva" />
        <input id="telefonoReserva" type="number" autocomplete="off" placeholder="Ingresar el telefono a cargo de la reserva" />
        <input id="cantPersonasReservas" type="number" autocomplete="off" placeholder="Ingresar la cantidad de personas en la reserva" />
        <select name="mes" id="horaReserva" class="form-select">
            <option selected>Horario de Reserva</option>
            <option value="12.30">12.30 HS</option>
            <option value="13">13 HS</option>
            <option value="13.30">13.30 HS</option>
            <option value="14">14 HS</option>
            <option value="20.30">20.30 HS</option>
            <option value="21">21 HS</option>
            <option value="21.30">21.30 HS</option>
            <option value="22">22 HS</option>                                
        </select>
        <input id="fechaReserva" type="date" autocomplete="off" placeholder="Ingresar el dia de la reserva (formato MM/DD/YYYY)" />
        <input id="btn" type="submit" value="Agregar Reserva" />
    </form>
    `;
}

const fechaVieja = (fechaPedida, horaPedida) =>{
    if ((fechaPedida > hoy.toString()) || ((fechaPedida === hoy.toString().substring(0,10) && horaPedida > hoy.hour))){
        return false;
    }else{
        return true;
    }
}
const asignarDom = (boton) =>{
    for(let i=0; i < controlador.reservas.length; i++){
        boton[i] = document.getElementById(`botonReserva${i}`);
        console.log(boton[i]);
    }
    return boton;
}


//--------------

//CONTROLADOR
let controlador = new Restaurante;

//TRAER DATOS DEL STORAGE
reservasStorage();

//BOTON REGISTRAR NUEVA RESERVA
registarReserva.onclick = () => {
    let elemento1 = document.getElementById("registarReserva");
    let elemento2 = document.getElementById("mostrarReserva");
    elemento1.classList.add("desactivoDisplay");
    elemento2.classList.add("desactivoDisplay");
    volverMenuPrincipal.classList.remove("desactivoDisplay");
    volverMenuPrincipal.classList.add("botonMenuPrincipalRegistrarReserva");
    mostrarFormulario.classList.add("formularioPP");
    //IMPRIMIR FORMULARIO
    imprimirFormulario();
    // RELACIONAR DATOS DEL DOM 'FORMULARIO'
    let nombrePersona = document.getElementById("nombreReserva");
    let telefonoResponsable = document.getElementById("telefonoReserva");
    let cantPerReserva = document.getElementById("cantPersonasReservas");
    let diaReserva = document.getElementById("fechaReserva");
    let horaReserva = document.getElementById("horaReserva");
    //RESPUESTA FORMULARIO
    const respuestaFormulario = document.getElementById("formularioReservas")
    respuestaFormulario.onsubmit = (e) => {
        e.preventDefault();  
        //VALIDACIONES DATOS FORMULARIOS
        nombrePersona.value = nombrePersona.value || "NO DEFINIDO";
        telefonoResponsable.value = telefonoResponsable.value || 0;
        cantPerReserva.value = cantPerReserva.value || 0;
        horaReserva.value = horaReserva.value || 0;
        console.log(horaReserva.value); 
        diaReserva.value = diaReserva.value || "1000-01-01";
        if (fechaVieja(diaReserva.value, horaReserva.value) === false){
            Swal.fire({
                title: 'Desea cargar la siguiente reserva?',
                text: `|${nombrePersona.value}|${telefonoResponsable.value}|${cantPerReserva.value}|${diaReserva.value}|${horaReserva.value}|`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'CARGAR RESERVA'
            }).then((result) => {
                if (result.isConfirmed) {
                    if(controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, parseInt(cantPerReserva.value), horaReserva.value, diaReserva.value) == `true`){                    
                        Swal.fire(
                            `La reserva a nombre de ${nombrePersona.value} fue cargada con exito!`,
                            setInterval("location.reload()",2000)
                        )
                    }else if (controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, cantPerReserva.value, diaReserva.value) == `false`){
                        Swal.fire(
                            `La reserva a nombre de ${nombrePersona.value} no pudo ser cargada por limite de capacidad!`,
                        )
                    };
                }   
            })
        }else{
            Swal.fire(
                `ESA FECHA ES VIEJA!!!`
            )
        }
    }
    console.log(controlador);
}

//BOTON MENU PRINCIPAL
volverMenuPrincipal.onclick = () =>{
    location.reload();
};



//BOTON MOSTRAR RESERVAS
const mostrarReservas = document.getElementById("mostrarReserva");
const listaReservas = document.getElementById("mostrarReservasProximas");
let i = 0; //CREO QUE ESTA DE MAS
mostrarReservas.onclick = () => {
    let elemento1 = document.getElementById("registarReserva");
    let elemento2 = document.getElementById("mostrarReserva");
    elemento1.classList.add("desactivoDisplay");
    elemento2.classList.add("desactivoDisplay");
    volverMenuPrincipal.classList.remove("desactivoDisplay");
    volverMenuPrincipal.classList.add("botonMenuPrincipalMostrarReservas");
    let i=0;
    for (reservaProxima of controlador.mostrarProximasReservas()){
        controlador.reservas[i] = reservaProxima;
        console.log(reservaProxima);
        let fecha = new Date(reservaProxima.diaReserva);
        fecha.setDate(fecha.getDate() + 1);
        const listado = document.createElement('li');
        if (fecha.toLocaleDateString() == hoy.toLocaleString()){
            listado.innerHTML =  `RESERVA HOY a nombre de ${reservaProxima.nombreReserva} para ${reservaProxima.cantPersonas} personas, para el ${fecha.toLocaleDateString()} -- HORA: ${reservaProxima.horaReserva}HS\n`;
        }else{
            listado.innerHTML =  `La proxima reserva esta a nombre de ${reservaProxima.nombreReserva} para ${reservaProxima.cantPersonas} personas, para el ${fecha.toLocaleDateString()} -- HORA: ${reservaProxima.horaReserva}HS <button id = "botonReserva${i}" value="${i}" class="botonCancelarReserva"></button>\n`;
        }
        i+=1;
        console.log (i);
        listaReservas.append(listado);
    }
    let botonReserva = [];
    asignarDom(botonReserva);
    asignarEvento(botonReserva);
}



const asignarEvento = (boton) =>{
    for(let i=0; i < controlador.reservas.length; i++){
        boton[i].onclick = () =>{
            const botonBorrarReserva = document.createElement('div');
            botonBorrarReserva.innerHTML = `<button id = "borrarReserva" value="" class="botonCancelarReservaDefinitivo">BORRAR RESERVA de ${controlador.reservas[i].nombreReserva}</button>`
            listaReservas.append(botonBorrarReserva);
            let indice = boton[i].value;
            const borrarReserva = document.getElementById("borrarReserva");
            borrarReserva.onclick = () =>{
                Swal.fire({
                    title: `Desea borrar la resera de ${controlador.reservas[i].nombreReserva}?`,
                    text: "Una vez borrada no se podra recuperar!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes!'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        //ACA SEGUIR PARA BORRAR
                        controlador.reservas.splice(i,1);
                        console.log(controlador.reservas);
                        localStorage.setItem(`reservas`, JSON.stringify(controlador.reservas));
                        let reservasRecuperar2 = JSON.parse(localStorage.getItem(`reservas`));
                        console.log(reservasRecuperar2);
                      Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    }
                  })
            }
            console.log(indice);

        }
    }
}



console.log(controlador);