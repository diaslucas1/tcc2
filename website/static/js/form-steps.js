document.addEventListener("DOMContentLoaded", () => {
  class FormSteps {
    constructor(formId) {
      let multiForm = document.getElementById(formId),
          steps = multiForm.querySelectorAll(".step"),
          btnPrev = multiForm.querySelector(".btnPrev"),
          btnNext = multiForm.querySelector(".btnNext"),
          indicators = multiForm.querySelectorAll(".rounded-circle"),
          currentTab = 0;

      let inputs = document.querySelectorAll(".form-control");
      let inputsNumber = document.querySelectorAll(".form-control[type='number']");
      
      // Verificação se número é negativo
      inputsNumber.forEach(input => {
        input.addEventListener("change", function(){
          // seleciona o pai que envolve todos os elementos desse step
          let paiStep = input.parentNode.parentNode;
          let textoNegativo = document.createElement("span");
          let textLabel = input.parentNode.children[0].children[0].textContent;
          let spans = paiStep.querySelectorAll("span");

          if(input.value < 0) {
            textoNegativo.style.color = "red";
            textoNegativo.classList = "ml-3";
            spans.forEach(span => {
              if(span.classList.contains("ml-3") && span.textContent.indexOf(`${textLabel}`) != -1){
                textoNegativo.parentNode.removeChild(textoNegativo);
              } else {
                textoNegativo.innerHTML = `Campo ${textLabel} - Digite um valor maior que 0!<br>`;
              }
            })
          } else {
            spans.forEach(span => {
              if( (span.classList.contains("ml-3") && span.textContent.indexOf(`${textLabel}`) != -1) || (span.textContent == "")) {
                span.parentNode.removeChild(span);
              }
            })
          }
          paiStep.appendChild(textoNegativo);       
        })
      })

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
            numbers = steps[currentTab].querySelectorAll(".form-control[type='number']"),
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

        numbers.forEach(number => {
          if(number.value < 0) {
            if (!number.classList.contains("invalid")) {
              number.classList.add("invalid");
            }
          }
          if (number.value > 0) {
            if (number.classList.contains("invalid")) {
              number.classList.remove("invalid");
            } 
          }
        });

        return valid;

        // inputs.forEach(input => {
        //   input.value.replace(",",".");
        // })
        // inputs.value.replace(",","."); TROCAR VÍRGULA

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