import Model from "../model/Model.js";
import UrlapView from "../view/UrlapView.js";
class Controller {
  constructor() {
    this.urlapModel = new Model();
    this.urlapView = new UrlapView($(".urlap"), this.urlapModel.getLeiro());

    $(window).on("AdatKiir", (event) => {
        console.log(event.detail);
    });
  }
}
export default Controller;
