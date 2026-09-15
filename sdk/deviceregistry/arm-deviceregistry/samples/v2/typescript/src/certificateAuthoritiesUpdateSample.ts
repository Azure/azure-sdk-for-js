// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a CertificateAuthority
 *
 * @summary update a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Update_CertificateAuthority.json
 */
async function updateACertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.update(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
    { tags: { environment: "production" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateACertificateAuthority();
}

main().catch(console.error);
