// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified NSP configuration.
 *
 * @summary gets information about the specified NSP configuration.
 * x-ms-original-file: 2025-06-01/NspConfigurationGet.json
 */
async function getNspConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeter.getConfiguration(
    "default-azurebatch-japaneast",
    "sampleacct",
    "00000000-0000-0000-0000-000000000000.sampleassociation",
  );
  console.log(result);
}

async function main() {
  await getNspConfiguration();
}

main().catch(console.error);
