// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a Credential
 *
 * @summary update a Credential
 * x-ms-original-file: 2026-03-01-preview/Update_Credentials.json
 */
async function updateCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentials.update("rgdeviceregistry", "mynamespace", {
    tags: { key9580: "tpbwnljiiwtlyuiayalpkxyfwnrz" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateCredentials();
}

main().catch(console.error);
