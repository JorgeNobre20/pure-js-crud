import { userService } from "../services/UserService.js";
import { emptyListLabel } from "./components/EmptyListLabel/component.js";
import { userCard } from "./components/UserCard/component.js";
import { catchError } from "./ShowError.js";
import { showSuccessToast } from "./ToastFeedback.js";

export async function generateUserList() {
  const parent = document.getElementById("userList");
  parent.innerHTML = "";

  showUserListLoading();

  const users = await userService.getAll();

  if (users.length === 0) {
    await showEmptyListAlert(parent);
  } else {
    await showUsersList(parent, users);
  }

  hideUserListLoading();
}

async function showUsersList(parent, users) {
  await userCard.loadTemplate();

  const parentContent = users.map((user) => {
    return userCard.render(user);
  });

  parent.innerHTML = parentContent.join("");
  addRemoveUserButtonActions();
}

async function showEmptyListAlert(parent) {
  await emptyListLabel.loadTemplate();

  parent.innerHTML = emptyListLabel.render({
    message: "Não há usuários cadastrados",
  });
}

function showUserListLoading() {
  const loading = document.getElementById("userListLoading");
  loading.classList.remove("d-none");
  loading.classList.add("d-block");
}

function hideUserListLoading() {
  const loading = document.getElementById("userListLoading");
  loading.classList.remove("d-block");
  loading.classList.add("d-none");
}

function addRemoveUserButtonActions() {
  const removeUserButtons = document.querySelectorAll(".btn-remove-user");

  const buttons = Array.from(removeUserButtons);
  buttons.forEach((button) => {
    const userId = button.getAttribute("data-user");
    setDeleteUserButtonStatusToDefault(userId);

    button.addEventListener("click", async () => {
      deleteUser(userId);
    });
  });
}

async function deleteUser(userId) {
  setDeleteUserButtonStatusToLoading(userId);

  try {
    await tryDeleteUser(userId);
  } catch (error) {
    catchError(error);
    setDeleteUserButtonStatusToDefault(userId);
  }
}

async function tryDeleteUser(userId) {
  await userService.delete(userId);
  showSuccessToast("Usuário removido com sucesso");
  generateUserList();
}

function setDeleteUserButtonStatusToLoading(userId) {
  const { button, buttonLabel, buttonSpinner } =
    getDeleteUserButtonElements(userId);

  button.setAttribute("disabled", true);

  buttonLabel.innerText = "";

  buttonSpinner.classList.remove("d-none");
  buttonSpinner.classList.add("d-flex");
}

function setDeleteUserButtonStatusToDefault(userId) {
  const { button, buttonLabel, buttonSpinner } =
    getDeleteUserButtonElements(userId);

  button.removeAttribute("disabled");

  buttonLabel.innerText = "Remover";

  buttonSpinner.classList.remove("d-flex");
  buttonSpinner.classList.add("d-none");
}

function getDeleteUserButtonElements(userId) {
  const button = document.querySelector(
    `.btn-remove-user[data-user="${userId}"]`
  );

  const buttonLabel = document.querySelector(
    `.btn-remove-user-label[data-user="${userId}"]`
  );

  const buttonSpinner = document.querySelector(
    `.btn-remove-user-spinner[data-user="${userId}"]`
  );

  return {
    button,
    buttonLabel,
    buttonSpinner,
  };
}
