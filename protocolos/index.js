function seleccionaMech(scan, prioridadMech,evitaFuego){
    var scanFiltrado = [];

    scan.forEach(function(sc){
       if (prioridadMech===1){
           if (sc.enemies.type!=="mech"){
               scanFiltrado.push(sc);
           }
       }
       else if (prioridadMech===2){
           var cond = "";
           if (evitaFuego){
               cond=" && !sc.hasOwnProperty('allies')";
           }
           if (sc.enemies.type==="mech" +cond){
               scanFiltrado.push(sc);
           }
       }
    });
    return scanFiltrado;
}
function obtieneMasCerca(scan, evitaMech,evitaFuego){
    var coordenadas = {};
    var distanciaMenor = 999;

    var menorY = 0;
    var menorX = 0;

    var xaux = 0;
    var yaux = 0;
    //si evitaMech hace filtro
    if (evitaMech===1){
        scanf = seleccionaMech(scan, 1,evitaFuego)
        if (Object.entries(scanf).length > 0){
            scan=scanf
        }
    }
    else if(evitaMech===2){
        scanf = seleccionaMech(scan, 2,evitaFuego)
        if (Object.entries(scanf).length > 0){
            scan=scanf
        }
    }

    scan.forEach(function(sc){
        if (menorX ===0 && menorY===0){
            menorX= sc.coordinates.x;
            menorY = sc.coordinates.y

            xaux= sc.coordinates.x;
            yaux = sc.coordinates.y
        }

        var band = sc.coordinates.y + sc.coordinates.x;

        if (band<distanciaMenor){

            if (sc.coordinates.y<menorY){
                menorX= sc.coordinates.x;
                menorY = sc.coordinates.y

                xaux= sc.coordinates.x;
                yaux = sc.coordinates.y
            }
            distanciaMenor= band
            coordenadas ={
                "x":sc.coordinates.x,
                "y":sc.coordinates.y
            }
        }

        else if (band === distanciaMenor){
            coordenadas ={
                "x":sc.coordinates.x,
                "y":sc.coordinates.y
            }
            menorX = sc.coordinates.x;
            menorY = sc.coordinates.y;

            xaux= sc.coordinates.x;
            yaux = sc.coordinates.y
        }

        if (sc.coordinates.y<menorY){
            coordenadas ={
                "x":sc.coordinates.x,
                "y":sc.coordinates.y
            }
        }
        else{
            coordenadas ={
                "x":xaux,
                "y":yaux
            }
        }

    });
    return coordenadas;
}

function obtieneMasLejos(scan, evitaMech){
    var coordenadas = {};
    var distanciaMayor = 0;

    var mayorX = 0;
    var mayorY = 0;


    var xaux = 0;
    var yaux = 0;
    //si evitaMech hace filtro
    if (evitaMech){
        scanf = seleccionaMech(scan,1,false)
        if (Object.entries(scanf).length > 0){
            scan=scanf
        }
    }
    scan.forEach(function(sc){
        if (mayorX ===0 && mayorY===0){
            mayorX= sc.coordinates.x;
            mayorY = sc.coordinates.y

            xaux= sc.coordinates.x;
            yaux = sc.coordinates.y
        }

        var band = sc.coordinates.y + sc.coordinates.x;

        if (band>distanciaMayor){

            if (sc.coordinates.y>mayorY){
                mayorY = sc.coordinates.y;
                mayorX = sc.coordinates.x;
            }
            distanciaMayor= band
            coordenadas ={
                "x":sc.coordinates.x,
                "y":sc.coordinates.y
            }
        }

        else if (band === distanciaMayor){

            if (sc.coordinates.y>mayorY){
                mayorY = sc.coordinates.y;
                mayorX = sc.coordinates.x;
            }

            coordenadas ={
                "x":mayorX,
                "y":mayorY
            }
        }

        if (sc.coordinates.y>mayorY){
            coordenadas ={
                "x":sc.coordinates.x,
                "y":sc.coordinates.y
            }
        }
    });
    return coordenadas;

}

function obtieneMech(scan,tipo){
    var coordenadas = {};
    var existeMech = false;
    scan.forEach(function(sc){
        if (tipo===1){//evitando mech
            if (sc.enemies.type!=="mech"){
                coordenadas ={
                    "x":sc.coordinates.x,
                    "y":sc.coordinates.y
                }
            }
        }
        else{
            if (!existeMech){
                coordenadas ={
                    "x":sc.coordinates.x,
                    "y":sc.coordinates.y
                }
            }
            if (sc.enemies.type==="mech"){
                existeMech = true;
                coordenadas ={
                    "x":sc.coordinates.x,
                    "y":sc.coordinates.y
                }
            }
        }
    });
    return coordenadas;
}

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
    switch (protocol.sort().toString()) {
        case "avoid-mech":
            coordenadas = obtieneMech(scan,1);
            break;
        case "closest-enemies":
            coordenadas = obtieneMasCerca(scan,0,false);
            break;
        case "prioritize-mech":
            coordenadas =obtieneMech(scan,2);
            break;

        case "furthest-enemies":
            coordenadas = obtieneMasLejos(scan,false);
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
            coordenadas = obtieneMasCerca(scan,1,false)
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


