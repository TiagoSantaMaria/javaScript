class Restaurante{
    constructor(){
        this.nombre = `Session`;
        this.direccion = `Siria 381`;
        this.usuario = `session`;
        this.clave = `123`;
        this.reservas = [];
    }
    mostrarMenu(){
        let control = 1;
        while (control === 1){
            let op;
            do{
            op = Number(prompt(`Bienvenidos Al Restaurante Sessions.
            Si desea hacer una reserva presione 1.
            Para dejarnos un mensaje presione 0.
            Para Confirmar una Reserva presione 2`));
            }while((op>2) || (op<0))
            if (op === 1){
                let res = new Reserva();
                res.cargaDatos();
                this.reservas.push(res);
            }
            if (op === 2){
                let nombreReserva = prompt(`Ingrese el nombre del dueño de la reserva:`);
                let reservaCompletada = this.reservas.find(reservaPen => reservaPen.nombreResponsable === nombreReserva);
                const index = this.reservas.indexOf(reservaCompletada);
                this.reservas[index].reservaPendiente = 'false';
            }
            do{
            control = Number(prompt(`
            0 - Cerrar Programa
            1 - Volver al menu`));
            }while((control>1) || (control<0))
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