// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified first party service tag.
 *
 * @summary deletes the specified first party service tag.
 * x-ms-original-file: 2025-09-01/FirstPartyServiceTagDelete.json
 */
async function deleteFirstPartyServiceTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.firstPartyServiceTags.delete("rg1", "myServiceTag");
}

async function main() {
  await deleteFirstPartyServiceTag();
}

main().catch(console.error);
