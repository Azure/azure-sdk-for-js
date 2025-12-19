// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list SecuritySetting resources by Clusters
 *
 * @summary list SecuritySetting resources by Clusters
 * x-ms-original-file: 2025-12-01-preview/ListSecuritySettingsByCluster.json
 */
async function listSecuritySettings() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securitySettings.listByClusters("test-rg", "myCluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecuritySettings();
}

main().catch(console.error);
