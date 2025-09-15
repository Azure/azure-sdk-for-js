import playwright, { test, expect, BrowserType } from "@playwright/test";
import {
  getConnectOptions,
  PlaywrightServiceAdditionalOptions,
  ServiceOS,
  BrowserConnectOptions,
} from "@azure/playwright";
import { AzureCliCredential } from "@azure/identity";

test("has title", async ({ browserName }) => {
  const { wsEndpoint, options } = await getConnectOptions();
  const browser = await (playwright[browserName] as BrowserType).connect(wsEndpoint, options);
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
  const azureCredential = new AzureCliCredential();
  const os = ServiceOS.LINUX;

  const playwrightServiceAdditionalOptions: PlaywrightServiceAdditionalOptions = {
    os: os, // Operating system types supported by Azure Playwright
    connectTimeout: 30000, // Maximum time in milliseconds to wait for the connection to be established
    slowMo: 0, // Slows down Playwright operations by the specified amount of milliseconds
    exposeNetwork: "<loopback>", // Exposes network available on the connecting client to the browser being connected to
    credential: azureCredential, // Custom token credential for Entra ID authentication
    runName: "Typescript V1 - Sample Run", // Run name for the test run
  };

  const browserConnectOptions: BrowserConnectOptions = await getConnectOptions(
    playwrightServiceAdditionalOptions,
  );
  const browser = await (playwright[browserName] as BrowserType).connect(
    browserConnectOptions.wsEndpoint,
    browserConnectOptions.options,
  );
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
