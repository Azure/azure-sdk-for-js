// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Extension for HCI cluster.
 *
 * @summary create Extension for HCI cluster.
 * x-ms-original-file: 2025-12-01-preview/PutExtension.json
 */
async function createArcExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.extensions.create(
    "test-rg",
    "myCluster",
    "default",
    "MicrosoftMonitoringAgent",
    {
      extensionParameters: {
        type: "MicrosoftMonitoringAgent",
        enableAutomaticUpgrade: false,
        protectedSettings: { workspaceKey: "xx" },
        publisher: "Microsoft.Compute",
        settings: { workspaceId: "xx" },
        typeHandlerVersion: "1.10",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createArcExtension();
}

main().catch(console.error);
