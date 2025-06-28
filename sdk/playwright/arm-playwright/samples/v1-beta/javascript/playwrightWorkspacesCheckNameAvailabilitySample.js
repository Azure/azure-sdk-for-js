// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlaywrightManagementClient } = require("@azure/arm-playwright");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to implements global CheckNameAvailability operations
 *
 * @summary implements global CheckNameAvailability operations
 * x-ms-original-file: 2025-07-01-preview/PlaywrightWorkspaces_CheckNameAvailability.json
 */
async function playwrightWorkspacesCheckNameAvailability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new PlaywrightManagementClient(credential, subscriptionId);
  const result = await client.playwrightWorkspaces.checkNameAvailability({
    name: "dummyName",
    type: "Microsoft.LoadTestService/PlaywrightWorkspaces",
  });
  console.log(result);
}

async function main() {
  await playwrightWorkspacesCheckNameAvailability();
}

main().catch(console.error);
