// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an association.
 *
 * @summary deletes an association.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsDelete.json
 */
async function deleteAssociation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  await client.dataCollectionRuleAssociations.delete(
    "subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
    "myAssociation",
  );
}

async function main(): Promise<void> {
  await deleteAssociation();
}

main().catch(console.error);
