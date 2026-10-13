// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CertificatePolicy
 *
 * @summary delete a CertificatePolicy
 * x-ms-original-file: 2026-11-01/Delete_CertificatePolicy.json
 */
async function deleteACertificatePolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.certificatePolicies.delete(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
    "mycertificatepolicy",
  );
}

async function main() {
  await deleteACertificatePolicy();
}

main().catch(console.error);
