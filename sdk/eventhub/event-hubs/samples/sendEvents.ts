/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the send() function can be used to send events to Event Hubs.

  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about
  to learn about Event Hubs.
*/

import { EventHubClient } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

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
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const partitionIds = await client.getPartitionIds();

  for (let index = 0; index < listOfScientists.length; index++) {
    const scientist = listOfScientists[index];
    const event = {
      body: `${scientist.firstName} ${scientist.name}`
    };
    // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
    // where the body is a JSON object/array.
    // const event = { body: { "message": `${scientist.firstName} ${scientist.name}` } };
    console.log(`Sending event: ${event.body}`);
    await client.send(event, partitionIds[0]);
  }

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
