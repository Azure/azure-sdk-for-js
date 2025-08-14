// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if a Playwright workspace name is available globally.
 *
 * @summary checks if a Playwright workspace name is available globally.
 * x-ms-original-file: 2025-09-01/PlaywrightWorkspaces_CheckNameAvailability.json
 */
async function playwrightWorkspacesCheckNameAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightWorkspaces.checkNameAvailability({
    name: "dummyName",
    type: "Microsoft.LoadTestService/PlaywrightWorkspaces",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await playwrightWorkspacesCheckNameAvailability();
}

main().catch(console.error);
