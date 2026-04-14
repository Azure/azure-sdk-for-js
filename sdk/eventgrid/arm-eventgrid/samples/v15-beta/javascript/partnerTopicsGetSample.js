// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of a partner topic.
 *
 * @summary get properties of a partner topic.
 * x-ms-original-file: 2025-07-15-preview/PartnerTopics_Get.json
 */
async function partnerTopicsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerTopics.get("examplerg", "examplePartnerTopicName1");
  console.log(result);
}

async function main() {
  await partnerTopicsGet();
}

main().catch(console.error);
