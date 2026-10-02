// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to activates a Certificate Authority of type `ICA` and issuer type `External`. If the Certificate Authority is an invalid type, the API responds with HTTP 400.
 *
 * @summary activates a Certificate Authority of type `ICA` and issuer type `External`. If the Certificate Authority is an invalid type, the API responds with HTTP 400.
 * x-ms-original-file: 2026-11-01/Activate_CertificateAuthority.json
 */
async function activateACertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.certificateAuthorities.activate("rgdeviceregistry", "mynamespace", "myexternalica", {
    certificateChain: "-----BEGIN CERTIFICATE-----\\nMIID...\\n-----END CERTIFICATE-----",
  });
}

async function main(): Promise<void> {
  await activateACertificateAuthority();
}

main().catch(console.error);
