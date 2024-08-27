// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to authenticate using AzureNamedKeyCredential
 */

const { ServiceBusClient } = require("@azure/service-bus");
const { AzureNamedKeyCredential } = require("@azure/core-auth");

// Load the .env file if it exists
require("dotenv").config();

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint =
  process.env.SERVICEBUS_FQDN || "<your-servicebus-namespace>.servicebus.windows.net";
const queueName = process.env.QUEUE_NAME || "<queue name>";

// Define SAS policy name and key here
const sasPolicyName = process.env.SERVICEBUS_SAS_POLICY || "<SAS policy name>";
const sasKey = process.env.SERVICEBUS_SAS_KEY || "<SAS key>";

async function main() {
  const namedKeyCred = new AzureNamedKeyCredential(sasPolicyName, sasKey);
  const sbClient = new ServiceBusClient(serviceBusEndpoint, namedKeyCred);

  /*
     Refer to other samples, and place your code here
     to create queue/subscription receivers.
    */
  const sender = sbClient.createSender(queueName);

  await sender.sendMessages({
    body: "using AzureNamedKeyCredential sample message",
  });

  await sender.close();
  await sbClient.close();
}

main().catch((err) => {
  console.log("usingNamedKeyCredential Sample - Error occurred: ", err);
  process.exit(1);
});

module.exports = { main };
