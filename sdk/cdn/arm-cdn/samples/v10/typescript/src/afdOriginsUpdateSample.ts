// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing origin within an origin group.
 *
 * @summary updates an existing origin within an origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_Update.json
 */
async function afdOriginsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.update("RG", "profile1", "origingroup1", "origin1", {
    enabledState: "Enabled",
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing origin within an origin group.
 *
 * @summary updates an existing origin within an origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_Update_CustomCertificateSubject.json
 */
async function afdOriginsUpdateCustomCertificateSubject(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.update("RG", "profile1", "origingroup1", "origin1", {
    certificateNameCheckValidationMode: "CustomCertificateSubject",
    customCertificateSubjects: ["host1.foo.com", "*.foo.com"],
    enabledState: "Enabled",
    enforceCertificateNameCheck: true,
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "host1.foo.com",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing origin within an origin group.
 *
 * @summary updates an existing origin within an origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_Update_OriginHostname.json
 */
async function afdOriginsUpdateOriginHostname(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.update("RG", "profile1", "origingroup1", "origin1", {
    certificateNameCheckValidationMode: "OriginHostname",
    enabledState: "Enabled",
    enforceCertificateNameCheck: true,
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "host1.foo.com",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await afdOriginsUpdate();
  await afdOriginsUpdateCustomCertificateSubject();
  await afdOriginsUpdateOriginHostname();
}

main().catch(console.error);
