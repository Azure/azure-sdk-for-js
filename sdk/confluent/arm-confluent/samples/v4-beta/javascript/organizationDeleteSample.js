// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete Organization resource
 *
 * @summary delete Organization resource
 * x-ms-original-file: 2024-07-01/Organization_Delete.json
 */
async function confluentDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.delete("myResourceGroup", "myOrganization");
}

async function main() {
  await confluentDelete();
}

main().catch(console.error);
