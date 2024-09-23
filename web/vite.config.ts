import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  // Ensure the API URL is defined and not empty
  const apiUrl = process.env.VITE_APP_API_URL;

  return defineConfig({
    plugins: [react()],
    server: {
      port: 3001,
      proxy: {
        "/api": {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  });
};