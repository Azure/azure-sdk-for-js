// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list DeploymentSetting resources by Clusters
 *
 * @summary list DeploymentSetting resources by Clusters
 * x-ms-original-file: 2025-12-01-preview/ListDeploymentSettingsByCluster.json
 */
async function listDeploymentSettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deploymentSettings.listByClusters("test-rg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeploymentSettings();
}

main().catch(console.error);
