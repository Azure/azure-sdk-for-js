// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CertificatePolicy
 *
 * @summary get a CertificatePolicy
 * x-ms-original-file: 2026-11-01/Get_CertificatePolicy.json
 */
async function getACertificatePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificatePolicies.get(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
    "mycertificatepolicy",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getACertificatePolicy();
}

main().catch(console.error);
