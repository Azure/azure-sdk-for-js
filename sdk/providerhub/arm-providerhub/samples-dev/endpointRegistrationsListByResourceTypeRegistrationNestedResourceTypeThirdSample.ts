// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists endpoint registrations for a third-level nested resource type.
 *
 * @summary lists endpoint registrations for a third-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_ListByResourceTypeRegistrationNestedResourceTypeThird.json
 */
async function endpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThird(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpointRegistrations.listByResourceTypeRegistrationNestedResourceTypeThird(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "preferences",
    "notifications",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await endpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeThird();
}

main().catch(console.error);
