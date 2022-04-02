// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { test, expect } from "@playwright/test";
import { isLiveMode } from "@azure-tools/test-recorder";
import { prepareServer } from "./server";
import { preparePage } from "./page";

dotenv.config();

const clientId = process.env.AZURE_CLIENT_ID || process.env.AZURE_IDENTITY_BROWSER_CLIENT_ID;
const azureUsername = process.env.AZURE_USERNAME || process.env.AZURE_IDENTITY_TEST_USERNAME;
const azurePassword = process.env.AZURE_PASSWORD || process.env.AZURE_IDENTITY_TEST_PASSWORD;
const port = process.env.PORT || "8080";
const scope = "https://graph.microsoft.com/.default";

// The Azure Active Directory app registration should be of the type
// "spa" and the redirect endpoint should point to:
const homeUri = `http://localhost:${port}/`;

const credentialOptions = { redirectUri: homeUri };

test("Authenticates", async ({ page }) => {
  test.skip(!isLiveMode(), "Playwright tests can only run on live mode");
  test.skip(!clientId, "Client ID environment variable required");
  test.skip(!azureUsername, "Username environment variable required");
  test.skip(!azurePassword, "Password environment variable required");

  const { start, stop } = await prepareServer({ port });
  await preparePage(page);
  await start();

  // THE TEST BEGINS

  // We go to the home page
  await page.goto(homeUri);

  await page.evaluate(
    async ({ clientId, scope, credentialOptions }) => {
      const { InteractiveBrowserCredential } = (window as any).main;

      const credential = new InteractiveBrowserCredential({
        ...credentialOptions,
        clientId,
        loginStyle: "redirect",
      });

      // The redirection to Azure happens here...
      credential.getToken(scope);
    },
    { clientId, scope, credentialOptions }
  );

  // Interactive login with Playwright
  await page.waitForNavigation();
  await page.waitForSelector(`input[type="email"]`);
  await page.fill(`input[type="email"]`, azureUsername!);
  await page.waitForSelector(`input[type="submit"]`);
  await page.click(`input[type="submit"]`);
  await page.waitForLoadState("networkidle");
  await page.waitForSelector(`input[type="password"]`);
  await page.fill(`input[type="password"]`, azurePassword!);
  await page.waitForSelector(`input[type="submit"]`);
  await page.click(`input[type="submit"]`);
  await page.waitForSelector(`input[type="submit"]`);
  await page.click(`input[type="submit"]`);
  await page.waitForURL(`${homeUri}**`);

  const token = await page.evaluate(
    async ({ clientId, scope, credentialOptions }) => {
      const { InteractiveBrowserCredential } = (window as any).main;

      const credential = new InteractiveBrowserCredential({
        ...credentialOptions,
        clientId,
        loginStyle: "redirect",
      });

      return await credential.getToken(scope);
    },
    { clientId, scope, credentialOptions }
  );

  expect(token).toBeTruthy();
  expect(token.token).toBeTruthy();
  expect(token.expiresOnTimestamp).toBeTruthy();

  await stop();
});
