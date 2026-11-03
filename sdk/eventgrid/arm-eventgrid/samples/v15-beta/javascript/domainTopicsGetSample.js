// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of a domain topic.
 *
 * @summary get properties of a domain topic.
 * x-ms-original-file: 2025-07-15-preview/DomainTopics_Get.json
 */
async function domainTopicsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.domainTopics.get("examplerg", "exampledomain2", "topic1");
  console.log(result);
}

async function main() {
  await domainTopicsGet();
}

main().catch(console.error);
