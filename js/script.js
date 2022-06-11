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
            Para dejarnos un mensaje presione 0.`));
            }while((op>1) || (op<0))
            if (op === 1){
                let res = new Reserva();
                res.cargaDatos();
                console.log(res);
                this.reservas.push(res);
                console.log(this.reservas);
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
    }
    cargaDatos(){
        this.nombreResponsable = prompt(`Ingresar el nombre de la persona a cargo de la reserva`);
        this.telResponsable = Number(prompt(`Ingresar el telefono a cargo de la reserva`));
        this.cantPersonas = Number(prompt(`Ingresar la cantidad de personas en la reserva`));
    }
}

const controlador = new Restaurante;
console.log(Restaurante);
controlador.mostrarMenu();