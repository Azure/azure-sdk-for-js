// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to a long-running resource action.
 *
 * @summary a long-running resource action.
 * x-ms-original-file: 2026-03-01-preview/Credentials_Synchronize.json
 */
async function credentialsSynchronize(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.credentials.synchronize("rgdeviceregistry", "mynamespace");
}

async function main(): Promise<void> {
  await credentialsSynchronize();
}

main().catch(console.error);
