import { ViewComponent } from "../ViewComponent.js";

const viewComponentProperties = [
  {
    templateName: "userId",
    modelName: "id",
  },
  {
    templateName: "name",
    modelName: "name",
  },
  {
    templateName: "description",
    modelName: "description",
  },
];

const templateRef = "js/view/components/UserCard/template.html";

class UserCard extends ViewComponent {
  constructor() {
    super({
      properties: viewComponentProperties,
      templateRef: templateRef,
    });
  }
}

const userCard = new UserCard();
export { userCard };
