/*
  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from interactive login.

  Setup :
    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.
*/

import { Namespace } from "@azure/service-bus";
import { interactiveLogin } from "@azure/ms-rest-nodeauth";

// Define Service Bus Endpoint here
const serviceBusEndpoint = ""; // <your-servicebus-namespace>.servicebus.windows.net

async function main(): Promise<void> {
  const tokenCreds = await interactiveLogin({
    tokenAudience: "https://servicebus.azure.net/"
  });

  const ns = Namespace.createFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
  /*
   Refer to other samples, and place your code here
   to create queue clients, and send/receive messages
  */
  await ns.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
