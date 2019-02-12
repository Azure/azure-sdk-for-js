// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  EventHubClient,
  OnError,
  MessagingError,
  OnMessage,
  delay
} from "../lib";
import dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  console.log("Created EH client from connection string");
  const onMessage: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver with epoch 2.");
    console.log(">>> EventDataObject: ", eventData);
    console.log(
      "### Actual message:",
      eventData.body ? eventData.body.toString() : undefined
    );
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log("@@@@ receiver with epoch 2.");
    console.log(">>>>> Error occurred for receiver with epoch 2: ", err);
  };
  client.receive("0", onMessage, onError, { epoch: 2 });

  console.log(
    "$$$$ Waiting for 8 seconds to let receiver 1 set up and start receiving messages..."
  );
  await delay(8000);
  const onMessage2: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver with epoch 1.");
    console.log(">>> EventDataObject: ", eventData);
    console.log(
      "### Actual message:",
      eventData.body ? eventData.body.toString() : undefined
    );
  };
  const onError2: OnError = (err: MessagingError | Error) => {
    console.log("@@@@ receiver with epoch 1.");
    console.log(">>>>> Error occurred for receiver with epoch 1: ", err);
  };
  console.log(
    "$$$$ Will start receiving messages from receiver with epoch value 1..."
  );
  client.receive("0", onMessage2, onError2, { epoch: 1 });
}

main().catch((err) => {
  console.log("error: ", err);
});
