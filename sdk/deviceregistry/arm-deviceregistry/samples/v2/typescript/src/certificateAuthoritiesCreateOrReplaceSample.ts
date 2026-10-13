// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a CertificateAuthority
 *
 * @summary create a CertificateAuthority
 * x-ms-original-file: 2026-11-01/CreateOrReplace_CertificateAuthority_ICAExternalIssuer.json
 */
async function createOrReplaceAnExternalIntermediateCertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.createOrReplace(
    "rgdeviceregistry",
    "mynamespace",
    "myexternalica",
    {
      properties: {
        certificateAuthorityType: "ICA",
        keyType: "ECC",
        issuer: { issuerType: "External" },
      },
      tags: { environment: "production" },
      location: "East US 2",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a CertificateAuthority
 *
 * @summary create a CertificateAuthority
 * x-ms-original-file: 2026-11-01/CreateOrReplace_CertificateAuthority_ICAInternalIssuer.json
 */
async function createOrReplaceAnInternalIntermediateCertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.createOrReplace(
    "rgdeviceregistry",
    "mynamespace",
    "myica",
    {
      properties: {
        certificateAuthorityType: "ICA",
        keyType: "ECC",
        issuer: {
          issuerType: "Microsoft",
          certificateAuthorityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgdeviceregistry/providers/Microsoft.DeviceRegistry/namespaces/mynamespace/certificateAuthorities/myrootca",
        },
      },
      tags: { environment: "production" },
      location: "East US 2",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a CertificateAuthority
 *
 * @summary create a CertificateAuthority
 * x-ms-original-file: 2026-11-01/CreateOrReplace_CertificateAuthority_Root.json
 */
async function createOrReplaceARootCertificateAuthority(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.certificateAuthorities.createOrReplace(
    "rgdeviceregistry",
    "mynamespace",
    "myrootca",
    {
      properties: { certificateAuthorityType: "Root", keyType: "ECC" },
      tags: { environment: "production" },
      location: "East US 2",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrReplaceAnExternalIntermediateCertificateAuthority();
  await createOrReplaceAnInternalIntermediateCertificateAuthority();
  await createOrReplaceARootCertificateAuthority();
}

main().catch(console.error);
