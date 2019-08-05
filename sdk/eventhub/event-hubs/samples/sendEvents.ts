/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the send() function can be used to send events to Event Hubs.
  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about to learn about Event Hubs.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubClient, EventData } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

const listOfScientists = [
  { name: "Einstein", firstName: "Albert" },
  { name: "Heisenberg", firstName: "Werner" },
  { name: "Curie", firstName: "Marie" },
  { name: "Hawking", firstName: "Steven" },
  { name: "Newton", firstName: "Isaac" },
  { name: "Bohr", firstName: "Niels" },
  { name: "Faraday", firstName: "Michael" },
  { name: "Galilei", firstName: "Galileo" },
  { name: "Kepler", firstName: "Johannes" },
  { name: "Kopernikus", firstName: "Nikolaus" }
];

async function main(): Promise<void> {
  const client = new EventHubClient(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const producer = client.createProducer({ partitionId: partitionIds[0] });
  try {
    // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
    // where the body is a JSON object/array.
    // const events = [
    //   { body: { "message": "Hello World 1" }, applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
    //   { body: { "message": "Hello World 2" } },
    //   { body: { "message": "Hello World 3" } }
    // ];
    console.log("Sending single event...");
    const scientist = listOfScientists[0];
    producer.send({ body: `${scientist.firstName} ${scientist.name}` });

    console.log("Sending multiple events...");
    const events: EventData[] = [];
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      events.push({ body: `${scientist.firstName} ${scientist.name}` });
    }
    await producer.send(events);

    console.log("Creating and sending a batch of events...");
    const eventDatabatch = await producer.createBatch();
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const isAdded = eventDatabatch.tryAdd({ body: `${scientist.firstName} ${scientist.name}` });
      if (!isAdded) {
        console.log(`Unable to add event ${index} to the batch`);
        break;
      }
    }
    await producer.send(eventDatabatch);

    await producer.close();
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
