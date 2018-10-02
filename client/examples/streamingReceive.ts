// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  EventHubClient, EventPosition, OnMessage, OnError, MessagingError, ReceiveOptions, delay
} from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const onMessage: OnMessage = async (eventData: any) => {
    console.log(">>> EventDataObject: ", eventData);
    console.log("### Actual message:", eventData.body ? eventData.body.toString() : null);
  }
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  const options: ReceiveOptions = {
    // Receive messages starting from the last 1 hour.
    eventPosition: EventPosition.fromEnqueuedTime(Date.now() - (60 * 60 * 1000)),
    enableReceiverRuntimeMetric: true
  }
  const rcvHandler = client.receive("0", onMessage, onError, options);
  console.log("rcvHandler: ", rcvHandler.name);
  await delay(10000);
  await rcvHandler.stop();
  console.log("Closed the receiver after receiving messages for 10 seconds.");
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
