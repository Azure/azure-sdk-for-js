// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get Environment details by environment Id
 *
 * @summary get Environment details by environment Id
 * x-ms-original-file: 2024-07-01/Organization_GetEnvironmentById.json
 */
async function organizationGetEnvironmentById() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.getEnvironmentById(
    "myResourceGroup",
    "myOrganization",
    "prod-finance01",
  );
  console.log(result);
}

async function main() {
  await organizationGetEnvironmentById();
}

main().catch(console.error);
