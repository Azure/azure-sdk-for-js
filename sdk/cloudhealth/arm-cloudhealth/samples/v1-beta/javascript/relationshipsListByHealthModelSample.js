// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Relationship resources by HealthModel
 *
 * @summary list Relationship resources by HealthModel
 * x-ms-original-file: 2026-05-01-preview/Relationships_ListByHealthModel.json
 */
async function relationshipsListByHealthModel() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "abcdef12-3456-7890-abcd-ef1234567890";
  const client = new CloudHealthClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.relationships.listByHealthModel(
    "online-store-rg",
    "online-store",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await relationshipsListByHealthModel();
}

main().catch(console.error);
