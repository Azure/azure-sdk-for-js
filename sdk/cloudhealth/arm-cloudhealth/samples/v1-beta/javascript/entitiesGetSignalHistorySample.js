// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the time series history for a signal on an entity
 *
 * @summary retrieve the time series history for a signal on an entity
 * x-ms-original-file: 2026-05-01-preview/Entities_GetSignalHistory.json
 */
async function entitiesGetSignalHistory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.getSignalHistory(
    "online-store-rg",
    "online-store",
    "web-frontend",
    {
      signalName: "http-5xx",
      startAt: new Date("2026-05-03T09:30:00Z"),
      endAt: new Date("2026-05-04T09:30:00Z"),
      top: 7,
    },
  );
  console.log(result);
}

async function main() {
  await entitiesGetSignalHistory();
}

main().catch(console.error);
