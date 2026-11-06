// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or replaces an endpoint registration for a first-level nested resource type.
 *
 * @summary creates or replaces an endpoint registration for a first-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_CreateOrUpdateNestedResourceTypeFirst.json
 */
async function endpointRegistrationsCreateOrUpdateNestedResourceTypeFirst(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.endpointRegistrations.createOrUpdateNestedResourceTypeFirst(
    "Microsoft.Contoso",
    "employees",
    "profiles",
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

async function main(): Promise<void> {
  await endpointRegistrationsCreateOrUpdateNestedResourceTypeFirst();
}

main().catch(console.error);
