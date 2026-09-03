// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deactivate specific partner topic.
 *
 * @summary deactivate specific partner topic.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopics_Deactivate.json
 */
async function partnerTopicsDeactivate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerTopics.deactivate("examplerg", "examplePartnerTopic1");
  console.log(result);
}

async function main() {
  await partnerTopicsDeactivate();
}

main().catch(console.error);
