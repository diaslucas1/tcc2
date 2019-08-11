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
      let fosfAtingir = document.getElementById("id_fosforo_atingir");
      let teorFosf = document.getElementById("id_fosforo");
      let fonteFosf = document.getElementById("id_fonte_fosforo");
      let eficFosf = document.getElementById("id_eficiencia_fosforo");
      let calcFosf = [fosfAtingir, teorFosf, fonteFosf, eficFosf];

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
      function corrigePot() {
        let qntFosf = document.querySelector(".correcao-fosforo");

        let difAtingirAtual = fosfAtingir.value - teorFosf.value;
        let porcFosf = (eficFosf.value) / 100;
        let memCalc = (difAtingirAtual * 2 * 2.29 * 100) / porcFosf / 100;
        let resultadoFosf = ((memCalc * 100) / 18).toFixed(2); // valor da fonte de fósforo estática
        
        if(difAtingirAtual > 0.01) {
          qntFosf.innerHTML = `<p>Quantidade a aplicar: ${resultadoFosf}`;
        } else {
          difAtingirAtual = 0.0;
          qntFosf.innerHTML = `<p>Quantidade a aplicar: ${resultadoFosf}`;
        }

      }
      calcFosf.forEach((input) => {
        input.addEventListener('keyup', corrigePot);
      });

    }
  }
  let ms = new FormSteps("form-steps");
});