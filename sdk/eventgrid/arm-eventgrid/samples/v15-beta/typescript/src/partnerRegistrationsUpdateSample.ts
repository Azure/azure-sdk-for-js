// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a partner registration with the specified parameters.
 *
 * @summary updates a partner registration with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerRegistrations_Update.json
 */
async function partnerRegistrationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerRegistrations.update(
    "examplerg",
    "examplePartnerRegistrationName1",
    { tags: { NewKey: "NewValue" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerRegistrationsUpdate();
}

main().catch(console.error);
