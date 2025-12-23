// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns ResourceGuards collection belonging to a ResourceGroup.
 *
 * @summary returns ResourceGuards collection belonging to a ResourceGroup.
 * x-ms-original-file: 2025-07-01/ResourceGuardCRUD/GetResourceGuardsInResourceGroup.json
 */
async function getResourceGuardsInResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0b352192-dcac-4cc7-992e-a96190ccc68c";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceGuards.listResourcesInResourceGroup(
    "SampleResourceGroup",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getResourceGuardsInResourceGroup();
}

main().catch(console.error);
