import { toast } from "./components/Toast/component.js";

export async function createToast() {
  const parent = document.getElementById("toastContainer");

  await toast.loadTemplate();
  const toastComponent = toast.render();

  parent.innerHTML = toastComponent;
}

export function showSuccessToast(message) {
  const toast = document.getElementById("feedbackToast");
  toast.classList.add("text-bg-success");
  toast.classList.remove("text-bg-danger");

  const toastMessage = document.getElementById("toastMessage");
  toastMessage.innerText = message;

  $("#feedbackToast").toast("show");
}

export function showErrorToast(message) {
  const toast = document.getElementById("feedbackToast");
  toast.classList.add("text-bg-danger");
  toast.classList.remove("text-bg-success");

  const toastMessage = document.getElementById("toastMessage");
  toastMessage.innerText = message;

  $("#feedbackToast").toast("show");
}
