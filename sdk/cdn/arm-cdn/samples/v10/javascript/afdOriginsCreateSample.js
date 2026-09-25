// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new origin within the specified origin group.
 *
 * @summary creates a new origin within the specified origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_Create.json
 */
async function afdOriginsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.create("RG", "profile1", "origingroup1", "origin1", {
    enabledState: "Enabled",
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "host1.foo.com",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new origin within the specified origin group.
 *
 * @summary creates a new origin within the specified origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_CreateWithIncomingHostHeaderValidation.json
 */
async function afdOriginsCreateIncomingHostHeaderValidation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.create("RG", "profile1", "origingroup1", "origin1", {
    enabledState: "Enabled",
    hostName: "host1.blob.core.windows.net",
    httpPort: 80,
    httpsPort: 443,
    originHostHeader: "www.contoso.com",
    enforceCertificateNameCheck: true,
    certificateNameCheckValidationMode: "IncomingHostHeader",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new origin within the specified origin group.
 *
 * @summary creates a new origin within the specified origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_Create_CustomCertificateSubject.json
 */
async function afdOriginsCreateCustomCertificateSubject() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.create("RG", "profile1", "origingroup1", "origin1", {
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
 * This sample demonstrates how to creates a new origin within the specified origin group.
 *
 * @summary creates a new origin within the specified origin group.
 * x-ms-original-file: 2026-07-01/AFDOrigins_Create_OriginHostname.json
 */
async function afdOriginsCreateOriginHostname() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdOrigins.create("RG", "profile1", "origingroup1", "origin1", {
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

async function main() {
  await afdOriginsCreate();
  await afdOriginsCreateIncomingHostHeaderValidation();
  await afdOriginsCreateCustomCertificateSubject();
  await afdOriginsCreateOriginHostname();
}

main().catch(console.error);
