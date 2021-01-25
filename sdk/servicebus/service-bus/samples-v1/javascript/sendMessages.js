/*
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the MIT Licence.

This sample demonstrates how the send() function can be used to send messages to Service Bus
Queue/Topic.

See https://docs.microsoft.com/azure/service-bus-messaging/service-bus-queues-topics-subscriptions
to learn about Queues, Topics and Subscriptions.
*/

const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const listOfScientists = [
  {
    name: "Einstein",
    firstName: "Albert"
  },
  {
    name: "Heisenberg",
    firstName: "Werner"
  },
  {
    name: "Curie",
    firstName: "Marie"
  },
  {
    name: "Hawking",
    firstName: "Steven"
  },
  {
    name: "Newton",
    firstName: "Isaac"
  },
  {
    name: "Bohr",
    firstName: "Niels"
  },
  {
    name: "Faraday",
    firstName: "Michael"
  },
  {
    name: "Galilei",
    firstName: "Galileo"
  },
  {
    name: "Kepler",
    firstName: "Johannes"
  },
  {
    name: "Kopernikus",
    firstName: "Nikolaus"
  }
];

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  // Optionally, you can await on `sender.open()` if you want to front load the work of setting
  // up the AMQP link to the service. If not called, the `sender` will call `open()` on your behalf
  // on the first send operation.
  //
  // await sender.open()

  try {
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const message = {
        body: `${scientist.firstName} ${scientist.name}`,
        label: "Scientist"
      };

      console.log(`Sending message: ${message.body} - ${message.label}`);
      await sender.send(message);
    }

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
