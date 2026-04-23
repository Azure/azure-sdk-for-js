// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete existing domain topic.
 *
 * @summary delete existing domain topic.
 * x-ms-original-file: 2025-07-15-preview/DomainTopics_Delete.json
 */
async function domainTopicsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.domainTopics.delete("examplerg", "exampledomain1", "exampledomaintopic1");
}

async function main() {
  await domainTopicsDelete();
}

main().catch(console.error);
