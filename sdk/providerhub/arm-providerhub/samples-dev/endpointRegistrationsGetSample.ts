// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an endpoint registration.
 *
 * @summary gets an endpoint registration.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_Get.json
 */
async function endpointRegistrationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.endpointRegistrations.get(
    "Microsoft.Contoso",
    "employees",
    "primary",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointRegistrationsGet();
}

main().catch(console.error);
