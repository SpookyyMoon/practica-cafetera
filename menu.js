const fs = require('fs');
const datos = JSON.parse(fs.readFileSync('./cafe.json', 'utf8'));
const capacidad_max = datos.CAPACIDAD_MAXIMA;
const estado = datos.ESTADO_INICIAL;
const bebidas = datos.BEBIDAS;  
const prompt = require('prompt-sync')();

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
        for(let i = 0; i < 4; i++){
            if(bebidas[bebida].ingredientes[i].cantidad <= estado[i].cantidad){
                return true;
            }
            else{
                return false;
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
         if(this.comprobar_ingrediente_bebida(i) != false){
            console.log(`
        Bebida ${i}: ${bebidas[i].nombre}
            `);
            }
        }
    }
}

menu();

