// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClient, aadEventHubsAudience, EventPosition } from "../lib";
import msrestAzure from "ms-rest-azure";
import dotenv from "dotenv";
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
  const credentials = await msrestAzure.loginWithServicePrincipalSecret(
    clientId,
    secret,
    domain,
    { tokenAudience: aadEventHubsAudience }
  );
  const client = EventHubClient.createFromAadTokenCredentials(
    address,
    path,
    credentials
  );
  await client.send({ body: "Hello awesome world!!" }, 0);
  const datas = await client.receiveBatch("0", 2, 5, {
    eventPosition: EventPosition.fromEnqueuedTime(Date.now())
  });
  console.log(">>> EventDataObjects: ", datas);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
