import TextUrlapElem from "./TextUrlapElem.js";

class UrlapView {
  #leiro = {};
  #urlapElemLista = [];
  #valid = true;
  #urlapAdatok = {};
  constructor(szuloELem, leiro) {
    this.#leiro = leiro;
    this.szuloELem = szuloELem;
    this.szuloELem.html("<form>")
    this.formElem = this.szuloELem.children("form");
    this.#urlapLetrehoz();
    console.log(this.#leiro.index)
    
    this.submitElem = $("#submit");
    this.submitElem.on("click", (event) => {
      let egyKivalasztva = false;
      event.preventDefault();
      for (const key in this.#leiro) {
        if (this.#leiro[key].type === "radio") {
          const radioButtons = this.formElem.find(`input[name=${this.key}]`);
          const selected = radioButtons.filter(":checked").length > 0;
          egyKivalasztva = egyKivalasztva || selected;
        }
      }
     
      
      this.#urlapElemLista.forEach(elem => {
        this.#valid = true;
        this.#valid = this.#valid && elem.valid
        console.log(this.#valid);
      });
      if (egyKivalasztva) {
        this.#valid = true;
        console.log(this.#valid);
      } else {
        this.#valid = false;
        console.log(this.#valid);
      }
      if (this.#valid) {
        console.log("Valid az urlap!")
        this.#urlapElemLista.forEach(elem => {
          let ertek = elem.ertek;
          let kulcs = elem.key;
          this.#urlapAdatok[kulcs] = ertek;
          //console.log(this.#urlapAdatok)
          this.sajatEsemeny("AdatKiir");
        });
      }
      else {
        console.log("Nem valid az urlap!")
      }
    });

  };



  #urlapLetrehoz() {
    for (const key in this.#leiro) {
      switch (this.#leiro[key].type) {
        case "text":
          //this.#textElem(key);
          this.#urlapElemLista.push(new TextUrlapElem(key, this.#leiro[key], this.formElem));
          break;
        case "number":
          this.#numberElem(key);
          break;
        case "radio":
          let txt = `${this.#leiro[key].megj}:<br>`;
          this.formElem.append(txt);
          for (const kulcs in this.#leiro.nem.value) {
            const value = this.#leiro.nem.value[kulcs];
            this.#radioElem(key, value);
          }

        default:

      }

    }

    let txt = `<input id="submit" type="submit" class="btn btn-primary" value="küldés"></form>`
    this.formElem.append(txt);
  }

  #numberElem(key) {
    let txt = ``;
    txt += ` <div class="mb-3 mt-3"><label class="form-label" for="${key}">${this.#leiro[key].megj}</label><input type="${this.#leiro[key].type}" class="form-control" id="${key}" name="${key}" min="${this.#leiro[key].regex.min}" max="${this.#leiro[key].regex.max}" value="${this.#leiro[key].value}" "></div>`;
    txt += `<div class="valid lathato">OK</div>`;
    txt += `<div class="invalid lathato">${key}">${this.#leiro[key].valid}</div>`;
    this.formElem.append(txt);
  }

  #radioElem(key, value) {
    let txt = ``;
    txt += `<input type="radio" id="${key}" name="${key}" value="${value}">`;
    txt += `<label for="${key}">${value}</label><br>`;
    this.formElem.append(txt);

  }
  sajatEsemeny(nev) {
    let esemenyem = new CustomEvent(nev, { detail: this.#urlapAdatok })
    window.dispatchEvent(esemenyem);
  }
}
export default UrlapView;

