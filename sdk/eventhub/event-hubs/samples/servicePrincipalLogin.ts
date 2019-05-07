/*
  This sample demonstrates how to instantiate EventHubsClient using AAD token credentials
  obtained from using Service Principal Secrets.

  Setup :
    Please ensure that your Azure Event Hubs resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    Register a new application in AAD and assign the "owner" role to it
     - See https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
       to register a new application in the Azure Active Directory.
     - Note down the CLIENT_ID and TENANT_ID from the above step.
     - In the "Certificates & Secrets" tab, create a secret and note that down.
     - In the Azure portal, go to your Even Hubs resource and click on the Access control (IAM)
       tab. Here, assign "owner" role to the registered application.
*/
import { EventHubClient } from "@azure/event-hubs";
import { loginWithServicePrincipalSecret } from "@azure/ms-rest-nodeauth";

// Define Event Hubs Endpoint and related entity name here here
const evenHubsEndpoint = ""; // <your-eventhubs-namespace>.servicebus.windows.net
const eventHubsName = "";

// Define CLIENT_ID, TENANT_ID and SECRET of your AAD application here
const clientId = "";
const clientSecret = "";
const tenantId = "";

async function main(): Promise<void> {
  const credentials = await loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, {
    tokenAudience: "https://eventhubs.azure.net/"
  });
  const client = EventHubClient.createFromAadTokenCredentials(evenHubsEndpoint, eventHubsName, credentials);
  /*
   Refer to other samples, and place your code here
   to send/receive messages
  */
  await client.close();
}

main().catch(err => {
  console.log("error: ", err);
});
