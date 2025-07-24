// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists of all the topics in a clusters
 *
 * @summary lists of all the topics in a clusters
 * x-ms-original-file: 2024-07-01/Organization_TopicList.json
 */
async function organizationListTopics() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topics.list(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "cluster-1",
    { pageSize: 10 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await organizationListTopics();
}

main().catch(console.error);
