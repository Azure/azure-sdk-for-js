// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a DeploymentSetting
 *
 * @summary delete a DeploymentSetting
 * x-ms-original-file: 2025-12-01-preview/DeleteDeploymentSettings.json
 */
async function deleteDeploymentSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.deploymentSettings.delete("test-rg", "myCluster", "default");
}

async function main() {
  await deleteDeploymentSettings();
}

main().catch(console.error);
