// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the ExpressRouteLag resources in the specified resource group.
 *
 * @summary list all the ExpressRouteLag resources in the specified resource group.
 * x-ms-original-file: 2025-09-01/ExpressRouteLagListByResourceGroup.json
 */
async function listExpressRouteLagsByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRouteLags.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listExpressRouteLagsByResourceGroup();
}

main().catch(console.error);
