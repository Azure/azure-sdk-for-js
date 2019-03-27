// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
// Licensed under the MIT License.

import { EventHubClient, EventData, aadEventHubsAudience, EventPosition } from "../lib";
import { loginWithServicePrincipalSecret } from "@azure/ms-rest-nodeauth";
import * as dotenv from "dotenv";
dotenv.config();

const endpoint = "ENDPOINT";
const entityPath = "EVENTHUB_NAME";
const address = process.env[endpoint] || "";
const path = process.env[entityPath] || "";

const cid = "CLIENT_ID";
const sec = "APPLICATION_SECRET";
const doma = "DOMAIN";
const clientId = process.env[cid] || "";
const secret = process.env[sec] || "";
const domain = process.env[doma] || "";
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
