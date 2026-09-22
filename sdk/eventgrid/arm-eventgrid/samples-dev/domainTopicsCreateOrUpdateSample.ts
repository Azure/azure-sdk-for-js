// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates or updates a new domain topic with the specified parameters.
 *
 * @summary asynchronously creates or updates a new domain topic with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/DomainTopics_CreateOrUpdate.json
 */
async function domainTopicsCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainTopics.createOrUpdate(
    "examplerg",
    "exampledomain1",
    "exampledomaintopic1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await domainTopicsCreateOrUpdate();
}

main().catch(console.error);
