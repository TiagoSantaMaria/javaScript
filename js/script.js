class Restaurante{
    constructor(){
        this.nombre = `Session`;
        this.direccion = `Siria 381`;
        this.usuario = `session`;
        this.clave = `123`;
        this.reservasMaxPorDia = 40;
        this.reservas = [];
    }

    cargarDatosReserva(){
        let res = new Reserva();
        res.cargaDatos(this.obtenerDatosFormulario());
        if (this.controlMaxReservas(res.diaReserva, res.cantPersonas) === 'true'){;
            this.reservas.push(res);
            alert(`Reserva Registrada`)
        }else{
            alert(`La reserva no pudo ser registrada ya que se alcanzo el limite disponible.`)
        }
    }

    obtenerDatosFormulario(){
        let formularioReserva = document.getElementById("formularioReservas");
        formularioReserva.addEventListener("submit", this.guardarDatos());
    }
    
    guardarDatos(e){
        let nombrePersona = document.getElementById("nombreReserva");
        let telefonoResponsable = document.getElementById("telefonoReserva");
        let cantPerReserva = document.getElementById("cantPersonasReservas");
        let diaReserva = document.getElementById("fechaReserva");
        return (nombrePersona, telefonoResponsable, cantPerReserva, diaReserva);
    }


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
        const date = new Date;
        this.diaPedidoReserva = date.toUTCString();
    }
}

const controlador = new Restaurante;
controlador.cargarDatosReserva();
console.log(controlador);