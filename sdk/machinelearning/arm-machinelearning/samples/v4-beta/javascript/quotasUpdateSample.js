// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update quota for each VM family in workspace.
 *
 * @summary update quota for each VM family in workspace.
 * x-ms-original-file: 2025-12-01/Quota/update.json
 */
async function updateQuotas() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.quotas.update("eastus", {
    value: [
      {
        type: "Microsoft.MachineLearningServices/workspaces/quotas",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.MachineLearningServices/workspaces/demo_workspace1/quotas/Standard_DSv2_Family_Cluster_Dedicated_vCPUs",
        limit: 100,
        unit: "Count",
      },
      {
        type: "Microsoft.MachineLearningServices/workspaces/quotas",
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg/providers/Microsoft.MachineLearningServices/workspaces/demo_workspace2/quotas/Standard_DSv2_Family_Cluster_Dedicated_vCPUs",
        limit: 200,
        unit: "Count",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await updateQuotas();
}

main().catch(console.error);
