export const loadTemplate = async (templatePath) => {
  const response = await fetch(templatePath);
  const templateText = await response.text();
  // const template = document.createElement("template");
  // template.innerHTML = templateText;
  // return template.content.cloneNode(true);
  return templateText;
};
