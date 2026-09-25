// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list CertificateAuthority resources by Namespace
 *
 * @summary list CertificateAuthority resources by Namespace
 * x-ms-original-file: 2026-11-01/List_CertificateAuthorities_ByNamespace.json
 */
async function listCertificateAuthoritiesByNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.certificateAuthorities.listByNamespace(
    "rgdeviceregistry",
    "mynamespace",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCertificateAuthoritiesByNamespace();
}

main().catch(console.error);
