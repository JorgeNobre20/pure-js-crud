import { ViewComponent } from "../ViewComponent.js";

const viewComponentProperties = [
  {
    templateName: "message",
    modelName: "message",
  },
];
const templateRef = "js/view/components/EmptyListLabel/template.html";

class EmptyListLabel extends ViewComponent {
  constructor() {
    super({
      properties: viewComponentProperties,
      templateRef: templateRef,
    });
  }
}

const emptyListLabel = new EmptyListLabel();
export { emptyListLabel };
