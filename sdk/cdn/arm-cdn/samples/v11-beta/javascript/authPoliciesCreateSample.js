// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an authorization policy within the specified profile.
 *
 * @summary creates or updates an authorization policy within the specified profile.
 * x-ms-original-file: 2026-09-01-preview/AuthPolicies_Create.json
 */
async function authPoliciesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.authPolicies.create("RG", "profile1", "authPolicy1", {
    properties: {
      action: "Block",
      forwardTokenToOrigin: true,
      associations: {
        domains: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/customDomains/domain1",
          },
        ],
        isProfileLevel: false,
        routes: [
          {
            id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/RG/providers/Microsoft.Cdn/profiles/profile1/afdEndpoints/endpoint1/routes/route1",
          },
        ],
      },
      authConfigs: [
        {
          audiences: ["11111111-1111-1111-1111-111111111111"],
          authLocation: "Header",
          authLocationSelector: "Authorization",
          identityProvider: "EntraID",
          issuer: "https://login.microsoftonline.com/00000000-0000-0000-0000-000000000000/v2.0",
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await authPoliciesCreate();
}

main().catch(console.error);
