document.addEventListener("DOMContentLoaded", () => {
  class FormSteps {
    constructor(formId) {
      let multiForm = document.getElementById(formId),
          steps = multiForm.querySelectorAll(".step"),
          btnPrev = multiForm.querySelector(".btnPrev"),
          btnNext = multiForm.querySelector(".btnNext"),
          indicators = multiForm.querySelectorAll(".rounded-circle"),
          currentTab = 0;
      
      // variáveis para utilizar nos cálculos de correção
      // Fósforo
      let fosfAtingir = document.getElementById("id_fosforo_atingir");
      let teorFosf = document.getElementById("id_fosforo");
      let fonteFosf = document.getElementById("id_fonte_fosforo");
      let eficFosf = document.getElementById("id_eficiencia_fosforo");
      let custoFosf = document.getElementById("id_valor_fosforo");
      let calcFosf = [fosfAtingir, teorFosf, fonteFosf, eficFosf, custoFosf];

      // Potássio
      let potAtingir = document.getElementById("id_potassio_atingir");
      let teorPot = document.getElementById("id_potassio");
      let teorCal = document.getElementById("id_calcio");
      let teorMag = document.getElementById("id_magnesio");
      let teorHAL = document.getElementById("id_hal")
      let calcPot = [potAtingir,teorPot, teorCal, teorMag, teorHAL];

      showTab(currentTab);

      function showTab(n) {
        steps[n].classList.add("active");
        if (n === 0) {
          btnPrev.classList.add("hide");
          btnPrev.classList.remove("show");
        } else {
          btnPrev.classList.add("show");
          btnPrev.classList.remove("hide");
        }
        if (n === steps.length - 1) {
          btnNext.textContent = "Enviar";
          // btnNext.setAttribute('type', 'submit');
        } else {
          btnNext.textContent = "Próximo";
        }
        showIndicators(n);
      }
      
      function showIndicators(n) {
        for (let i = 0; i < indicators.length; i++) {
          indicators[i].classList.replace("bg-warning", "bg-success");
        }
        indicators[n].className += " bg-warning";
      }
      
      function clickButton(n) {
        if (n == 1 && !validateForm()) return false;
        steps[currentTab].classList.remove("active");
        currentTab += n;
        if (currentTab >= steps.length) {
          multiForm.submit();
          return false;
        }
        showTab(currentTab);
      }


      //função de validar
      function validateForm() {
        let inputs = steps[currentTab].querySelectorAll(".form-control"),
            valid = true;
        for (let i = 0; i < inputs.length; i++) {
          if (inputs[i].value == "") {
            if (!inputs[i].classList.contains("invalid")) {
            inputs[i].classList.add("invalid");
            }
            valid = false;
          }
          if (!inputs[i].value == "") {
            if (inputs[i].classList.contains("invalid")) {
              inputs[i].classList.remove("invalid");
            } 
          }
        }
        return valid;

        // inputs.value.replace(",","."); TROCAR VÍRGULA

      }

      btnPrev.addEventListener("click", () => {
        clickButton(-1);
      });

      btnNext.addEventListener("click", () => {
        clickButton(1);
      })

      // Cálculos da planilha para correção/recuperação
      // Fósforo
      function corrigeFosf() {
        let qntFosf = document.querySelector(".correcao-fosforo");

        let difAtingirAtual = fosfAtingir.value - teorFosf.value;
        let porcFosf = (eficFosf.value) / 100;
        let memCalc = (difAtingirAtual * 2 * 2.29 * 100) / porcFosf / 100;
        let resultadoFosf = ((memCalc * 100) / 18).toFixed(2); // valor da fonte de fósforo estática

        let custoTotal = ((custoFosf.value) * resultadoFosf * 2.42 / 1000 / 2.42).toFixed(2);
        
        if(difAtingirAtual > 0.01) {
          qntFosf.innerHTML = `
            <p>Quantidade a aplicar: ${resultadoFosf}</p>
            <p>Custo - R$/ha: ${custoTotal}</p>
          `;
        } else {
          difAtingirAtual = 0.0;
          qntFosf.innerHTML = `
            <p>Quantidade a aplicar: ${resultadoFosf}</p>
            <p>Custo - R$/ha: ${custoTotal}</p>
          `;
        }

      }
      calcFosf.forEach((input) => {
        input.addEventListener('keyup', corrigeFosf);
      });

      // Potássio
      function corrigePot() {
        let qntPot = document.querySelector(".correcao-potassio");

        let partAtual = ((+teorPot.value) / ((+teorPot.value) + (+teorCal.value) + (+teorMag.value) + (+teorHAL.value)) * 100);
        
        let relacDesejAtual = (teorPot.value * potAtingir.value / partAtual) - teorPot.value;
        let memCalc = relacDesejAtual * 39.1 * 10 * 2 * 1.2 * 100 / (85/100) / 100;
        let resultadoFosf = (memCalc * 100 / 58).toFixed(2) // 58 - Valor estático, correspondente a escolha da fonte de potásio

        qntPot.innerHTML = `
          <p>Participação atual do Potássio na CTC do solo: ${partAtual.toFixed(1)}</p>
          <p>Quantidade a aplicar: ${resultadoFosf}</p>
        `;
      }
      calcPot.forEach((input) => {
        input.addEventListener('keyup', corrigePot);
      });
      


    }
  }
  let ms = new FormSteps("form-steps");
});