// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a PrivateCloud
 *
 * @summary update a PrivateCloud
 * x-ms-original-file: 2025-09-01/PrivateClouds_Update.json
 */
async function privateCloudsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.update("group1", "cloud1", {
    identity: { type: "None" },
    properties: {
      managementCluster: { clusterSize: 4 },
      encryption: {
        status: "Enabled",
        keyVaultProperties: {
          keyName: "keyname1",
          keyVersion: "ver1.0",
          keyVaultUrl: "https://keyvault1-kmip-kvault.vault.azure.net/",
        },
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a PrivateCloud
 *
 * @summary update a PrivateCloud
 * x-ms-original-file: 2025-09-01/PrivateClouds_Update_Stretched.json
 */
async function privateCloudsUpdateStretched() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.update("group1", "cloud1", {
    properties: { managementCluster: { clusterSize: 4 } },
  });
  console.log(result);
}

async function main() {
  await privateCloudsUpdate();
  await privateCloudsUpdateStretched();
}

main().catch(console.error);
