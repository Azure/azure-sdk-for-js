// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CertificatePolicy resources by CertificateAuthority
 *
 * @summary list CertificatePolicy resources by CertificateAuthority
 * x-ms-original-file: 2026-11-01/List_CertificatePolicies_ByCertificateAuthority.json
 */
async function listCertificatePoliciesForACertificateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.certificatePolicies.listByCertificateAuthority(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCertificatePoliciesForACertificateAuthority();
}

main().catch(console.error);
