import { firestoreUserRepository } from "../repository/FirestoreUserRepository.js";
import { createToast } from "../view/ToastFeedback.js";
import { generateUserList } from "../view/UserList.js";
import { renderUserModal } from "../view/UserModal.js";

window.onload = async () => {
  generateUserList();
  renderUserModal();
  createToast();
};
