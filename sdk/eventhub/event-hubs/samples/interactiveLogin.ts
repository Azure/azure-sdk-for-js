/*
  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from interactive login.

  Setup :
    Please ensure that your Azure Event Hubs resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.
*/

import { EventHubClient } from "../src";
import { interactiveLogin } from "@azure/ms-rest-nodeauth";

// Define Event Hubs Endpoint and related entity name here here
const evenHubsEndpoint = ""; // <your-eventhubs-namespace>.servicebus.windows.net
const path = "";

async function main(): Promise<void> {
  const credentials = await interactiveLogin({ tokenAudience: "https://eventhubs.azure.net/" });
  const client = EventHubClient.createFromAadTokenCredentials(evenHubsEndpoint, path, credentials);
  /*
   Refer to other samples, and place your code here
   to send/receive messages
  */
  await client.close();
}

main().catch(err => {
  console.log("error: ", err);
});
