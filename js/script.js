class Restaurante{
    constructor(){
        this.nombre = `Session`;
        this.direccion = `Siria 381`;
        this.usuario = `session`;
        this.clave = `123`;
        this.reservasMaxPorDia = 10;
        this.reservas = [];
    }
    mostrarMenu(){
        let control = 1;
        while (control === 1){
            let op;
            do{
            op = Number(prompt(`Bienvenidos Al Restaurante Sessions.0
            0 = Para dejarnos un mensaje.
            1 = Si desea hacer una reserva.
            2 = Para Confirmar una Reserva.
            3 = Mostrar Reservas Proximas`));
            }while((op>3) || (op<0))
            if (op === 1){
                this.cargarDatosReserva();
            }
            if (op === 2){
                this.confirmarReserva();
            }
            if (op === 3){
                this.mostrarProximasReservas();
            }            
            do{
            control = Number(prompt(`
            0 - Cerrar Programa
            1 - Volver al menu`));
            }while((control>1) || (control<0))
        }
    }
    cargarDatosReserva(){
        let res = new Reserva();
        res.cargaDatos();
        if (this.controlMaxReservas(res.diaReserva, res.cantPersonas) === 'true'){;
            this.reservas.push(res);
            alert(`Reserva Registrada`)
        }else{
            alert(`La reserva no pudo ser registrada ya que se alcanzo el limite disponible.`)
        }
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
    cargaDatos(){
        this.nombreResponsable = prompt(`Ingresar el nombre de la persona a cargo de la reserva`);
        this.telResponsable = Number(prompt(`Ingresar el telefono a cargo de la reserva`));
        this.cantPersonas = Number(prompt(`Ingresar la cantidad de personas en la reserva`));
        this.diaReserva = new Date(prompt(`Ingresar el dia de la reserva (formato MM/DD/YYYY)`));
        const date = new Date;
        this.diaPedidoReserva = date.toUTCString();
    }
}

const controlador = new Restaurante;
controlador.mostrarMenu();
console.log(controlador);