// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CertificatePolicy
 *
 * @summary delete a CertificatePolicy
 * x-ms-original-file: 2026-11-01/Delete_CertificatePolicy.json
 */
async function deleteACertificatePolicy(): Promise<void> {
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

async function main(): Promise<void> {
  await deleteACertificatePolicy();
}

main().catch(console.error);
