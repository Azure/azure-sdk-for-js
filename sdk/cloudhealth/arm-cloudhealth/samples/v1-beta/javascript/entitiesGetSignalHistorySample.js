// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve the time series history for a signal on an entity
 *
 * @summary retrieve the time series history for a signal on an entity
 * x-ms-original-file: 2026-01-01-preview/Entities_GetSignalHistory.json
 */
async function entitiesGetSignalHistory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.getSignalHistory("rgopenapi", "myHealthModel", "entity1", {
    signalName: "uniqueSignalName1",
    startAt: new Date("2025-12-11T10:00:00Z"),
    endAt: new Date("2025-12-12T10:00:00Z"),
  });
  console.log(result);
}

async function main() {
  await entitiesGetSignalHistory();
}

main().catch(console.error);
