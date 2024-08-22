const playwright = require("@playwright/test");
const { getConnectOptions } = require("@azure/microsoft-playwright-testing");

const { test, expect } = playwright;

test("has title", async ({ browserName }) => {
  const { wsEndpoint, options } = await getConnectOptions();
  const browser = await playwright[browserName].connect(wsEndpoint, options);
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  await page.close();
  await context.close();
  await browser.close();
});

test("get started link", async ({ browserName }) => {
  const { wsEndpoint, options } = await getConnectOptions();
  const browser = await playwright[browserName].connect(wsEndpoint, options);
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();

  await page.close();
  await context.close();
  await browser.close();
});
