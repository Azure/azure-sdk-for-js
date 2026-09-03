// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventGridManagementClient } = require("@azure/arm-eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all the namespace topics under a namespace.
 *
 * @summary list all the namespace topics under a namespace.
 * x-ms-original-file: 2025-07-15-preview/NamespaceTopics_ListByNamespace.json
 */
async function namespaceTopicsListByNamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceTopics.listByNamespace(
    "examplerg",
    "examplenamespace2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await namespaceTopicsListByNamespace();
}

main().catch(console.error);
