// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to regenerates the callback URL access key for request triggers.
 *
 * @summary regenerates the callback URL access key for request triggers.
 * x-ms-original-file: 2025-05-01/Workflows_RegenerateAccessKey.json
 */
async function regenerateTheCallbackURLAccessKeyForRequestTriggers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.workflows.regenerateAccessKey("testResourceGroup", "test-name", "testWorkflowName", {
    keyType: "Primary",
  });
}

async function main() {
  await regenerateTheCallbackURLAccessKeyForRequestTriggers();
}

main().catch(console.error);
