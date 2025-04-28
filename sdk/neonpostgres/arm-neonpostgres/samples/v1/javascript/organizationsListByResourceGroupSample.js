// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OrganizationResource resources by resource group
 *
 * @summary list OrganizationResource resources by resource group
 * x-ms-original-file: 2025-03-01/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rgneon")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListByResourceGroupMaximumSet();
}

main().catch(console.error);
