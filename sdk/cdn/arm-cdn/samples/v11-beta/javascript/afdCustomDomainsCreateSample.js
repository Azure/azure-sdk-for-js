// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new domain within the specified profile.
 *
 * @summary creates a new domain within the specified profile.
 * x-ms-original-file: 2026-09-01-preview/AFDCustomDomains_Create.json
 */
async function afdCustomDomainsCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdCustomDomains.create("RG", "profile1", "domain1", {
    hostName: "www.someDomain.net",
    mtlsSettings: {
      allowedFqdns: ["foo.contoso.com"],
      scenario: "ClientCertificateRequiredAndValidated",
      secrets: [
        {
          id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Cdn/profiles/profile1/secrets/name1",
        },
        {
          id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.Cdn/profiles/profile1/secrets/name2",
        },
      ],
    },
    tlsSettings: {
      certificateType: "ManagedCertificate",
      cipherSuiteSetType: "Customized",
      customizedCipherSuiteSet: {
        cipherSuiteSetForTls12: ["ECDHE_RSA_AES128_GCM_SHA256"],
        cipherSuiteSetForTls13: ["TLS_AES_128_GCM_SHA256", "TLS_AES_256_GCM_SHA384"],
      },
      minimumTlsVersion: "TLS12",
    },
  });
  console.log(result);
}

async function main() {
  await afdCustomDomainsCreate();
}

main().catch(console.error);
