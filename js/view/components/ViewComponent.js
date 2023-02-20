export class ViewComponent {
  _properties = [];

  _templateRef;
  _template = null;

  constructor({ properties, templateRef }) {
    this._properties = properties;
    this._templateRef = templateRef;
  }

  async loadTemplate() {
    try {
      await this._tryLoadTemplate();
    } catch (error) {
      this._catchLoadTemplate(error);
    }
  }

  async _tryLoadTemplate() {
    if (this._template) {
      return;
    }

    const response = await fetch(this._templateRef);
    const componentTemplate = await response.text();

    this._template = componentTemplate;
  }

  async _catchLoadTemplate(error) {
    alert(error.message);
  }

  render(data) {
    let componentWithProps = this._template;

    this._properties.forEach((property) => {
      const { modelName, templateName } = property;

      componentWithProps = componentWithProps.replaceAll(
        `{${templateName}}`,
        data[modelName]
      );
    });

    return componentWithProps;
  }
}
