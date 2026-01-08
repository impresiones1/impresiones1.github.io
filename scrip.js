document.addEventListener("DOMContentLoaded", function() {
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
        
        const colorElements = document.querySelectorAll('.color-element');
        colorElements.forEach(el => {
            el.style.display = 'flex';
        });
        
        const totalColorBox = document.querySelector('.total-box.color.color-element');
        if (totalColorBox) {
            totalColorBox.style.display = 'flex';
            totalColorBox.style.flexDirection = 'column';
        }
    }

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

        // Solo permitir números enteros
        this.value = this.value.replace(/[^0-9]/g, '');
        
        let result = Math.abs(parseInt(this.value) || 0);
        this.dataset.value = result;
        
        if (this.value && !isNaN(result)) {
            calcularImpresiones();
        } else {
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
        if (this.value) {
            let result = Math.abs(parseInt(this.value) || 0);
            this.value = result;
            this.dataset.value = result;
            calcularImpresiones();
        }
    });

    formatoSelect.addEventListener("change", function() {
        this.classList.remove('a5-selected', 'apaisado-selected');
        
        const colorElements = document.querySelectorAll('.color-element');
        const totalColorBox = document.querySelector('.total-box.color.color-element');
        
        if (this.value === "A5") {
            this.classList.add('a5-selected');
            colorElements.forEach(el => el.style.display = 'none');
            impresionesInputColor.value = '';
            resultadoInputColor.value = '';
        } else if (this.value === "Apaisado") {
            this.classList.add('apaisado-selected');
            colorElements.forEach(el => el.style.display = 'none');
            impresionesInputColor.value = '';
            resultadoInputColor.value = '';
        } else {
            colorElements.forEach(el => {
                el.style.display = 'flex';
            });
            if (totalColorBox) {
                totalColorBox.style.flexDirection = 'column';
            }
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

    function calcularImpresiones() {
        var numberValue = Math.abs(parseFloat(numberInput.dataset.value || 0));
        var select3Value = select3.value;
        var select2Value = select2.value;
        var formatoValue = formatoSelect.value;
        
        if (!isNaN(numberValue)) {
            var impresionesByN;
            var impresionesColor;
            var anillado;
            
            var paginasParaImpresion;
            var paginasParaAnillado;
            
            if (formatoValue === "A5") {
                paginasParaImpresion = numberValue / 2;
                paginasParaAnillado = numberValue;
            } else if (formatoValue === "Apaisado") {
                paginasParaImpresion = numberValue / 2;
                paginasParaAnillado = Math.ceil(numberValue / 2);
            } else {
                paginasParaImpresion = numberValue;
                paginasParaAnillado = numberValue;
            }
            
            if (select3Value === "Doble Faz") {
                impresionesByN = Math.floor(paginasParaImpresion * 40 / 10) * 10;
            } else {
                impresionesByN = paginasParaImpresion * 50;
            }
            
            if (select3Value === "Doble Faz") {
                impresionesColor = Math.floor(paginasParaImpresion * 50 / 10) * 10;
            } else {
                impresionesColor = paginasParaImpresion * 65;
            }

            if (select2Value === "ANILLADO") {
                var paginasAnillado = Math.floor(paginasParaAnillado);
                
                if (paginasAnillado >= 1 && paginasAnillado <= 240) {
                    anillado = 1150;
                } else if (paginasAnillado >= 241 && paginasAnillado <= 400) {
                    anillado = 1250;
                } else if (paginasAnillado >= 401 && paginasAnillado <= 500) {
                    anillado = 1400;
                } else if (paginasAnillado >= 501 && paginasAnillado <= 700) {
                    anillado = 1800;
                } else if (paginasAnillado >= 701 && paginasAnillado <= 800) {
                    anillado = 2100;
                } else if (paginasAnillado >= 801 && paginasAnillado <= 1003) {
                    anillado = 2 * 1400; 
                } else if (paginasAnillado >= 1004 && paginasAnillado <= 1199) {
                    anillado = 2 * 1800;
                } else if (paginasAnillado >= 1200 && paginasAnillado <= 1505) {
                    anillado = 3 * 1400;
                } else if (paginasAnillado >= 1506 && paginasAnillado <= 1999) {
                    anillado = 3 * 1800;
                } else if (paginasAnillado >= 2000 && paginasAnillado <= 2799) {
                    anillado = 4 * 1800;
                } else if (paginasAnillado >= 2800 && paginasAnillado <= 3599) {
                    anillado = 5 * 1800;
                } else if (paginasAnillado >= 3600 && paginasAnillado <= 4399) {
                    anillado = 6 * 1800;
                } else if (paginasAnillado >= 4400 && paginasAnillado <= 4800) {
                    anillado = 7 * 1800;
                } else if (paginasAnillado >= 4801) {
                    anillado = Math.round(paginasAnillado / 800) * 1800;
                } else {
                    anillado = 0;
                }
            } else {
                anillado = 0;
            }

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