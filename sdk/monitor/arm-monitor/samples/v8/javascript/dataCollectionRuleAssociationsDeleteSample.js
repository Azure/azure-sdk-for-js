// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an association.
 *
 * @summary deletes an association.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsDelete.json
 */
async function deleteAssociation() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  await client.dataCollectionRuleAssociations.delete(
    "subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
    "myAssociation",
  );
}

async function main() {
  await deleteAssociation();
}

main().catch(console.error);
