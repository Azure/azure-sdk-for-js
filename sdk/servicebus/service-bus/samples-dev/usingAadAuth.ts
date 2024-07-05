// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a namespace using AAD token credentials
 * obtained from using Service Principal Secrets.
 *
 *  Setup:
 *    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
 *    region. Role Based Access Control is not supported in other regions yet.
 *
 * @summary This sample how to create a namespace using AAD token credentials
 * @azsdk-weight 85
 */

import { ServiceBusClient } from "@azure/service-bus";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint =
  process.env.SERVICEBUS_FQDN || "<your-servicebus-namespace>.servicebus.windows.net";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const tokenCreds = new DefaultAzureCredential();

  const sbClient = new ServiceBusClient(serviceBusEndpoint, tokenCreds);

  /*
   Refer to other samples, and place your code here
   to create queue/subscription receivers.
  */
  const sender = sbClient.createSender(queueName);

  await sender.sendMessages({
    body: "using AAD auth sample message",
  });

  await sender.close();
  await sbClient.close();
}

main().catch((err) => {
  console.log("usingAadAuth Sample - Error occurred: ", err);
  process.exit(1);
});
