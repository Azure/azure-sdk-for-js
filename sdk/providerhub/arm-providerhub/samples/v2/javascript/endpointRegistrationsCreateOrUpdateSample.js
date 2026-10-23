// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or replaces an endpoint registration.
 *
 * @summary creates or replaces an endpoint registration.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_CreateOrUpdate.json
 */
async function endpointRegistrationsCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.endpointRegistrations.createOrUpdate(
    "Microsoft.Contoso",
    "employees",
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
  await endpointRegistrationsCreateOrUpdate();
}

main().catch(console.error);
