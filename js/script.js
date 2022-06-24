class Restaurante{
    constructor(){
        this.nombre = `Session`;
        this.direccion = `Siria 381`;
        this.usuario = `session`;
        this.clave = `123`;
        this.reservasMaxPorDia = 20;
        this.reservas = [];
    }

    cargarDatosReserva(nombre, telefono, cantPersonas, fecha){
        let res = new Reserva();
        res.cargaDatos(nombre, telefono, cantPersonas, fecha);
        if (this.controlMaxReservas(res.diaReserva, res.cantPersonas) === 'true'){;
            this.reservas.push(res);
            alert(`Reserva Registrada`)
        }else{
            alert(`La reserva no pudo ser registrada ya que se alcanzo el limite disponible.`)
        }
    }
/*
    confirmarReserva(){
        let nombreReserva = prompt(`Ingrese el nombre del dueño de la reserva:`);
        let reservaCompletada = this.reservas.find(reservaPen => reservaPen.nombreResponsable === nombreReserva);
        const index = this.reservas.indexOf(reservaCompletada);
        this.reservas[index].reservaPendiente = 'false';
    }

    mostrarProximasReservas(){
        const reservasProximas = this.reservas.filter(reservasProx => reservasProx.reservaPendiente === 'true');
        reservasProximas.sort((a, b) => a.diaReserva - b.diaReserva);
        console.log(reservasProximas);
        reservasProximas.forEach( reservaProx => {
            console.log(`Prox Reserva:
            Nombre: ${reservaProx.nombreResponsable} 
            CantPersonas: ${reservaProx.cantPersonas}
            Dia Reserva: ${reservaProx.diaReserva}`);
        })
    }
*/

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

// TRAER ELEMENTOS DEL HTML
const formularioReserva = document.getElementById("formularioReservas");
const nombrePersona = document.getElementById("nombreReserva");
const telefonoResponsable = document.getElementById("telefonoReserva");
const cantPerReserva = document.getElementById("cantPersonasReservas");
const diaReserva = document.getElementById("fechaReserva");
const respuestaFormulario = document.getElementById("respuestaFormulario");

//ARMADO DEL PROGRAMA
let controlador = new Restaurante;
formularioReserva.onsubmit = (e) => {
    e.preventDefault();
    controlador.cargarDatosReserva(nombrePersona.value, telefonoResponsable.value, cantPerReserva.value, diaReserva.value);
    console.log(controlador)
    respuestaFormulario.innerHTML = `Bienvenido ${nombrePersona.value} su reserva fue Registrada con exito`;
}

