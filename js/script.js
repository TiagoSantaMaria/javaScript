let nombrePieza;
let piezasDisponibles;
let piezasUsadas;

const cargaPieza = () => {
    alert("Buenos dias --- Carga y Descarga de piezas de Ferreteria");
    nombrePieza = prompt("Ingrese el nombre para la pieza"); 
    while (nombrePieza === ""){
    nombrePieza = prompt("Por favor ingrese un nombre para la pieza");
    }
    do{
        piezasDisponibles = Number(prompt(`Cantidad de piezas disponibles de ${nombrePieza}`));
        console.log(isNaN(piezasDisponibles));
    }while (isNaN(piezasDisponibles) !== false);
}

const usoPieza = () => {
    while (piezasDisponibles !== 0){
        do{
            piezasUsadas = Number(prompt("Cantidad de piezas usadas?"));
        }while (isNaN(piezasUsadas) !== false);
        if (piezasUsadas<=piezasDisponibles){
            piezasDisponibles = piezasDisponibles - piezasUsadas;
            alert(`Quedan ${piezasDisponibles} piezas de ${nombrePieza}`);
        }else if (piezasUsadas>piezasDisponibles){
            alert(`No se pudo realizar la accion, solo quedan ${piezasDisponibles} piezas`);
        }
    }
}

const ferreteria = () => {
    cargaPieza();
    usoPieza();
};

ferreteria();