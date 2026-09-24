// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RelationshipsClient } = require("@azure/arm-relationships");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list ContainsRelationship resources by subscription ID
 *
 * @summary list ContainsRelationship resources by subscription ID
 * x-ms-original-file: 2026-08-01/ContainsRelationships_ListBySubscription.json
 */
async function containsRelationshipsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a925f2f7-5c63-4b7b-8799-25a5f97bc3b2";
  const client = new RelationshipsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.containsRelationships.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await containsRelationshipsListBySubscription();
}

main().catch(console.error);
