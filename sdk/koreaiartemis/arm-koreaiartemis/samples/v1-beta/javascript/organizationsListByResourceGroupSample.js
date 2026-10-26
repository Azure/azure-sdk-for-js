// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AgentPlatformClient } = require("@azure/arm-koreaiartemis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Organizations in a Resource Group.
 *
 * @summary list Organizations in a Resource Group.
 * x-ms-original-file: 2026-07-01-preview/Organizations_ListByResourceGroup.json
 */
async function organizationsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("contoso-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list Organizations in a Resource Group.
 *
 * @summary list Organizations in a Resource Group.
 * x-ms-original-file: 2026-07-01-preview/Organizations_ListByResourceGroup_MaximumSet_Gen.json
 */
async function organizationsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AgentPlatformClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.organizations.listByResourceGroup("contoso-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationsListByResourceGroup();
  await organizationsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
