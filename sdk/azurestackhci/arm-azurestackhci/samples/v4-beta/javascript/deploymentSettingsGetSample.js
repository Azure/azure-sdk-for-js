// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a DeploymentSetting
 *
 * @summary get a DeploymentSetting
 * x-ms-original-file: 2025-12-01-preview/GetDeploymentSettings.json
 */
async function getDeploymentSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.deploymentSettings.get("test-rg", "myCluster", "default");
  console.log(result);
}

async function main() {
  await getDeploymentSettings();
}

main().catch(console.error);
