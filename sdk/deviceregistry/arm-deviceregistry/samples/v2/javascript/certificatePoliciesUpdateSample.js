// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a CertificatePolicy
 *
 * @summary update a CertificatePolicy
 * x-ms-original-file: 2026-11-01/Update_CertificatePolicy.json
 */
async function updateACertificatePolicy() {
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

async function main() {
  await updateACertificatePolicy();
}

main().catch(console.error);
