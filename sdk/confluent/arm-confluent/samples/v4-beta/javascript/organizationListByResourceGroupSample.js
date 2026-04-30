// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all Organizations under the specified resource group.
 *
 * @summary list all Organizations under the specified resource group.
 * x-ms-original-file: 2025-08-18-preview/Organization_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationListByResourceGroupMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organization.listByResourceGroup("rgconfluent")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationListByResourceGroupMaximumSet();
}

main().catch(console.error);
