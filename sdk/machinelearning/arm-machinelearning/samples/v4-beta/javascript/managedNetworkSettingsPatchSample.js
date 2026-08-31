// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureMachineLearningServicesManagementClient } = require("@azure/arm-machinelearning");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch API for managed network settings of a machine learning workspace.
 *
 * @summary patch API for managed network settings of a machine learning workspace.
 * x-ms-original-file: 2026-03-15-preview/ManagedNetwork/patchManagedNetworkV2.json
 */
async function patchManagedNetworkSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.managedNetworkSettings.patch(
    "test-rg",
    "aml-workspace-name",
    "default",
    {
      body: {
        properties: {
          managedNetwork: {
            enableNetworkMonitor: true,
            firewallSku: "Standard",
            isolationMode: "AllowOnlyApprovedOutbound",
            outboundRules: {
              rule_name_1: {
                type: "FQDN",
                category: "UserDefined",
                destination: "destination_endpoint",
              },
            },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchManagedNetworkSettings();
}

main().catch(console.error);
