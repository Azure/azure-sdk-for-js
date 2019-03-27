// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
// Licensed under the MIT License.

import { EventHubClient, EventData, aadEventHubsAudience, EventPosition } from "../lib";
import { loginWithServicePrincipalSecret } from "@azure/ms-rest-nodeauth";
import * as dotenv from "dotenv";
dotenv.config();

const address = "shivangieventhubs.servicebus.windows.net";
const path = "myeventhub";


const clientId = "2ac7a52a-c1bf-449b-b3e6-5d4254df8997";
const secret = "}TO*h(nwmB)Y5U3cF4M}|Cc#/+6?8L9w_YRbz8mAh.";
const domain = "72f988bf-86f1-41af-91ab-2d7cd011db47";
async function main(): Promise<void> {
  const credentials = await loginWithServicePrincipalSecret(clientId, secret, domain, { tokenAudience: aadEventHubsAudience });
  const client = EventHubClient.createFromAadTokenCredentials(address, path, credentials);
  const partitionIds = await client.getPartitionIds();
  await client.send({ body: "Hello awesome world!!" }, partitionIds[0]);
  const result: EventData[] = await client.receiveBatch(partitionIds[0], 2, 5, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  let i = 0;
  for (const data of result) {
    console.log("### Actual message (%d):", ++i, data.body);
  }
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
