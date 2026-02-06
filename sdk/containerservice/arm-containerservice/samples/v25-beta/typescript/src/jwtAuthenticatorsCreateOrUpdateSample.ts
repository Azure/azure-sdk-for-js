// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates JWT authenticator in the managed cluster and updates the managed cluster to apply the settings.
 *
 * @summary creates or updates JWT authenticator in the managed cluster and updates the managed cluster to apply the settings.
 * x-ms-original-file: 2025-10-02-preview/JWTAuthenticators_Create_Or_Update.json
 */
async function createOrUpdateJWTAuthenticator(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.jwtAuthenticators.createOrUpdate("rg1", "clustername1", "jwt1", {
    properties: {
      claimMappings: {
        extra: [{ key: "example.com/extrakey", valueExpression: "claims.customfield" }],
        groups: { expression: "claims.groups.split(',').map(group, 'aks:jwt:' + group)" },
        username: { expression: "'aks:jwt:' + claims.sub" },
      },
      claimValidationRules: [
        { expression: "has(claims.sub)", message: "Sub is required" },
        { expression: "claims.sub != ''", message: "Sub cannot be empty" },
      ],
      issuer: {
        audiences: ["https://example.com/audience1", "https://example.com/audience2"],
        url: "https://example.com",
      },
      userValidationRules: [
        {
          expression: "user.groups.all(group, group.startsWith('aks:jwt:admin:'))",
          message: "Must be in admin user group",
        },
      ],
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateJWTAuthenticator();
}

main().catch(console.error);
