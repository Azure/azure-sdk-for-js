// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WorkloadManagerClient } = require("@azure/arm-computeworkloadmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates mutable runtime binding properties.
 *
 * @summary updates mutable runtime binding properties.
 * x-ms-original-file: 2026-11-01-preview/RuntimeBindings_Update.json
 */
async function updateMutableRuntimeBindingNetworkConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WorkloadManagerClient(credential, subscriptionId);
  const result = await client.runtimeBindings.update(
    "rg-workload",
    "managed-agents-prod",
    "serverless-default",
    {
      properties: {
        networkProfile: {
          subnetResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg-network/providers/Microsoft.Network/virtualNetworks/workload-vnet/subnets/execution",
          egressMode: "CustomerManaged",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateMutableRuntimeBindingNetworkConfiguration();
}

main().catch(console.error);
