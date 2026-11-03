// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Secret within the specified profile.
 *
 * @summary creates a new Secret within the specified profile.
 * x-ms-original-file: 2026-09-01-preview/Secrets_Create.json
 */
async function secretsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.create("RG", "profile1", "secret1", {
    parameters: {
      type: "CustomerCertificate",
      secretSource: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.KeyVault/vault/kvName/secrets/certificatename",
      },
      secretVersion: "abcdef1234578900abcdef1234567890",
      useLatestVersion: false,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Secret within the specified profile.
 *
 * @summary creates a new Secret within the specified profile.
 * x-ms-original-file: 2026-09-01-preview/Secrets_CreateCustomerCertificateType.json
 */
async function secretsCreateCustomerCertificateType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.create("RG", "profile1", "secret1", {
    parameters: {
      type: "CustomerCertificate",
      secretSource: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.KeyVault/vault/kvName/secrets/certificatename",
      },
      secretVersion: "abcdef1234578900abcdef1234567890",
      useLatestVersion: false,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Secret within the specified profile.
 *
 * @summary creates a new Secret within the specified profile.
 * x-ms-original-file: 2026-09-01-preview/Secrets_CreateMtlsCertificateChainType.json
 */
async function secretsCreateMtlsCertificateChainType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.create("RG", "profile1", "secret1", {
    parameters: {
      type: "MtlsCertificateChain",
      secretSource: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.KeyVault/vaults/kvName/secrets/mTLSCertificateChainname",
      },
      secretVersion: "abcdef1234578900abcdef1234567890",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new Secret within the specified profile.
 *
 * @summary creates a new Secret within the specified profile.
 * x-ms-original-file: 2026-09-01-preview/Secrets_CreateUrlSigningKeyType.json
 */
async function secretsCreateUrlSigningKeyType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.create("RG", "profile1", "secret1", {
    parameters: {
      type: "UrlSigningKey",
      keyId: "customKeyId",
      secretSource: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.KeyVault/vault/kvName/secrets/urlsigningkeyname",
      },
      secretVersion: "abcdef1234578900abcdef1234567890",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await secretsCreate();
  await secretsCreateCustomerCertificateType();
  await secretsCreateMtlsCertificateChainType();
  await secretsCreateUrlSigningKeyType();
}

main().catch(console.error);
