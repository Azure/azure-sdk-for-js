// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to synchronously updates a partner configuration with the specified parameters.
 *
 * @summary synchronously updates a partner configuration with the specified parameters.
 * x-ms-original-file: 2025-07-15-preview/PartnerConfigurations_Update.json
 */
async function partnerConfigurationsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerConfigurations.update("examplerg", {
    defaultMaximumExpirationTimeInDays: 100,
    tags: { tag1: "value11", tag2: "value22" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await partnerConfigurationsUpdate();
}

main().catch(console.error);
