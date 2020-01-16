/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from interactive login.

  Setup :
    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.
*/

import { ServiceBusClient } from "@azure/service-bus";
import { interactiveLogin } from "@azure/ms-rest-nodeauth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define Service Bus Endpoint here
const serviceBusEndpoint =
  process.env.SERVICE_BUS_ENDPOINT || "<your-servicebus-namespace>.servicebus.windows.net";

export async function main() {
  const tokenCreds = await interactiveLogin({
    tokenAudience: "https://servicebus.azure.net/"
  });

  const sbClient = ServiceBusClient.createFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
  /*
   Refer to other samples, and place your code here
   to create queue clients, and send/receive messages
  */
  await sbClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
