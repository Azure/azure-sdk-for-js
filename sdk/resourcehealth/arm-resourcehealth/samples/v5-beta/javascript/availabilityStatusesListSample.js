// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftResourceHealth } = require("@azure/arm-resourcehealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all historical availability transitions and impacting events for a single resource.
 *
 * @summary lists all historical availability transitions and impacting events for a single resource.
 * x-ms-original-file: 2025-05-01/AvailabilityStatuses_List.json
 */
async function getHealthHistoryByResource() {
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftResourceHealth(credential);
  const resArray = new Array();
  for await (const item of client.availabilityStatuses.list("resourceUri")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getHealthHistoryByResource();
}

main().catch(console.error);
