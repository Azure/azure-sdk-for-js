// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists associations for the specified resource.
 *
 * @summary lists associations for the specified resource.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsListByResource.json
 */
async function listAssociationsForSpecifiedResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const resArray = new Array();
  for await (const item of client.dataCollectionRuleAssociations.listByResource(
    "subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAssociationsForSpecifiedResource();
}

main().catch(console.error);
