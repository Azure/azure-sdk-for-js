// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieve data annotations for an entity
 *
 * @summary retrieve data annotations for an entity
 * x-ms-original-file: 2026-05-01-preview/Entities_GetDataAnnotations.json
 */
async function entitiesGetDataAnnotations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const result = await client.entities.getDataAnnotations(
    "online-store-rg",
    "online-store",
    "web-frontend",
    { startAt: new Date("2026-05-03T00:00:00Z"), endAt: new Date("2026-05-04T23:59:59Z") },
  );
  console.log(result);
}

async function main() {
  await entitiesGetDataAnnotations();
}

main().catch(console.error);
