// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MonitorClient } = require("@azure/arm-monitor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an association.
 *
 * @summary creates or updates an association.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsCreate.json
 */
async function createOrUpdateAssociation() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.dataCollectionRuleAssociations.create(
    "subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
    "myAssociation",
    {
      body: {
        dataCollectionRuleId:
          "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Insights/dataCollectionRules/myCollectionRule",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an association.
 *
 * @summary creates or updates an association.
 * x-ms-original-file: 2024-03-11/DataCollectionRuleAssociationsCreateEndpointAssoc.json
 */
async function createOrUpdateAssociationWithADataCollectionEndpoint() {
  const credential = new DefaultAzureCredential();
  const client = new MonitorClient(credential);
  const result = await client.dataCollectionRuleAssociations.create(
    "subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVm",
    "configurationAccessEndpoint",
    {
      body: {
        dataCollectionEndpointId:
          "/subscriptions/703362b3-f278-4e4b-9179-c76eaf41ffc2/resourceGroups/myResourceGroup/providers/Microsoft.Insights/dataCollectionEndpoints/myCollectionEndpoint",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateAssociation();
  await createOrUpdateAssociationWithADataCollectionEndpoint();
}

main().catch(console.error);
