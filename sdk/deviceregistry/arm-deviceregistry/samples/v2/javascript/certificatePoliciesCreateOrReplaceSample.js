// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a CertificatePolicy
 *
 * @summary create a CertificatePolicy
 * x-ms-original-file: 2026-11-01/CreateOrReplace_CertificatePolicy.json
 */
async function createOrReplaceACertificatePolicy() {
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

async function main() {
  await createOrReplaceACertificatePolicy();
}

main().catch(console.error);
