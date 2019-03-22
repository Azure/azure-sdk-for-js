/*
  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from signing in through your Azure account.

  Setup :
    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    In the Azure portal, go to your Service Bus resource and click on the Access control (IAM) tab.
    Here, assign "owner" role to your account.
*/

import { Namespace } from "@azure/service-bus";
import { loginWithUsernamePassword } from "@azure/ms-rest-nodeauth";

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint = ""; // <your-servicebus-namespace>.servicebus.windows.net

const username = "";
const password = "";

async function main(): Promise<void> {
  const tokenCreds = await loginWithUsernamePassword(username, password, {
    tokenAudience: "https://servicebus.azure.net/"
  });

  const ns = Namespace.createFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
  /*
   Refer to other samples, and place your code here
   to create queue clients, and to send/receive messages
  */
  await ns.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
