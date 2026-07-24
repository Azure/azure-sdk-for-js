// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftSupport } = require("@azure/arm-support");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets details for a specific file workspace in an Azure subscription.
 *
 * @summary gets details for a specific file workspace in an Azure subscription.
 * x-ms-original-file: 2026-07-01/GetFileWorkspaceDetailsForSubscription.json
 */
async function getDetailsOfASubscriptionFileWorkspace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "132d901f-189d-4381-9214-fe68e27e05a1";
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.fileWorkspaces.get("testworkspace");
  console.log(result);
}

async function main() {
  await getDetailsOfASubscriptionFileWorkspace();
}

main().catch(console.error);
