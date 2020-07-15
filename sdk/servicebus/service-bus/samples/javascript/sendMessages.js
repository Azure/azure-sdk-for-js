/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1
  
  This sample demonstrates how the sendMessages() method can be used to send messages to Service Bus
  Queue/Topic.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions
  to learn about Queues, Topics and Subscriptions.
*/

const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

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
async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName);

  try {
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const message = {
        body: `${scientist.firstName} ${scientist.name}`,
        label: "Scientist"
      };

      console.log(`Sending message: ${message.body} - ${message.label}`);
      await sender.sendMessages(message);
    }

    await sender.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
