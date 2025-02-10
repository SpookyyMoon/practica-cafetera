const fs = require('fs');
const datos = JSON.parse(fs.readFileSync('./cafe.json', 'utf8'));
const capacidad_max = datos.CAPACIDAD_MAXIMA;
let estado = datos.ESTADO_INICIAL;
let bebidas = datos.BEBIDAS;  
const prompt = require('prompt-sync')();

function menu(){
    console.clear();
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
            maquina_cafe.recargar_maquina();
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
        console.clear();
        console.log('Comprobando el estado de la máquina...');
        estado.forEach(ingrediente => {
            console.log(`
        Ingrediente: ${ingrediente.nombre}
        Cantidad: ${ingrediente.cantidad}
            `);
        });
        prompt ("Pulsa enter para volver al menú...");
            menu();
    }

    static bebidas_disponibles(){
        console.clear();
        console.log('Mostrando bebidas disponibles...');
        for(let i = 0; i < bebidas.length; i++){
         if(this.comprobar_ingrediente_bebida(i) != false){
            console.log(`
        Bebida ${i}: ${bebidas[i].nombre}
            `);
            }
        }
        prompt ("Pulsa enter para volver al menú...");
            menu();
    }

    static recargar_maquina(){
        console.clear();
        let opcion = prompt ("¿Recargar la máquina a su máxima capacidad? (S/N): ");
        switch (opcion){
            case "S": case "s":
                datos.ESTADO_INICIAL = JSON.parse(JSON.stringify(capacidad_max));
                fs.writeFileSync('./cafe.json', JSON.stringify(datos, null, 4), 'utf8');
                if(estado == capacidad_max){
                    console.log("¡Máquina recargada correctamente!");
                    prompt("Pulsa enter para volver al menú...");
                    menu();
                }
                else{
                    console.log("Ha ocurrido un error al recargar la máquina!");
                }
                break;
            case "N": case "n":
                menu();
                break;
            default:
                this.recargar_maquina();
                break;
        }
    }
}

menu();

