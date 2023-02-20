import { showErrorToast } from "./ToastFeedback.js";

export async function catchError(error) {
  showErrorToast(error.message);
}
