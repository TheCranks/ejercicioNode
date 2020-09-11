const Functions = require("../funciones/index.js");
var funciones = new Functions();

function obtieneAsistenciaAliado(scan,ataca){
    var obtenido = false;
    var coordenadas = {};
    scan.forEach(function(sc){
        if (!obtenido){
            if (ataca===1){//ataca priorizando aliados
                if (sc.hasOwnProperty('allies')){
                    obtenido = true;
                    coordenadas ={
                        "x":sc.coordinates.x,
                        "y":sc.coordinates.y
                    }
                }

            }

            else if (ataca ===0){//evita cuando haya aliados
                if (!sc.hasOwnProperty('allies')){
                    obtenido = true;
                    coordenadas ={
                        "x":sc.coordinates.x,
                        "y":sc.coordinates.y
                    }
                }
                if (!obtenido){
                    coordenadas ={
                        "x":sc.coordinates.x,
                        "y":sc.coordinates.y
                    }
                }
            }
        }
    });
    return coordenadas
}

exports.getValidationProtocol = (protocol,scan) => {
    var coordenadas = {}
    switch (protocol.sort().toString()) {
        case "avoid-mech":
            coordenadas = funciones.seleccionMech(scan,'evitaMech');
            break;
        case "closest-enemies":
            //coordenadas = funciones.objetivoMasCerca(scan,'');
            coordenadas = funciones.siguienteObjetivo(scan,'','cerca');
            break;
        case "prioritize-mech":
            coordenadas = funciones.seleccionMech(scan,'priorizaMech');
            break;

        case "furthest-enemies":
            coordenadas = funciones.siguienteObjetivo(scan,'','lejos')
            break;
        case "assist-allies":
            //prioriza donde haya algun aliado
            coordenadas = obtieneAsistenciaAliado(scan,1);
            break
        case "avoid-crossfire":
            //No ataca ningun punto que exista un aliado
            coordenadas = obtieneAsistenciaAliado(scan,0);
            break;
        case "avoid-mech,closest-enemies":

            //coordenadas = funciones.objetivoMasCerca(scan,'evitaMech')
            coordenadas = funciones.siguienteObjetivo(scan,'evitaMech','cerca')
            break;
        case "avoid-mech,furthest-enemies":
           coordenadas = obtieneMasLejos(scan,true);
            break;
        case "closest-enemies,prioritize-mech":
            coordenadas = obtieneMasCerca(scan,2,false);
            break;
        case "avoid-crossfire,closest-enemies,prioritize-mech":
            coordenadas = obtieneMasCerca(scan,3, true);
            break;
    }
return coordenadas;

};
exports.saludar =() =>{
  console.log("Hola desde protocolo");
}


