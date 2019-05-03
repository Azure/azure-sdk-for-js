/*
  This sample demonstrates how the send() function can be used to send messages to Event Hubs.

  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about
  to learn about Event Hubs.
*/

import { EventHubClient, EventData } from "@azure/event-hubs";

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
    const data: EventData = {
      body: `${scientist.firstName} ${scientist.name}`
    };
    // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
    // where the body is a JSON object/array.
    // const data = { body: { "message": `${scientist.firstName} ${scientist.name}` } };
    console.log(`Sending message: ${data.body}`);
    await client.send(data, partitionIds[0]);
  }

  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
