// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to asynchronously creates a new partner namespace with the specified parameters.
 *
 * @summary asynchronously creates a new partner namespace with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerNamespaces_CreateOrUpdate.json
 */
async function partnerNamespacesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerNamespaces.createOrUpdate(
    "examplerg",
    "examplePartnerNamespaceName1",
    {
      location: "westus",
      partnerRegistrationFullyQualifiedId:
        "/subscriptions/8f6b6269-84f2-4d09-9e31-1127efcd1e40/resourceGroups/examplerg/providers/Microsoft.EventGrid/partnerRegistrations/ContosoCorpAccount1",
      tags: { tag1: "value1", tag2: "value2" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerNamespacesCreateOrUpdate();
}

main().catch(console.error);
