// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the base Settings of the target resource.
 *
 * @summary update the base Settings of the target resource.
 * x-ms-original-file: 2025-09-16-preview/settings/SettingsPatch.json
 */
async function networkConfigurationsPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.settings.patch(
    "hybridRG",
    "Microsoft.HybridCompute",
    "machines",
    "testMachine",
    "default",
    {
      gatewayProperties: {
        gatewayResourceId:
          "/subscriptions/00000000-1111-2222-3333-444444444444/resourceGroups/hybridRG/providers/Microsoft.HybridCompute/gateways/newGateway",
      },
    },
  );
  console.log(result);
}

async function main() {
  await networkConfigurationsPatch();
}

main().catch(console.error);
