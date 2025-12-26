// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update ArcSettings for HCI cluster.
 *
 * @summary update ArcSettings for HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/PatchArcSetting.json
 */
async function patchArcSetting() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.arcSettings.update("test-rg", "myCluster", "default", {
    connectivityProperties: {
      enabled: true,
      serviceConfigurations: [{ port: 6516, serviceName: "WAC" }],
    },
  });
  console.log(result);
}

async function main() {
  await patchArcSetting();
}

main().catch(console.error);
