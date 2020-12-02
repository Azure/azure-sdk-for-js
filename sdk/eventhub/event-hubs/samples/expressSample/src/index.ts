import { v4 as uuid } from "uuid";
import { EventProducer } from "./eventProducer";
import bodyParser from "body-parser";

var express = require("express");
var app = express();

const eventHubConnectionString = "your eventHub connection string";
const eventHubName = "your eventHub name";
const batchSendSize = 20;
const timeIntervalSeconds = 10;
const eventProducer = new EventProducer(
  eventHubConnectionString,
  eventHubName,
  batchSendSize,
  timeIntervalSeconds
);
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// respond with requestId
app.post("/ingest", async (req, res) => {
  const requestId = uuid();
  await eventProducer.send(requestId, req.body);
  res.send(`ingested event. requestId: ${requestId}`);
});

// enable timeTrigger for eventHub.

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
