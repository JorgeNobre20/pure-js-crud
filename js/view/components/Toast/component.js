import { ViewComponent } from "../ViewComponent.js";

const viewComponentProperties = [];
const templateRef = "js/view/components/Toast/template.html";

class Toast extends ViewComponent {
  constructor() {
    super({
      properties: viewComponentProperties,
      templateRef: templateRef,
    });
  }
}

const toast = new Toast();
export { toast };
