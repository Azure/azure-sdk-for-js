// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists endpoint registrations for a second-level nested resource type.
 *
 * @summary lists endpoint registrations for a second-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_ListByResourceTypeRegistrationNestedResourceTypeSecond.json
 */
async function endpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecond() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpointRegistrations.listByResourceTypeRegistrationNestedResourceTypeSecond(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "preferences",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await endpointRegistrationsListByResourceTypeRegistrationNestedResourceTypeSecond();
}

main().catch(console.error);
