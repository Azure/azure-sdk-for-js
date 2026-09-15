// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a CertificatePolicy
 *
 * @summary update a CertificatePolicy
 * x-ms-original-file: 2026-11-01/Update_CertificatePolicy.json
 */
async function updateACertificatePolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificatePolicies.update(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
    "mycertificatepolicy",
    {
      tags: { environment: "production" },
      properties: { certificate: { validityPeriodInDays: 60 } },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateACertificatePolicy();
}

main().catch(console.error);
