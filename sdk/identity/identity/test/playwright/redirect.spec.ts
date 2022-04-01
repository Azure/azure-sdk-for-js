// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { test } from "@playwright/test";
import { isLiveMode } from "@azure-tools/test-recorder";
import { prepareServer } from "./server";
import { preparePage } from "./page";

dotenv.config();

const tenantId = process.env.AZURE_TENANT_ID || process.env.AZURE_IDENTITY_TEST_TENANTID;
const clientId = process.env.AZURE_CLIENT_ID || process.env.AZURE_IDENTITY_BROWSER_CLIENT_ID;
const azureUsername = process.env.AZURE_USERNAME || process.env.AZURE_IDENTITY_TEST_USERNAME;
const azurePassword = process.env.AZURE_PASSWORD || process.env.AZURE_IDENTITY_TEST_PASSWORD;
const protocol = process.env.PROTOCOL || "http";
const host = process.env.HOST || "localhost";
const port = process.env.PORT || "8080";
const scope = "https://graph.microsoft.com/.default";
const authorizeHost =
  process.env.AUTHORIZE_HOST || `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0`;

// The Azure Active Directory app registration should be of the type
// "spa" and the redirect endpoint should point to:
const homeUri = `http://localhost:${port}/`;

const credentialOptions = { redirectUri: homeUri };

test("Authenticates", async ({ page }) => {
  test.skip(!isLiveMode(), "Playwright tests can only run on live mode");

  const { app, start, stop } = await prepareServer({ port });
  await preparePage(page);
  await start();

  // THE TEST BEGINS

  // We go to the home page
  await page.goto(homeUri);

  await page.evaluate(
    async ({ clientId, scope, credentialOptions }) => {
      const { InteractiveBrowserCredential } = (window as any).main;

      const credential = new InteractiveBrowserCredential({
        clientId,
        ...credentialOptions,
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
  await page.fill(`input[type="email"]`, azureUsername);
  await page.waitForSelector(`input[type="submit"]`);
  await page.click(`input[type="submit"]`);
  await page.waitForLoadState("networkidle");
  await page.waitForSelector(`input[type="password"]`);
  await page.fill(`input[type="password"]`, azurePassword);
  await page.waitForSelector(`input[type="submit"]`);
  await page.click(`input[type="submit"]`);
  await page.waitForSelector(`input[type="submit"]`);
  await page.click(`input[type="submit"]`);
  await page.waitForURL(`${homeUri}**`);

  await page.evaluate(
    async ({ clientId, scope, credentialOptions }) => {
      const { InteractiveBrowserCredential } = (window as any).main;

      const credential = new InteractiveBrowserCredential({
        clientId,
        ...credentialOptions,
        loginStyle: "redirect",
      });

      const token = await credential.getToken(scope);
      expect(token).toBeTruthy();
      expect(token.token).toBeTruthy();
      expect(token.expiresOnTimestamp).toBeTruthy();
    },
    { clientId, scope, credentialOptions }
  );

  await stop();
});
