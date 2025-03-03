import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// make sure your app works on any host:
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
  },
});
