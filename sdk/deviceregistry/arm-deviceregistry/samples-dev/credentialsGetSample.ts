// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Credential
 *
 * @summary get a Credential
 * x-ms-original-file: 2026-03-01-preview/Get_Credentials.json
 */
async function getCredentials(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.credentials.get("rgdeviceregistry", "mynamespace");
  console.log(result);
}

async function main(): Promise<void> {
  await getCredentials();
}

main().catch(console.error);
