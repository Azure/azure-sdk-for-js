// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates a new partner destination with the specified parameters.
 *
 * @summary asynchronously creates a new partner destination with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerDestinations_CreateOrUpdate.json
 */
async function partnerDestinationsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerDestinations.createOrUpdate(
    "examplerg",
    "examplePartnerDestinationName1",
    {
      location: "westus2",
      endpointBaseUrl: "https://www.example/endpoint",
      endpointServiceContext: "This is an example",
      expirationTimeIfNotActivatedUtc: new Date("2022-03-14T19:33:43.430Z"),
      messageForActivation: "Sample Activation message",
      partnerRegistrationImmutableId: "0bd70ee2-7d95-447e-ab1f-c4f320019404",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerDestinationsCreateOrUpdate();
}

main().catch(console.error);
