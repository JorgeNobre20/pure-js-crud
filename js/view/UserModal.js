import { userService } from "../services/UserService.js";
import { userModal } from "./components/UserModal/component.js";
import { showErrorToast, showSuccessToast } from "./ToastFeedback.js";
import { generateUserList } from "./UserList.js";

export async function renderUserModal() {
  const parent = document.getElementById("userModalParent");
  await userModal.loadTemplate();

  parent.innerHTML = userModal.render();

  addOpenModalEventListener();
  addUserModalSubmitListener();
}

function addOpenModalEventListener() {
  const modal = document.getElementById("userModal");

  const userModalElements = getUserModalElements();

  modal.addEventListener("show.bs.modal", async (event) => {
    const button = event.relatedTarget;

    showUserGlobalModalLoading();
    const userId = button.getAttribute("data-bs-user");

    setSubmitButtonStatusToDefault();

    if (userId) {
      await fillUserModalModalForm(userId, userModalElements);
    } else {
      clearUserModalModalForm(userModalElements);
    }

    hideUserGlobalModalLoading();
  });
}

function showUserGlobalModalLoading() {
  const userModalContent = document.getElementById("userModalContent");

  const userModalGlobalLoading = document.getElementById(
    "userModalGlobalLoading"
  );

  userModalContent.classList.remove("visible");
  userModalContent.classList.add("invisible");

  userModalGlobalLoading.classList.remove("d-none");
  userModalGlobalLoading.classList.add("d-flex");
}

function hideUserGlobalModalLoading() {
  const userModalContent = document.getElementById("userModalContent");

  const userModalGlobalLoading = document.getElementById(
    "userModalGlobalLoading"
  );

  userModalContent.classList.remove("invisible");
  userModalContent.classList.add("visible");

  userModalGlobalLoading.classList.remove("d-flex");
  userModalGlobalLoading.classList.add("d-none");
}

async function fillUserModalModalForm(userId, userModalElements) {
  showUserGlobalModalLoading();

  const user = await getUserById(userId);

  userModalElements.modalTitle.innerText = "Dados do Usuário";

  userModalElements.nameField.value = user.name;
  userModalElements.emailField.value = user.email;
  userModalElements.descriptionField.value = user.description;

  userModalElements.submitButton.setAttribute("data-user-id", userId);
}

async function getUserById(userId) {
  try {
    const userData = await tryGetUserById(userId);
    return userData;
  } catch (error) {
    catchError(error);
    closeModal();
  }
}

async function tryGetUserById(userId) {
  const user = await userService.getById(userId);
  return user;
}

async function clearUserModalModalForm(userModalElements) {
  userModalElements.modalTitle.innerText = "Cadastrar Novo Usuário";

  userModalElements.nameField.value = "";
  userModalElements.emailField.value = "";
  userModalElements.descriptionField.value = "";

  userModalElements.submitButton.setAttribute("data-user-id", "");
}

function addUserModalSubmitListener() {
  const submitButton = document.getElementById("userModalSubmitButton");

  const userModalElements = getUserModalElements();

  submitButton.addEventListener("click", async () => {
    const userModalData = getUserModalData(userModalElements);

    await handleSubmit(userModalData);
  });
}

async function handleSubmit(userModalData) {
  setSubmitButtonStatusToLoading();

  if (userModalData.userId) {
    await updateUser(userModalData);
  } else {
    await createUser(userModalData);
  }

  setSubmitButtonStatusToDefault();
}

async function updateUser(userModalData) {
  try {
    await tryUpdateUser(userModalData);
  } catch (error) {
    catchError(error);
  }
}

async function tryUpdateUser(userModalData) {
  const { userId, name, email, description } = userModalData;

  await userService.update({
    id: userId,
    name,
    email,
    description,
  });

  closeModal();
  showSuccessToast("Usuário atualizado com sucesso");
}

async function createUser(userModalData) {
  try {
    await tryCreateUser(userModalData);
  } catch (error) {
    catchError(error);
  }
}

async function tryCreateUser(userModalData) {
  const { name, email, description } = userModalData;

  await userService.create({
    name,
    email,
    description,
  });

  closeModal();
  showSuccessToast("Usuário cadastrado com sucesso");
}

async function catchError(error) {
  showErrorToast(error.message);
}

function setSubmitButtonStatusToLoading() {
  const submitButton = document.getElementById("userModalSubmitButton");
  submitButton.setAttribute("disabled", true);

  const submitButtonLabel = document.getElementById(
    "userModalSubmitButtonLabel"
  );
  submitButtonLabel.innerText = "";

  const submitButtonSpinner = document.getElementById(
    "userModalSubmitButtonSpinner"
  );

  submitButtonSpinner.classList.remove("d-none");
  submitButtonSpinner.classList.add("d-flex");
}

function setSubmitButtonStatusToDefault() {
  const submitButton = document.getElementById("userModalSubmitButton");
  submitButton.removeAttribute("disabled");

  const submitButtonLabel = document.getElementById(
    "userModalSubmitButtonLabel"
  );
  submitButtonLabel.innerText = "Salvar";

  const submitButtonSpinner = document.getElementById(
    "userModalSubmitButtonSpinner"
  );

  submitButtonSpinner.classList.add("d-none");
  submitButtonSpinner.classList.remove("d-flex");
}

function getUserModalData(userModalElements) {
  const userId = userModalElements.submitButton.getAttribute("data-user-id");
  const name = userModalElements.nameField.value;
  const email = userModalElements.emailField.value;
  const description = userModalElements.descriptionField.value;

  return {
    userId,
    name,
    email,
    description,
  };
}

function getUserModalElements() {
  const userModalElements = {
    modalTitle: document.getElementById("userModalTitle"),
    nameField: document.getElementById("userFormName"),
    emailField: document.getElementById("userFormEmail"),
    descriptionField: document.getElementById("userFormDescription"),
    submitButton: document.getElementById("userModalSubmitButton"),
  };

  return userModalElements;
}

function closeModal() {
  const closeModalButton = document.getElementById("closeUserFormModal");
  closeModalButton.dispatchEvent(new Event("click"));

  generateUserList();
}
