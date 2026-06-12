import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    build: {
      sourcemap: false,
    },
    preview: {
      port: Number(process.env.VITE_APP_PORT || 5005),
    },
    server: {
      host: "0.0.0.0",
      port: Number(process.env.VITE_APP_PORT || 5005),
    },
    base:
      process.env.NODE_ENV === "production" ? process.env.VITE_BASENAME : "/",
  });
};
