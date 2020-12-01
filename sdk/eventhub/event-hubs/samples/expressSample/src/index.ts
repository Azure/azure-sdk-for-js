// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

import { v4 as uuid } from "uuid";
import { AsyncBatchingProducer } from "./asyncBatchingProducer";
import bodyParser from "body-parser";

import express from "express";
import { EventHubProducerClient } from "@azure/event-hubs";
const app = express();

const eventHubConnectionString = "my connection string";
const eventHubName = "my event hub name";
const batchSendSize = 3;
const timeIntervalSeconds = 10;
const eventProducer = new AsyncBatchingProducer({
  producer: new EventHubProducerClient(eventHubConnectionString, eventHubName),
  maxWaitTimeInSeconds: timeIntervalSeconds,
  maxBatchSize: batchSendSize
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

// enable timeTrigger for eventHub.
eventProducer.start();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
