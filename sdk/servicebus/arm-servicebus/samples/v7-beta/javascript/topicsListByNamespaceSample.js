// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceBusManagementClient } = require("@azure/arm-servicebus");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the topics in a namespace.
 *
 * @summary gets all the topics in a namespace.
 * x-ms-original-file: 2025-05-01-preview/Topics/SBTopicListByNameSpace.json
 */
async function topicGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "5f750a97-50d9-4e36-8081-c9ee4c0210d4";
  const client = new ServiceBusManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.topics.listByNamespace(
    "Default-ServiceBus-WestUS",
    "sdk-Namespace-1617",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await topicGet();
}

main().catch(console.error);
