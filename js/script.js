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
    cargarDatosReserva(nombre, telefono, cantPersonas, fecha){
        let res = new Reserva();
        res.cargaDatos(nombre, telefono, cantPersonas, fecha);
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
        const reservasProximas = this.reservas.filter(reservasProx => reservasProx.reservaPendiente === 'true');
        reservasProximas.sort((a, b) => a.diaReserva - b.diaReserva);
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
        this.reservaPendiente = 'true';
    }
    cargaDatos(nombre, telefono, cantPersonasReserva, fecha){
        this.nombreReserva = nombre;
        this.telReserva = telefono;
        this.cantPersonas = parseInt(cantPersonasReserva);
        this.diaReserva = new Date(fecha);
    }
}

//DOM
const mostrarFormulario = document.getElementById("formulario");
const volverMenuPrincipal = document.getElementById("volverMenuPrincipal");
const registarReserva = document.getElementById("registarReserva");


//FUNCIONES
const volverAlMenuPrincipal = () =>{
    volverMenuPrincipal.onclick = () =>{
        location.reload();
    };
}

const reservasStorage = () =>{
    let reservasRecuperar = JSON.parse(localStorage.getItem(`reservas`));
    if (!!reservasRecuperar && reservasRecuperar.length > 0) {
        let i = 0;
        for (const reserva of reservasRecuperar){
            controlador.reservas[i] = reserva;
            console.log(controlador.reservas[i]);
            i++;
        }
    }
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
        console.log(controlador);
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
        <input id="fechaReserva" type="date" autocomplete="off" placeholder="Ingresar el dia de la reserva (formato MM/DD/YYYY)" />
        <input id="btn" type="submit" value="Agregar Reserva" />
    </form>
    <button id = "volverMenuPrincipal" class="">Volver al Menu Principal</button>
    `;
}
//--------------

//CONTROLADOR
let controlador = new Restaurante;

//TRAER DATOS DEL STORAGE
reservasStorage();
obtenerReservaAsync();

//BOTON REGISTRAR NUEVA RESERVA
registarReserva.onclick = () => {
    let elemento1 = document.getElementById("registarReserva");
    let elemento2 = document.getElementById("mostrarReserva");
    elemento1.className = "desactivoDisplay";
    elemento2.className = "desactivoDisplay";
    //IMPRIMIR FORMULARIO
    imprimirFormulario();
    // RELACIONAR DATOS DEL DOM 'FORMULARIO'
    let nombrePersona = document.getElementById("nombreReserva");
    let telefonoResponsable = document.getElementById("telefonoReserva");
    let cantPerReserva = document.getElementById("cantPersonasReservas");
    let diaReserva = document.getElementById("fechaReserva");
    //RESPUESTA FORMULARIO
    const respuestaFormulario = document.getElementById("formularioReservas")
    respuestaFormulario.onsubmit = (e) => {
        e.preventDefault();  
        //VALIDACIONES DATOS FORMULARIOS
        nombrePersona.value = nombrePersona.value || "NO DEFINIDO";
        telefonoResponsable.value = telefonoResponsable.value || 0;
        cantPerReserva.value = cantPerReserva.value || 0;
        diaReserva.value = diaReserva.value || "1000-01-01";
        /////////////////////////////////
        //ALERTS
        Swal.fire({
            title: 'Desea cargar la siguiente reserva?',
            text: `|${nombrePersona.value}|${telefonoResponsable.value}|${cantPerReserva.value}|${diaReserva.value}|`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'CARGAR RESERVA'
        }).then((result) => {
            if (result.isConfirmed) {
                if(controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, parseInt(cantPerReserva.value), diaReserva.value) == `true`){                    
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
    }
    console.log(controlador);
}


//BOTON MOSTRAR RESERVAS
const mostrarReservas = document.getElementById("mostrarReserva");
const listaReservas = document.getElementById("mostrarReservasProximas");
let i = 0;
mostrarReservas.onclick = () => {
    for (reservaProxima of controlador.mostrarProximasReservas()){
        const listado = document.createElement('li');
        listado.innerHTML =  `La proxima reserva esta a nombre de ${reservaProxima.nombreReserva} para ${reservaProxima.cantPersonas} personas, para el ${reservaProxima.diaReserva}\n`;
        listaReservas.append(listado);
    }
}