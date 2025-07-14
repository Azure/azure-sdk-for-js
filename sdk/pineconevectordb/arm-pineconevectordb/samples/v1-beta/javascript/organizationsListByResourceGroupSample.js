// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { VectorDbClient } = require("@azure/arm-pineconevectordb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OrganizationResource resources by resource group
 *
 * @summary list OrganizationResource resources by resource group
 * x-ms-original-file: 2024-10-22-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "76a38ef6-c8c1-4f0d-bfe0-00ec782c8077";
  const client = new VectorDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListByResourceGroupMaximumSet();
}

main().catch(console.error);
