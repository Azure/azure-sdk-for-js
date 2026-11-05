// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the specified association.
 *
 * @summary returns the specified association.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsGet.json
 */
async function getAssociation() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.dataCollectionRuleAssociations.get(
    "subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
    "myAssociation",
  );
  console.log(result);
}

async function main() {
  await getAssociation();
}

main().catch(console.error);
