// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cloud provider regions available for creating Schema Registry clusters.
 *
 * @summary cloud provider regions available for creating Schema Registry clusters.
 * x-ms-original-file: 2024-07-01/Organization_ListRegions.json
 */
async function organizationListRegions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.organization.listRegions("myResourceGroup", "myOrganization", {
    searchFilters: {
      cloud: "azure",
      packages: "ADVANCED,ESSENTIALS",
      region: "eastus",
    },
  });
  console.log(result);
}

async function main() {
  await organizationListRegions();
}

main().catch(console.error);
