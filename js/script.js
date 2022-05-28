alert("Buenos dias --- Carga y Descarga de piezas de Ferreteria")
let nombreObjeto = prompt("Ingrese el nombre para la pieza"); 
while (nombreObjeto === ""){
    nombreObjeto = prompt("Por favor ingrese un nombre para la pieza");
}
let piezasDisponibles = Number(prompt(`Cantidad de piezas disponibles de ${nombreObjeto}`));
while (piezasDisponibles !== 0){
    let piezasUsadas = Number(prompt("Cantidad de piezas usadas?"))
    if (piezasUsadas<=piezasDisponibles){
        piezasDisponibles = piezasDisponibles - piezasUsadas;
        alert(`Quedan ${piezasDisponibles} piezas de ${nombreObjeto}`);
    }else if (piezasUsadas>piezasDisponibles){
        alert(`No se pudo realizar la accion, solo quedan ${piezasDisponibles} piezas`);
    }
}