// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the ExpressRouteLag resources in the specified resource group.
 *
 * @summary list all the ExpressRouteLag resources in the specified resource group.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagListByResourceGroup.json
 */
async function listExpressRouteLagsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLags.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listExpressRouteLagsByResourceGroup();
}

main().catch(console.error);
