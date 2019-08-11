console.log('teste');

document.addEventListener("DOMContentLoaded", () => {
  class FormSteps {
    constructor(formId) {
      let multiForm = document.getElementById(formId),
          steps = multiForm.querySelectorAll(".step"),
          btnPrev = multiForm.querySelector(".btnPrev"),
          btnNext = multiForm.querySelector(".btnNext"),
          indicators = multiForm.querySelectorAll(".rounded-circle"),
          currentTab = 0;
      
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
          btnNext.setAttribute('type', 'submit');
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
        console.log(currentTab)
        if (currentTab >= steps.length) {
          // multiForm.submit();
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
           console.log("input")
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
      }

      btnPrev.addEventListener("click", () => {
        clickButton(-1);
      });

      btnNext.addEventListener("click", () => {
        clickButton(1);
      })
    }
  }
  let ms = new FormSteps("form-steps");
});