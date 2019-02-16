// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  EventHubClient,
  EventData,
  aadEventHubsAudience,
  EventPosition
} from "../lib";
import * as msrestAzure from "ms-rest-azure";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = "ENDPOINT";
const entityPath = "EVENTHUB_NAME";
const address = process.env[endpoint] || "";
const path = process.env[entityPath] || "";

async function main(): Promise<void> {
  // For now the interactive user needs to explicitly be assigned
  // the role of a constributor/owner even if the user is a subscription owner.
  // azure role assignment create -o contributor --scope /subscriptions/<subscriptionId>/resourceGroups/<rgName>/providers/Microsoft.EventHub/namespaces/<ehNamespaceName> --signInName <user@example.com>
  const credentials = await msrestAzure.interactiveLogin({ tokenAudience: aadEventHubsAudience });
  const client = EventHubClient.createFromAadTokenCredentials(address, path, credentials);
  const partitionIds = await client.getPartitionIds();
  await client.send({ body: "Hello awesome world!!" }, partitionIds[0]);
  const result: EventData[] =  await client.receiveBatch(partitionIds[0], 2, 5, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  let i = 0;
  for (const data of result) {
    console.log("### Actual message (%d):", ++i, data.body);
  }
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
