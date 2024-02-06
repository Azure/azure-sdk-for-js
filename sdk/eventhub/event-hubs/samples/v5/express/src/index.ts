/*
  Copyright (c) Microsoft Corporation.
  Licensed under the MIT Licence.

  This sample demonstrates how to send events to Event Hubs
  from an express service. The service will take the HTTP body of
  any request sent to `POST /ingest` and transform it before sending
  it to Event Hubs.
  
 As events are handed to the `AsyncBatchingProducer` via the `send()` call,
 the producer will ensure that events are sent in the same batch so long as:
 1. The batch has enough space for additional events.
 2. the maxBatchSize is not exceeded by adding an event.
 3. The elapsed time since the last batch was sent does not exceed the maxWaitTimeInSeconds.
 Once any of these conditions are met, a new batch is created and the cycle continues.
*/

import { v4 as uuid } from "uuid";
import { AsyncBatchingProducer } from "./asyncBatchingProducer";
import bodyParser from "body-parser";
import express from "express";
import { EventHubProducerClient } from "@azure/event-hubs";
const app = express();

const eventHubConnectionString = "my connection string";
const eventHubName = "my event hub name";
const maxBatchSendSize = 20;
const maxWaitTimeInSeconds = 10;
const eventProducer = new AsyncBatchingProducer({
  producer: new EventHubProducerClient(eventHubConnectionString, eventHubName),
  maxWaitTimeInSeconds: maxWaitTimeInSeconds,
  maxBatchSize: maxBatchSendSize
});
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// respond with requestId
app.post("/ingest", async (req, res) => {
  const requestId = uuid();
  await eventProducer.send({
    properties: {
      request_id: requestId
    },
    body: req.body
  });
  res.send(`ingested event. requestId: ${requestId}`);
});

// Enable sending events to an Event Hub based on the maxWaitTimeInSeconds and maxBatchSize.
eventProducer.start();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
