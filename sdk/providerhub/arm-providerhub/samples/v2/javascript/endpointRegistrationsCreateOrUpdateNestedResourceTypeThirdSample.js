// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces an endpoint registration for a third-level nested resource type.
 *
 * @summary creates or replaces an endpoint registration for a third-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_CreateOrUpdateNestedResourceTypeThird.json
 */
async function endpointRegistrationsCreateOrUpdateNestedResourceTypeThird() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.endpointRegistrations.createOrUpdateNestedResourceTypeThird(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "preferences",
    "notifications",
    "primary",
    {
      kind: "Managed",
      properties: {
        apiVersions: ["2026-01-01"],
        locations: ["eastus"],
        endpointUri: "https://api.contoso.com/",
      },
    },
  );
  console.log(result);
}

async function main() {
  await endpointRegistrationsCreateOrUpdateNestedResourceTypeThird();
}

main().catch(console.error);
