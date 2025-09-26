// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates JWT authenticator in the managed cluster and updates the managed cluster to apply the settings.
 *
 * @summary Creates or updates JWT authenticator in the managed cluster and updates the managed cluster to apply the settings.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/JWTAuthenticators_Create_Or_Update.json
 */
async function createOrUpdateJwtAuthenticator() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const jwtAuthenticatorName = "jwt1";
  const parameters = {
    properties: {
      claimMappings: {
        extra: [
          {
            key: "example.com/extrakey",
            valueExpression: "claims.customfield",
          },
        ],
        groups: {
          expression: "claims.groups.split(',').map(group, 'aks:jwt:' + group)",
        },
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
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.jWTAuthenticators.beginCreateOrUpdateAndWait(
    resourceGroupName,
    resourceName,
    jwtAuthenticatorName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateJwtAuthenticator();
}

main().catch(console.error);
