class TextUrlapElem{
    #key;
    #elemLeiro={};
    #valid= false;
    #ertek = "";
    constructor(key, elemLeiro, szuloElem ){
        this.#key = key;
        this.#elemLeiro = elemLeiro;
        this.formElem = szuloElem;
      
        this.#textElem();
        this.inputElem = $(`#${this.#key}`);
        

        console.log(this.inputElem);

        this.validElem = $(".valid:last");
        this.InvalidElem = $(".invalid:last");
        
       this.inputElem.on("keyup", ()=>{
        this.#ertek = this.inputElem.val();
        let reg = this.#elemLeiro.regex;
        let regReg = new RegExp(reg);

        if(regReg.test( this.#ertek )){
            this.validElem.removeClass("lathato");
            this.InvalidElem.addClass("lathato");
            this.#valid = true;
        }else{
        this.InvalidElem.removeClass("lathato");
        this.validElem.addClass("lathato");
        this.#valid = false;
    }
       
       


       })
        
    }
    #textElem(){
        let txt = ``;
        txt +=` <div class="mb-3 mt-3"><label class="form-label" for="${this.#key}">${this.#elemLeiro.megj}</label><input type="${this.#elemLeiro.type}" class="form-control" id="${this.#key}" name="${this.#key}" placeholder="${this.#elemLeiro.placeholder}" value="${this.#elemLeiro.value}" " "></div>`;
        txt+=`<div class="valid lathato">OK</div>`;
        txt+=`<div class="invalid lathato">${this.#elemLeiro.valid}</div>`;
        this.formElem.append(txt);
      }
      get ertek(){
        return this.#ertek;
      }

      get valid(){
        return this.#valid;
      }
      get key(){
        return this.#key;
      }
}
export default TextUrlapElem;