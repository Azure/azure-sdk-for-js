// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Linker.
 *
 * @summary delete a Linker.
 * x-ms-original-file: 2024-07-01-preview/DeleteLinker.json
 */
async function deleteLinker() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  await client.linker.delete(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "linkName",
  );
}

async function main() {
  await deleteLinker();
}

main().catch(console.error);
