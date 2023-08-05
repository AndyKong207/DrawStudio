import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { createElement } from "react";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("snackbarhelper") as any);

root.render(createElement(SnackbarProvider));

// type should be one of default | error | success | warning | info
export const notify = (message: string, type?: any) =>
  enqueueSnackbar(message, { variant: type || "warning" });
