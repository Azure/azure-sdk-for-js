// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrade a particular Arc Extension of HCI Cluster.
 *
 * @summary upgrade a particular Arc Extension of HCI Cluster.
 * x-ms-original-file: 2025-12-01-preview/Extensions_Upgrade.json
 */
async function upgradeMachineExtensions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.extensions.upgrade("test-rg", "myCluster", "default", "MicrosoftMonitoringAgent", {
    targetVersion: "1.0.18062.0",
  });
}

async function main() {
  await upgradeMachineExtensions();
}

main().catch(console.error);
