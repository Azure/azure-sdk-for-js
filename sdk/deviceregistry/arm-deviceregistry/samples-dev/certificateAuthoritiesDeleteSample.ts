// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CertificateAuthority
 *
 * @summary delete a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Delete_CertificateAuthority.json
 */
async function deleteACertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.certificateAuthorities.delete("rgdeviceregistry", "mynamespace", "myrootca");
}

async function main(): Promise<void> {
  await deleteACertificateAuthority();
}

main().catch(console.error);
