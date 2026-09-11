// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a CertificateAuthority
 *
 * @summary get a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Get_CertificateAuthority_ICAExternalIssuer.json
 */
async function getAnExternalIntermediateCertificateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.get(
    "rgdeviceregistry",
    "mynamespace",
    "myexternalica",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a CertificateAuthority
 *
 * @summary get a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Get_CertificateAuthority_ICAInternalIssuer.json
 */
async function getAnInternalIntermediateCertificateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.get(
    "rgdeviceregistry",
    "mynamespace",
    "myica",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a CertificateAuthority
 *
 * @summary get a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Get_CertificateAuthority_Root.json
 */
async function getARootCertificateAuthority() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.get(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
  );
  console.log(result);
}

async function main() {
  await getAnExternalIntermediateCertificateAuthority();
  await getAnInternalIntermediateCertificateAuthority();
  await getARootCertificateAuthority();
}

main().catch(console.error);
