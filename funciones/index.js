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

    objetivoMasCerca(escaner, objetivoMech){
        var coordenadas = {};
        var escanerFiltrado = [];
        var distanciaMenor = 999;

        var menorY = 0;
        var menorX = 0;

        //solo si tiene como principal a los mech o no, si no existe parametro, obtiene el mas cerca en general
        if (objetivoMech!==''){
            escanerFiltrado = this.ejecutarFiltroMech(escaner, objetivoMech)
            if (Object.keys(escanerFiltrado).length) {
                escaner = escanerFiltrado
            }
        }

        escaner.forEach(function(sc){
            if (menorX ===0 && menorY===0){ //es la primera iteracion, se toma el primero como menor
                menorX= sc.coordinates.x;
                menorY = sc.coordinates.y

            }

            var band = sc.coordinates.y + sc.coordinates.x;

            if (band<distanciaMenor){

                distanciaMenor= band;

                if (sc.coordinates.y<menorY){
                    menorX= sc.coordinates.x;
                    menorY = sc.coordinates.y
                }


                coordenadas ={
                    "x":sc.coordinates.x,
                    "y":sc.coordinates.y
                }
            }

            else if (band === distanciaMenor){

                if (sc.coordinates.y<menorY){
                    coordenadas ={
                        "x":sc.coordinates.x,
                        "y":sc.coordinates.y
                    }
                }
                else{
                    coordenadas ={
                        "x":menorX,
                        "y":menorY
                    }
                }
            }

            if (sc.coordinates.y<menorY){
                coordenadas ={
                    "x":sc.coordinates.x,
                    "y":sc.coordinates.y
                }
            }
            else{
                coordenadas ={
                    "x":menorX,
                    "y":menorY
                }
            }


        });
        return coordenadas;
    }

    objetivoMasLejos(escaner, objetivoMech){
        var coordenadas = {};
        var escanerFiltrado = [];
        var distanciaMayor = 0;

        var mayorY = 0;
        var mayorX = 0;

        //solo si tiene como principal a los mech o no, si no existe parametro, obtiene el mas cerca en general
        if (objetivoMech!==''){
            escanerFiltrado = this.ejecutarFiltroMech(escaner, objetivoMech)
            if (Object.keys(escanerFiltrado).length) {
                escaner = escanerFiltrado
            }
        }

        escaner.forEach(function(sc){
            if (mayorX ===0 && mayorY===0){ //es la primera iteracion, se toma el primero como menor
                mayorX= sc.coordinates.x;
                mayorY = sc.coordinates.y

            }

            var band = sc.coordinates.y + sc.coordinates.x;

            if (band>distanciaMayor){

                if (sc.coordinates.y>mayorY){
                    mayorX= sc.coordinates.x;
                    mayorY = sc.coordinates.y
                }

                distanciaMayor= band
                coordenadas ={
                    "x":sc.coordinates.x,
                    "y":sc.coordinates.y
                }
            }

            else if (band === distanciaMayor){

                if (sc.coordinates.y>mayorY){
                    coordenadas ={
                        "x":sc.coordinates.x,
                        "y":sc.coordinates.y
                    }
                }
                else{
                    coordenadas ={
                        "x":mayorX,
                        "y":mayorY
                    }
                }
            }
        });
        return coordenadas;
    }

    siguienteObjetivo(escaner,objetivoMech,distancia){
        var comparar = distancia==="lejos"?">":"<";
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
                    console.log("Nuevo lejano: "+sc.coordinates.x +", "+sc.coordinates.y +" con " +distanciaTemp+" Metros");
                    distanciaObjetivo = distanciaTemp;
                    coordenadas = {"x":sc.coordinates.x, "y":sc.coordinates.y};
                }
            }
            else if(distancia ==="cerca"){
                if (distanciaTemp < distanciaObjetivo  ){
                    distanciaObjetivo = distanciaTemp;
                    coordenadas = {"x":sc.coordinates.x, "y":sc.coordinates.y};
                }
            }
        });

        return coordenadas;
    }

}

module.exports = Funciones