const fs = require('fs');
const datos = JSON.parse(fs.readFileSync('./cafe.json', 'utf8'));
const capacidad_max = datos.CAPACIDAD_MAXIMA;
const estado = datos.ESTADO_INICIAL;
const bebidas = datos.BEBIDAS;  
const prompt = require('prompt-sync')();

//Declaracion
let disponible;


function menu(){
    console.log(`
    --MÁQUINA DE CAFÉ---
    
    1. Bebidas disponibles
    2. Estado de la máquina
    3. Nueva bebida
    4. Recargar máquina
    5. Pedir bebida

    6. Salir
    `);

    let opcion = Number(prompt ('Selecciona una opción: '));
    switch(opcion){
        case 1:
            maquina_cafe.bebidas_disponibles();
            break;
        case 2:
            maquina_cafe.estado_maquina();
            break;
        case 3:
        case 4:
        case 5:
        case 6:
            process.exit();
    }
}

class maquina_cafe{

    static comprobar_ingrediente_bebida(bebida){
        //console.log("DEBUG",bebida);
        for(let i = 0; i < 4; i++){
            //console.log("DEBUG",bebida.ingredientes[i].cantidad, estado[i].cantidad);
            if(estado[i].cantidad >= bebida.ingredientes[i].cantidad){
                disponible = true;
                console.log(i)
                console.log("DEBUG - disponible", estado[i].nombre, "/", estado[i].cantidad, bebida.ingredientes[i].nombre, "/", bebida.ingredientes[i].cantidad);
            }
        }
    }

    static estado_maquina(){
        console.log('Comprobando el estado de la máquina...');
        estado.forEach(ingrediente => {
            console.log(`
        Ingrediente: ${ingrediente.nombre}
        Cantidad: ${ingrediente.cantidad}
            `);
        });
    }

    static bebidas_disponibles(){
        console.log('Mostrando bebidas disponibles...');
        for(let i = 0; i < bebidas.length; i++){
            //console.log(bebidas[i]);
            if(this.comprobar_ingrediente_bebida(bebidas[i]) == true){
                console.log(`
            Bebida ${i}: ${bebidas[i].nombre}
                `);
            }
        }
    }
}

menu();