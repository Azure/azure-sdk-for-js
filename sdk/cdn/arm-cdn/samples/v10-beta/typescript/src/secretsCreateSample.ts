// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new Secret within the specified profile.
 *
 * @summary creates a new Secret within the specified profile.
 * x-ms-original-file: 2025-12-01/Secrets_Create.json
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

async function main(): Promise<void> {
  await secretsCreate();
}

main().catch(console.error);
