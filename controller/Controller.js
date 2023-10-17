import Model from "../model/Model.js";
import UrlapView from "../view/UrlapView.js";
class Controller {
  constructor() {
    this.urlapModel = new Model();
    this.urlapView = new UrlapView($(".urlap"), this.urlapModel.getLeiro());
  
  }
}
export default Controller;
