// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists of all the topics in a clusters
 *
 * @summary lists of all the topics in a clusters
 * x-ms-original-file: 2024-07-01/Organization_TopicList.json
 */
async function organizationListTopics(): Promise<void> {
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

async function main(): Promise<void> {
  await organizationListTopics();
}

main().catch(console.error);
