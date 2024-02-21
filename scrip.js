document.addEventListener("DOMContentLoaded", function() {
    var numberInput = document.getElementById("number");
    var select1 = document.getElementById("select1");
    var select2 = document.getElementById("select2");
    var select3 = document.getElementById("select3");
    var impresionesInput = document.getElementById("impresiones");
    var anilladoInput = document.getElementById("anillado");
    var resultadoInput = document.getElementById("resultado");
    const currencySymbol = "$";
  
    numberInput.addEventListener("input", calcularImpresiones);
    select1.addEventListener("change", calcularImpresiones);
    select2.addEventListener("change", calcularImpresiones);
    select3.addEventListener("change", calcularImpresiones);
    
    var mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = "";

    numberInput.addEventListener("input", function() {
    if (numberInput.value === "") {
    mensaje.textContent = "";
    } else {
    calcularImpresiones();
    }
    });

    function calcularImpresiones() {
      var numberValue = Math.abs(parseFloat(numberInput.value));
      var select1Value = select1.value;
      var select2Value = select2.value;
      var select3Value = select3.value;
      
                  
      if (!isNaN(numberValue)) {
        var impresiones;
        var anillado;
        var resultado;
        

            if (select1Value === "ByN" && select3Value === "Doble Faz") {
            impresiones = Math.floor(numberValue * 20 / 10) * 10;
            } else if (select1Value === "COLOR" && select3Value === "Doble Faz") {
            impresiones =  Math.floor(numberValue * 25 / 10) * 10;
            } else if (select1Value === "ByN" && select3Value === "Simple Faz") {
            impresiones = numberValue * 25;
            } else if (select1Value === "COLOR" && select3Value === "Simple Faz") {
            impresiones = numberValue * 35;
            } else {
            impresiones = "";
            }
    
            if (select2Value === "ANILLADO") {
                if (numberValue >= 1 && numberValue <= 240) {
                    anillado = 900;
                } else if (numberValue >= 241 && numberValue <= 400) {
                    anillado = 1000;
                } else if (numberValue >= 401 && numberValue <= 500) {
                    anillado = 1100;
                } else if (numberValue >= 501 && numberValue <= 700) {
                    anillado = 1400;
                } else if (numberValue >= 701 && numberValue <= 800) {
                    anillado = 1600;
                } else if (numberValue >= 801 && numberValue <= 1000) {
                    anillado = 2 * 1100;
                } else if (numberValue >= 1001 && numberValue <= 1400) {
                    anillado = 2 * 1400;
                } else if (numberValue >= 1401 && numberValue <= 1600) {
                    anillado = 2 * 1600;
                } else if (numberValue >= 1601 && numberValue <= 2100) {
                    anillado = 3 * 1400;
                } else if (numberValue >= 2101 && numberValue <= 2400) {
                    anillado = 3 * 1600;
                } else if (numberValue >= 2401 && numberValue <= 2800) {
                    anillado = 4 * 1400;
                } else if (numberValue >= 2801 && numberValue <= 3200) {
                    anillado = 4 * 1600;
                } else if (numberValue >= 3201 && numberValue <= 3500) {
                    anillado = 5 * 1400;
                } else if (numberValue >= 3501 && numberValue <= 4000) {
                    anillado = 5 * 1600;
                } else if (numberValue >= 4001 && numberValue <= 4200) {
                    anillado = 6 * 1400;
                } else if (numberValue >= 4201 && numberValue <= 4800) {
                    anillado = 6 * 1600;
                } else if (numberValue >= 4801) {
                    anillado = Math.round(numberValue / 800) * 1500;
                } else {
                    anillado = 0;
            }
            } else {
            anillado = 0;
            }

            resultado = impresiones + anillado;
                       
            impresionesInput.value = currencySymbol + " " + impresiones;
            anilladoInput.value = currencySymbol + " " + anillado;
            resultadoInput.value = currencySymbol + " " + resultado;

            if (select2Value === "ANILLADO") {
              if (numberValue === 0 || (numberValue && !isNaN(numberValue) && numberValue <= 800)) {
                mensaje.textContent = "";
              } else if (numberValue && !isNaN(numberValue) && numberValue >= 801) {
                var division = Math.round(numberValue / 800);
                var rounded = Math.round(division) + 1;
                mensaje.textContent = "EL DOCUMENTO SE DIVIDIRÁ EN " + rounded + " PARTES";
              }
            } else {
              mensaje.textContent = "";
            }

      } else {
        impresionesInput.value = "";
        anilladoInput.value = "";
        resultadoInput.value = "";
        mensaje.textContent = ""
      }

    }
    
    
});
