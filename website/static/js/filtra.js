let searchFilter = document.querySelector(".buscar-propriedade");
let datas = document.querySelectorAll(".data-lista");

searchFilter.addEventListener("keyup", function() {
  let propriedades = document.querySelectorAll(".propriedade");

  if (this.value.length > 0) {
    for(let i = 0; i < propriedades.length; i++) {
      let propriedade = propriedades[i];
      let tdNome = propriedade.querySelector(".nome-list");
      let nome = tdNome.textContent;
      let expressao = new RegExp(this.value, "i");

      if(!expressao.test(nome)) {
        propriedade.classList.add("hide");
      } else {
        propriedade.classList.remove("hide");
      }
    }
  } else {
    for (let i = 0; i < propriedades.length; i++) {
      let propriedade = propriedades[i];
      propriedade.classList.remove("hide");      
    }
  }
});

datas.forEach(data => {
  data.textContent = data.textContent.split("-").reverse().join("/");
})