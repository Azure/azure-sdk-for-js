// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CertificateAuthority
 *
 * @summary update a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Update_CertificateAuthority.json
 */
async function updateACertificateAuthority() {
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

async function main() {
  await updateACertificateAuthority();
}

main().catch(console.error);
