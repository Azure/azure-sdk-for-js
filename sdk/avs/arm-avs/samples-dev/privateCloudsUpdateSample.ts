// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to update a PrivateCloud
 *
 * @summary update a PrivateCloud
 * x-ms-original-file: 2024-09-01/PrivateClouds_Update.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function privateCloudsUpdate(): Promise<void> {
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
 * x-ms-original-file: 2024-09-01/PrivateClouds_Update_Stretched.json
 */
async function privateCloudsUpdateStretched(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.privateClouds.update("group1", "cloud1", {
    properties: { managementCluster: { clusterSize: 4 } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await privateCloudsUpdate();
  await privateCloudsUpdateStretched();
}

main().catch(console.error);
