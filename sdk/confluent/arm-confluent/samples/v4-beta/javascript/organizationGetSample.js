// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a specific Organization resource.
 *
 * @summary get the properties of a specific Organization resource.
 * x-ms-original-file: 2024-07-01/Organization_Get.json
 */
async function organizationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.get("myResourceGroup", "myOrganization");
  console.log(result);
}

async function main() {
  await organizationGet();
}

main().catch(console.error);
