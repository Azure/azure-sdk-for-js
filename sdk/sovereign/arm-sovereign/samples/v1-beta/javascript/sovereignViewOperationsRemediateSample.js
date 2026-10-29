// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SovereignClient } = require("@azure/arm-sovereign");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remediates the Sovereign View resource for the given Azure Resource Manager resource IDs.
 *
 * @summary remediates the Sovereign View resource for the given Azure Resource Manager resource IDs.
 * x-ms-original-file: 2026-10-31-preview/SovereignViewOperations_Remediate.json
 */
async function sovereignViewOperationsRemediate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "22b62f96-c8d5-4131-97f8-f820a5a3c55f";
  const client = new SovereignClient(credential, subscriptionId);
  const result = await client.sovereignViewOperations.remediate(
    "ExampleResourceGroup",
    "ExampleSV",
    {
      dimensionType: "DataResidency",
      residencyRemediationRequest: {
        configuration: {
          targetRegion: "swedencentral",
          targetResourceGroupName: "RemediatedResourceGroup",
        },
        resources: [
          {
            id: "/subscriptions/22b62f96-c8d5-4131-97f8-f820a5a3c55f/resourceGroups/ExampleResourceGroup/providers/Microsoft.Storage/storageAccounts/examplestorage",
            configuration: {
              sourceRegion: "northeurope",
              targetResourceGroupName: "RemediatedStorageResourceGroup",
            },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await sovereignViewOperationsRemediate();
}

main().catch(console.error);
