import { defineConfig, devices } from "@playwright/test";

/**
 * Os testes rodam contra o build de produção (`next build && next start`), não
 * contra o dev server: só assim medimos o CSS/JS que o visitante realmente
 * recebe.
 *
 * O celular vem primeiro na lista de propósito — é o cenário principal deste
 * site. Síndico consultando no corredor do prédio, não em uma mesa de trabalho.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],

  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],

  webServer: {
    command: "npm run build && npx next start --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
