class Restaurante{
    constructor(){
        this.nombre = `Session`;
        this.direccion = `Siria 381`;
        this.usuario = `session`;
        this.clave = `123`;
        this.reservasMaxPorDia = 30;
        this.reservas = [];
    }

    cargarDatosReserva(nombre, telefono, cantPersonas, fecha){
        let res = new Reserva();
        res.cargaDatos(nombre, telefono, cantPersonas, fecha);
        if (this.controlMaxReservas(res.diaReserva, res.cantPersonas) === 'true'){
            this.reservas.push(res);
            localStorage.setItem(`reservas`, JSON.stringify(this.reservas));
            return `true`;
        }else{
            return `false`;
        }
    }
/*
    confirmarReserva(){
        let nombreReserva = prompt(`Ingrese el nombre del dueño de la reserva:`);
        let reservaCompletada = this.reservas.find(reservaPen => reservaPen.nombreResponsable === nombreReserva);
        const index = this.reservas.indexOf(reservaCompletada);
        this.reservas[index].reservaPendiente = 'false';
    }
    */

    mostrarProximasReservas(){
        const reservasProximas = this.reservas.filter(reservasProx => reservasProx.reservaPendiente === 'true');
        reservasProximas.sort((a, b) => a.diaReserva - b.diaReserva);
        console.log(reservasProximas);
        return reservasProximas;
    }

    controlMaxReservas(fechaCorrienteReserva,cantPersonas){
        let capacidadAcumulada = cantPersonas;
        this.reservas.forEach( reserva => {
            if (reserva.diaReserva.getTime() === fechaCorrienteReserva.getTime()){
                capacidadAcumulada =  capacidadAcumulada + reserva.cantPersonas;
            }
        })
        if (capacidadAcumulada <= this.reservasMaxPorDia){
            return 'true';
        }
    }
}

class Reserva{
    constructor(){
        this.nombreResponsable;
        this.telResponsable;
        this.cantPersonas;
        this.diaReserva;
        this.diaPedidoReserva;
        this.reservaPendiente = 'true';
    }
    cargaDatos(nombre, telefono, cantPersonasReserva, fecha){
        this.nombreResponsable = nombre;
        this.telResponsable = telefono;
        this.cantPersonas = cantPersonasReserva;
        this.diaReserva = new Date(fecha);
    }
}




//CONTROLADOR
let controlador = new Restaurante;

//TRAER DATOS DEL STORAGE
let reservasRecuperar = JSON.parse(localStorage.getItem(`reservas`));
console.log(reservasRecuperar);
if (!!reservasRecuperar && reservasRecuperar.length > 0) {
    let i = 0;
    for (const reserva of reservasRecuperar){
        controlador.reservas[i] = reserva;
        console.log(controlador.reservas[i]);
        i++;
    }
}
console.log(controlador);


//BOTON FORMULARIO
const registarReserva = document.getElementById("registarReserva");
registarReserva.onclick = () => {
    //IMPRIMIR FORMULARIO
    const mostrarFormulario = document.getElementById("formulario");
    mostrarFormulario.innerHTML = `
    <form id="formularioReservas">
        <input id="nombreReserva" type="text" autocomplete="off" placeholder="Ingresar el nombre de la persona a cargo de la reserva" />
        <input id="telefonoReserva" type="number" autocomplete="off" placeholder="Ingresar el telefono a cargo de la reserva" />
        <input id="cantPersonasReservas" type="number" autocomplete="off" placeholder="Ingresar la cantidad de personas en la reserva" />
        <input id="fechaReserva" type="date" autocomplete="off" placeholder="Ingresar el dia de la reserva (formato MM/DD/YYYY)" />
        <input id="btn" type="submit" value="Agregar Reserva" />
    </form>
    `;
    // TRAER DATOS DEL FORMULARIO DEL HTML
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
                if(controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, cantPerReserva.value, diaReserva.value) == `true`){
                    console.log(controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, cantPerReserva.value, diaReserva.value));
                    respuestaFormulario.innerHTML = `Bienvenido ${nombrePersona.value} su reserva fue Registrada con exito`;
                    Swal.fire(
                        `La reserva a nombre de ${nombrePersona.value} fue cargada con exito!`,
                      )
                }else if (controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, cantPerReserva.value, diaReserva.value) == `false`){
                    respuestaFormulario.innerHTML = `Disculpe ${nombrePersona.value} su reserva no pudo ser registrada ya que el limite de Reservas por dia fue alcanzado`;
                    Swal.fire(
                        `La reserva a nombre de ${nombrePersona.value} no pudo ser cargada por limite de capacidad!`,
                      )
                };
            }
          })
    }
}

//BOTON MOSTRAR RESERVAS
const mostrarReservas = document.getElementById("mostrarReserva");
const listaReservas = document.getElementById("mostrarReservasProximas");
let i = 0;
mostrarReservas.onclick = () => {
    for (reservaProxima of controlador.mostrarProximasReservas()){
        const listado = document.createElement('li');
        listado.innerHTML =  `La proxima reserva esta a nombre de ${reservaProxima.nombreResponsable} para ${reservaProxima.cantPersonas} personas, para el ${reservaProxima.diaReserva}\n`;
        listaReservas.append(listado);
    }
}