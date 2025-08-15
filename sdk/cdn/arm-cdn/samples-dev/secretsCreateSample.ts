// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Secret } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new Secret within the specified profile.
 *
 * @summary Creates a new Secret within the specified profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/Secrets_Create.json
 */
async function secretsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const secretName = "secret1";
  const secret: Secret = {
    parameters: {
      type: "CustomerCertificate",
      secretSource: {
        id: "/subscriptions/subid/resourcegroups/RG/providers/Microsoft.KeyVault/vault/kvName/secrets/certificatename",
      },
      secretVersion: "abcdef1234578900abcdef1234567890",
      useLatestVersion: false,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.secrets.beginCreateAndWait(
    resourceGroupName,
    profileName,
    secretName,
    secret,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await secretsCreate();
}

main().catch(console.error);
