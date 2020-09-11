class Funciones {

    ejecutarFiltroMech(scan, tipo) {
        var scanFiltrado = [];

        scan.forEach(function (sc) {
            if (tipo === 'evitaMech') {
                if (sc.enemies.type !== "mech") {
                    scanFiltrado.push(sc);
                }
            } else if (tipo === 'priorizaMech') {
                if (sc.enemies.type === "mech") {
                    scanFiltrado.push(sc);
                }
            }
        });
        return scanFiltrado;
    }

    seleccionMech(escaner,tipo) {
        var coordenadas = {};
        var scanfiltrado = this.ejecutarFiltroMech(escaner, tipo);
        if (Object.keys(scanfiltrado).length) {
            escaner = scanfiltrado
        }
        escaner.forEach(function (sc) {
            coordenadas = {
                "x": sc.coordinates.x,
                "y": sc.coordinates.y
            }
        });

        return coordenadas;
    }

    siguienteObjetivo(escaner,objetivoMech,distancia, indicacion){
        var coordenadas = {};
        var distanciaObjetivo =distancia==="lejos"?0:999;
        var escanerFiltrado = [];

        if (objetivoMech!==''){
            escanerFiltrado = this.ejecutarFiltroMech(escaner, objetivoMech)
            if (Object.keys(escanerFiltrado).length) {
                escaner = escanerFiltrado
            }
        }
        escaner.forEach(function(sc){
            var distanciaTemp = 0;

            //calcula distancia entre 2 puntos
            distanciaTemp = Math.sqrt(Math.pow(sc.coordinates.x, 2) + Math.pow(sc.coordinates.y,2));

            if (distancia ==="lejos"){
                if (distanciaTemp > distanciaObjetivo  ){
                    distanciaObjetivo = distanciaTemp;
                    coordenadas = {"x":sc.coordinates.x, "y":sc.coordinates.y};
                }
            }
            else if(distancia ==="cerca"){
                if (distanciaTemp < distanciaObjetivo  ){
                    if (indicacion ==="evitaAliados"){
                        distanciaObjetivo = distanciaTemp;
                        if (!sc.hasOwnProperty('allies')){
                            coordenadas ={
                                "x":sc.coordinates.x,
                                "y":sc.coordinates.y
                            }
                        }
                    }
                    //distanciaObjetivo = distanciaTemp;
                    //coordenadas = {"x":sc.coordinates.x, "y":sc.coordinates.y};
                }
            }
        });
        return coordenadas;
    }

}

module.exports = Funciones