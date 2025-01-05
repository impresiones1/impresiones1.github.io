document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const numberInput = document.getElementById("number");
    const select2 = document.getElementById("select2");
    const select3 = document.getElementById("select3");
    const impresionesInputByN = document.getElementById("impresionesByN");
    const impresionesInputColor = document.getElementById("impresionesColor");
    const anilladoInput = document.getElementById("anillado");
    const resultadoInputByN = document.getElementById("resultadoByN");
    const resultadoInputColor = document.getElementById("resultadoColor");
    const resetButton = document.getElementById("reset");
    const mensaje = document.getElementById("mensaje");
    const formatoSelect = document.getElementById("formato");
    const currencySymbol = "$";
    let timeoutId = null;

    // Función para calcular la expresión
    function calculateExpression(input) {
        try {
            let expression = input.value.replace(/x/gi, '*');
            if (!/^[\d\s+\-*/().]+$/.test(expression)) {
                throw new Error("Expresión inválida");
            }
            let result = Math.abs(eval(expression));
            if (isNaN(result) || !isFinite(result)) {
                throw new Error("Resultado inválido");
            }
            input.value = result;
            input.dataset.value = result;
            calcularImpresiones();
        } catch (e) {
            input.dataset.value = "";
            impresionesInputByN.value = "";
            impresionesInputColor.value = "";
            anilladoInput.value = "";
            resultadoInputByN.value = "";
            resultadoInputColor.value = "";
            mensaje.textContent = "";
        }
    }

    // Función para resetear
    function resetearFormulario() {
        numberInput.value = '';
        numberInput.dataset.value = '';
        impresionesInputByN.value = '';
        impresionesInputColor.value = '';
        anilladoInput.value = '';
        resultadoInputByN.value = '';
        resultadoInputColor.value = '';
        select3.value = 'Doble Faz';
        select2.value = 'ANILLADO';
        formatoSelect.value = 'A4';
        formatoSelect.classList.remove('a5-selected', 'apaisado-selected');
        select3.classList.remove("selected-purple");
        select2.classList.remove("selected-purple");
        mensaje.textContent = '';
    }

    // Event Listeners
    select3.addEventListener("change", function() {
        if (this.value === "Simple Faz") {
            this.classList.add("selected-purple");
        } else {
            this.classList.remove("selected-purple");
        }
        calcularImpresiones();
    });

    select2.addEventListener("change", function() {
        if (this.value === "SIN ANILLAR") {
            this.classList.add("selected-purple");
        } else {
            this.classList.remove("selected-purple");
        }
        calcularImpresiones();
    });

    numberInput.addEventListener("input", function() {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(resetearFormulario, 900000);

        this.value = this.value.replace(/[^0-9+\-*/().]/g, '');
        try {
            let expression = this.value.replace(/x/gi, '*');
            if (!/^[\d\s+\-*/().]+$/.test(expression)) {
                throw new Error("Expresión inválida");
            }
            let result = Math.abs(eval(expression));
            if (isNaN(result) || !isFinite(result)) {
                throw new Error("Resultado inválido");
            }
            this.dataset.value = result;
            calcularImpresiones();
        } catch (e) {
            this.dataset.value = "";
            impresionesInputByN.value = "";
            impresionesInputColor.value = "";
            anilladoInput.value = "";
            resultadoInputByN.value = "";
            resultadoInputColor.value = "";
            mensaje.textContent = "";
        }
    });

    numberInput.addEventListener("blur", function() {
        calculateExpression(this);
    });

    formatoSelect.addEventListener("change", function() {
        this.classList.remove('a5-selected', 'apaisado-selected');
        
        if (this.value === "A5") {
            this.classList.add('a5-selected');
        } else if (this.value === "Apaisado") {
            this.classList.add('apaisado-selected');
        }
        
        calcularImpresiones();
    });

    resetButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        resetearFormulario();
    });

    // Función calcularImpresiones actualizada
    function calcularImpresiones() {
    var numberValue = Math.abs(parseFloat(numberInput.dataset.value || 0));
    var select3Value = select3.value;
    var select2Value = select2.value;
    var formatoValue = formatoSelect.value;
    
    if (!isNaN(numberValue)) {
        var impresionesByN;
        var impresionesColor;
        var anillado;
        
        // Ajustar el número de páginas según el formato
        var paginasParaImpresion;
        var paginasParaAnillado;
        
        if (formatoValue === "A5") {
            paginasParaImpresion = numberValue / 2;
            paginasParaAnillado = numberValue;
        } else if (formatoValue === "Apaisado") {
            paginasParaImpresion = numberValue / 2;
            // Redondeamos hacia arriba para asegurarnos de que entre en el rango correcto
            paginasParaAnillado = Math.ceil(numberValue / 2);
        } else {
            paginasParaImpresion = numberValue;
            paginasParaAnillado = numberValue;
        }
        
        // Calcular impresiones ByN
        if (select3Value === "Doble Faz") {
            impresionesByN = Math.floor(paginasParaImpresion * 20 / 10) * 10;
        } else {
            impresionesByN = paginasParaImpresion * 25;
        }
        
        // Calcular impresiones Color
        if (select3Value === "Doble Faz") {
            impresionesColor = Math.floor(paginasParaImpresion * 25 / 10) * 10;
        } else {
            impresionesColor = paginasParaImpresion * 35;
        }

        // Calcular anillado usando paginasParaAnillado
        if (select2Value === "ANILLADO") {
            // Usamos Math.floor para asegurarnos de que los números decimales caigan en el rango correcto
            var paginasAnillado = Math.floor(paginasParaAnillado);
            
            if (paginasAnillado >= 1 && paginasAnillado <= 240) {
                anillado = 900;
            } else if (paginasAnillado >= 241 && paginasAnillado <= 400) {
                anillado = 1000;
            } else if (paginasAnillado >= 401 && paginasAnillado <= 500) {
                anillado = 1100;
            } else if (paginasAnillado >= 501 && paginasAnillado <= 700) {
                anillado = 1400;
            } else if (paginasAnillado >= 701 && paginasAnillado <= 800) {
                anillado = 1600;
            } else if (paginasAnillado >= 801 && paginasAnillado <= 1000) {
                anillado = 2 * 1100;
            } else if (paginasAnillado >= 1001 && paginasAnillado <= 1400) {
                anillado = 2 * 1400;
            } else if (paginasAnillado >= 1401 && paginasAnillado <= 1600) {
                anillado = 2 * 1600;
            } else if (paginasAnillado >= 1601 && paginasAnillado <= 2100) {
                anillado = 3 * 1400;
            } else if (paginasAnillado >= 2101 && paginasAnillado <= 2400) {
                anillado = 3 * 1600;
            } else if (paginasAnillado >= 2401 && paginasAnillado <= 2800) {
                anillado = 4 * 1400;
            } else if (paginasAnillado >= 2801 && paginasAnillado <= 3200) {
                anillado = 4 * 1600;
            } else if (paginasAnillado >= 3201 && paginasAnillado <= 3500) {
                anillado = 5 * 1400;
            } else if (paginasAnillado >= 3501 && paginasAnillado <= 4000) {
                anillado = 5 * 1600;
            } else if (paginasAnillado >= 4001 && paginasAnillado <= 4200) {
                anillado = 6 * 1400;
            } else if (paginasAnillado >= 4201 && paginasAnillado <= 4800) {
                anillado = 6 * 1600;
            } else if (paginasAnillado >= 4801) {
                anillado = Math.round(paginasAnillado / 800) * 1500;
            } else {
                anillado = 0;
            }
        } else {
            anillado = 0;
        }

        // Calcular resultados totales
        var resultadoByN = impresionesByN + anillado;
        var resultadoColor = impresionesColor + anillado;
                   
        impresionesInputByN.value = currencySymbol + " " + impresionesByN;
        impresionesInputColor.value = currencySymbol + " " + impresionesColor;
        anilladoInput.value = currencySymbol + " " + anillado;
        resultadoInputByN.value = currencySymbol + " " + resultadoByN;
        resultadoInputColor.value = currencySymbol + " " + resultadoColor;

        if (select2Value === "ANILLADO") {
            var paginasParaMensaje = formatoValue === "Apaisado" ? paginasParaAnillado : numberValue;
            if (paginasParaMensaje === 0 || (paginasParaMensaje && !isNaN(paginasParaMensaje) && paginasParaMensaje <= 800)) {
                mensaje.textContent = "";
            } else if (paginasParaMensaje && !isNaN(paginasParaMensaje) && paginasParaMensaje >= 801) {
                var division = Math.round(paginasParaMensaje / 800);
                var rounded = Math.round(division) + 1;
                mensaje.textContent = "EL DOCUMENTO SE DIVIDIRÁ EN " + rounded + " PARTES";
            }
        } else {
            mensaje.textContent = "";
        }
        } else {
            impresionesInputByN.value = "";
            impresionesInputColor.value = "";
            anilladoInput.value = "";
            resultadoInputByN.value = "";
            resultadoInputColor.value = "";
            mensaje.textContent = "";
        }
    }
});
