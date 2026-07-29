// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing domain within a profile.
 *
 * @summary updates an existing domain within a profile.
 * x-ms-original-file: 2025-12-01/AFDCustomDomains_Update.json
 */
async function afdCustomDomainsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdCustomDomains.update("RG", "profile1", "domain1", {
    azureDnsZone: { id: "" },
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
  await afdCustomDomainsUpdate();
}

main().catch(console.error);
