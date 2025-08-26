// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to implements global CheckNameAvailability operations
 *
 * @summary implements global CheckNameAvailability operations
 * x-ms-original-file: 2025-07-01-preview/PlaywrightWorkspaces_CheckNameAvailability.json
 */

import { PlaywrightManagementClient } from "@azure/arm-playwright";
import { DefaultAzureCredential } from "@azure/identity";

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
