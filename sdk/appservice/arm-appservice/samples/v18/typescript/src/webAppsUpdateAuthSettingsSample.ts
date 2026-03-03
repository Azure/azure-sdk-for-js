// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Updates the Authentication / Authorization settings associated with web app.
 *
 * @summary description for Updates the Authentication / Authorization settings associated with web app.
 * x-ms-original-file: 2025-05-01/UpdateAuthSettings.json
 */
async function updateAuthSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateAuthSettings("testrg123", "sitef6141", {
    allowedExternalRedirectUrls: ["sitef6141.customdomain.net", "sitef6141.customdomain.info"],
    clientId: "42d795a9-8abb-4d06-8534-39528af40f8e.apps.googleusercontent.com",
    defaultProvider: "Google",
    enabled: true,
    runtimeVersion: "~1",
    tokenRefreshExtensionHours: 120,
    tokenStoreEnabled: true,
    unauthenticatedClientAction: "RedirectToLoginPage",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAuthSettings();
}

main().catch(console.error);
