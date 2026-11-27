// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CertificatePolicy
 *
 * @summary create a CertificatePolicy
 * x-ms-original-file: 2026-11-01/CreateOrReplace_CertificatePolicy.json
 */
async function createOrReplaceACertificatePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificatePolicies.createOrReplace(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
    "mycertificatepolicy",
    { properties: { certificate: { validityPeriodInDays: 30 } }, location: "East US 2" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceACertificatePolicy();
}

main().catch(console.error);
