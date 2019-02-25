/*
  This sample demonstrates how to create a namespace using TokenCredentials.

  Setup: AAD RBAC is enabled only on the new namespaces in these regions
    - [US East, US East 2, or West Europe] for the preview.
    Please ensure that your servicebus-namespace is present in one of these regions.
*/

import { Namespace, SendableMessageInfo } from "@azure/service-bus";
import { loginWithServicePrincipalSecret } from "ms-rest-azure";

const aadServiceBusAudience = "https://servicebus.azure.net/";

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint = ""; // <your-servicebus-namespace>.servicebus.windows.net
const queueName = "";

// Define CLIENT_ID, TENANT_ID and SECRET of your AAD application here
const clientId = "";
const clientSecret = "";
const tenantId = "";

const listOfScientists = [
  { name: "Einstein", firstName: "Albert" },
  { name: "Heisenberg", firstName: "Werner" },
  { name: "Curie", firstName: "Marie" }
];

async function main(): Promise<void> {
  // tokenCreds can be of the following types
  //      ApplicationTokenCredentials
  //      UserTokenCredentials
  //      DeviceTokenCredentials
  //      MSITokenCredentials
  // loginWithServicePrincipalSecret returns ApplicationTokenCredentials
  const tokenCreds = await loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, {
    tokenAudience: aadServiceBusAudience
  });

  const ns = Namespace.createFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
  const client = ns.createQueueClient(queueName);
  const sender = client.getSender();

  try {
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const message: SendableMessageInfo = {
        body: `${scientist.firstName} ${scientist.name}`,
        label: "Scientist"
      };
      console.log(`Sending message: ${message.body} - ${message.label}`);
      await sender.send(message);
    }
    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
