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
            maquina_cafe.nueva_bebida();
            break;
        case 4:
            maquina_cafe.recargar_maquina();
            break;
        case 5:
            maquina_cafe.pedir_bebida();
            break;
        case 6:
            process.exit();
        default:
            return menu();
    }
}

class maquina_cafe{

    constructor(nombre, agua, cafe, leche, cacao, precio){
        this.nombre = nombre;
        this.ingredientes = [
            {
            nombre: "agua",
            cantidad: agua
            },
            {
            nombre: "cafe",
            cantidad: cafe
            },
            {
            nombre: "leche",
            cantidad: leche
            },
            {
            nombre: "cacao",
            cantidad: cacao
            },
        ];
        this.precio = precio;
    }

    static comprobar_ingrediente_bebida(bebida) {
        for (let i = 0; i < 4; i++) {
            if (bebidas[bebida].ingredientes[i].cantidad > estado[i].cantidad) {
                return false;
            }
        }
        return true;
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
            return menu();
    }

    static bebidas_disponibles(){
        console.clear();
        console.log('Mostrando bebidas disponibles...');
        for(let i = 0; i < bebidas.length; i++){
         if(this.comprobar_ingrediente_bebida(i) != false){
            console.log(`
        Bebida ${i}: ${bebidas[i].nombre} ${bebidas[i].precio}€
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
                //Copia profunda de datos y se reescribe (Soluciona el problema de guardado en memoria pero no en el json)
                datos.ESTADO_INICIAL = JSON.parse(JSON.stringify(capacidad_max));
                fs.writeFileSync('./cafe.json', JSON.stringify(datos, null, 4), 'utf8');
                //lectura desde valores y no desde objetos
                if (JSON.stringify(datos.ESTADO_INICIAL) === JSON.stringify(datos.CAPACIDAD_MAXIMA))
                {
                    console.log("¡Máquina recargada correctamente!");
                    prompt("Pulsa enter para volver al menú...");
                        return menu();
                }
                else{
                    prompt("Ha ocurrido un error al recargar la máquina!\nPulsa enter para volver al menú...");
                        return menu();
                }
            case "N": case "n":
                return menu();
            default:
                return this.recargar_maquina();
        }
    }

    static nueva_bebida(){
        console.clear();
        let nombre = prompt ("Introduce el nombre de la bebida: ");
            nueva_bebida_ingredientes();

        let agua = 0, cafe = 0, leche = 0, cacao = 0, precio = 0;

        function nueva_bebida_ingredientes(){
            console.clear();
            for(let i = 0; i < estado.length; i++){
                console.log(`
        ${i}: ${estado[i].nombre}
        `);
            }
            console.log("Selecciona el/los ingredientes de la bebida para añadir cantidades.\nLos valores a 0 (Por defecto) no consumen ese ingrediente.")
            let ingrediente = prompt ("Introduce 'p' para finalizar: ");
                switch(ingrediente){
                    case "0":
                        agua = Number(prompt ("Introduce la cantidad de agua (Valores enteros): "));
                        return nueva_bebida_ingredientes();
                    case "1":
                        cafe = Number(prompt ("Introduce la cantidad de café (Valores enteros): "));
                        return nueva_bebida_ingredientes();
                    case "2":
                        leche = Number(prompt ("Introduce la cantidad de leche (Valores enteros): "));
                        return nueva_bebida_ingredientes();
                    case "3":
                        cacao = Number(prompt ("Introduce la cantidad de cacao (Valores enteros): "));
                        return nueva_bebida_ingredientes();
                    case "p":
                        console.log(`
        Ingredienes actuales:
                    
            Agua: ${agua}
            Cafe: ${cafe}
            Leche: ${leche}
            Cacao: ${cacao}
                        `);
                        prompt ("Pulsa enter para continuar...");
                        nueva_bebida_precio();
                        break;
                    default:
                        return nueva_bebida_ingredientes();
                }
        }
        function nueva_bebida_precio(){
            console.clear();
            precio = Number(prompt ("Introduce el precio de la bebida: "));
            let nueva_bebida = new maquina_cafe(nombre, agua, cafe, leche, cacao, precio);;
            console.log(`¡Bebida ${nueva_bebida.nombre} a ${precio}€ agregada correctamente!`);
            bebidas.push(nueva_bebida);
            fs.writeFileSync('./cafe.json', JSON.stringify(datos, null, 4), 'utf8');
            prompt ("Pulsa enter para volver al menú...");
                return menu();
        }
    }

    static pedir_bebida(){
        console.clear();
        console.log('Mostrando bebidas disponibles...');
        for(let i = 0; i < bebidas.length; i++){
            if(this.comprobar_ingrediente_bebida(i) != false){
                console.log(`
        Bebida ${i}: ${bebidas[i].nombre} ${bebidas[i].precio}€
                `);
            }
        }
        let bebida = Number( prompt ("Introuce la bebida que deseas: "));
            if(isNaN(bebida) || bebida < 0 || bebida >= bebidas.length) {
                console.log("Has seleccionado una bebida inválida!");
                prompt ("Pulsa enter para volver...");
                    return this.pedir_bebida();
            }
            console.log(`Has seleccionado ${bebidas[bebida].nombre} a ${bebidas[bebida].precio}€`);
            let azucar_pedir = prompt ("¿Quieres añadir azucar?(S/N): ");
            switch (azucar_pedir){
                case "S": case "s":
                    for(let i = 0; i < bebidas[bebida].ingredientes.length; i++){
                        estado[i].cantidad -= bebidas[bebida].ingredientes[i].cantidad;
                        estado[5] -= 10;
                    }
                    console.log("¡Tu bebida se ha servido, disfruta!");
                    prompt ("Pulsa enter para volver al menú...");
                        return menu();
                
                case "N": case "n":
                    for(let i = 0; i < bebidas[bebida].ingredientes.length; i++){
                        estado[i].cantidad -= bebidas[bebida].ingredientes[i].cantidad;
                        }
                    console.log("¡Tu bebida se ha servido, disfruta!");
                    prompt ("Pulsa enter para volver al menú...");
                        return menu();
                    
                default:
                    return this.pedir_bebida();
        }
    }
}

menu();