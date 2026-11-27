// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CertificateAuthority
 *
 * @summary get a CertificateAuthority
 * x-ms-original-file: 2026-11-01/Get_CertificateAuthority_ICAExternalIssuer.json
 */
async function getAnExternalIntermediateCertificateAuthority(): Promise<void> {
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
async function getAnInternalIntermediateCertificateAuthority(): Promise<void> {
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
async function getARootCertificateAuthority(): Promise<void> {
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

async function main(): Promise<void> {
  await getAnExternalIntermediateCertificateAuthority();
  await getAnInternalIntermediateCertificateAuthority();
  await getARootCertificateAuthority();
}

main().catch(console.error);
