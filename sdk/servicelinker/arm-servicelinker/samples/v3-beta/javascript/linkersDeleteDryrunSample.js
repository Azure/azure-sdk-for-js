// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a dryrun job
 *
 * @summary delete a dryrun job
 * x-ms-original-file: 2024-07-01-preview/DeleteDryrun.json
 */
async function deleteDryrun() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-00000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  await client.linkers.deleteDryrun(
    "subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/test-rg/providers/Microsoft.Web/sites/test-app",
    "dryrunName",
  );
}

async function main() {
  await deleteDryrun();
}

main().catch(console.error);
