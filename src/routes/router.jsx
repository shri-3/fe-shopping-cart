import { createBrowserRouter } from "react-router";
import HomeRoutes from "./HomeRoutes";
import App from "../App";

export const routes = {
  element: <App />,
};

const router = createBrowserRouter([routes, HomeRoutes], {
  basename:
    import.meta.env.MODE === "production" ? import.meta.env.VITE_BASENAME : "/",
});

export default router;
