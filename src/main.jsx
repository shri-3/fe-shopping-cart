import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; //--- IGNORE ---
import { RouterProvider } from "react-router";
import router from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>,
// );
