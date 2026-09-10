// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CertificateAuthority
 *
 * @summary delete a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Delete_CertificateAuthority.json
 */
async function deleteACertificateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.certificateAuthorities.delete("rgdeviceregistry", "mynamespace", "myrootca");
}

async function main() {
  await deleteACertificateAuthority();
}

main().catch(console.error);
