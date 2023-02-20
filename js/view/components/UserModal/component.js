import { ViewComponent } from "../ViewComponent.js";

const viewComponentProperties = [];
const templateRef = "js/view/components/UserModal/template.html";

class UserModal extends ViewComponent {
  constructor() {
    super({
      properties: viewComponentProperties,
      templateRef: templateRef,
    });
  }
}

const userModal = new UserModal();
export { userModal };
