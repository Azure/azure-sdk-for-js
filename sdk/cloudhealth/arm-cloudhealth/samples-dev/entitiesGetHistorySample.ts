// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CloudHealthClient } from "@azure/arm-cloudhealth";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the health state transition history for an entity
 *
 * @summary retrieve the health state transition history for an entity
 * x-ms-original-file: 2026-05-01-preview/Entities_GetHistory.json
 */
async function entitiesGetHistory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.getHistory(
    "online-store-rg",
    "online-store",
    "web-frontend",
    {
      startAt: new Date("2026-05-03T09:30:00Z"),
      endAt: new Date("2026-05-04T09:30:00Z"),
      top: 100,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await entitiesGetHistory();
}

main().catch(console.error);
