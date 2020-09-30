/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from using Service Principal Secrets.

  Setup :
    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    Register a new application in AAD and assign the "Azure Service Bus Data Owner" role to it
     - See https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app 
       to register a new application in the Azure Active Directory.
     - Note down the CLIENT_ID and TENANT_ID from the above step.
     - In the "Certificates & Secrets" tab, create a secret and note that down.
     - In the Azure portal, go to your Service Bus resource and click on the Access control (IAM) 
       tab. Here, assign "Azure Service Bus Data Owner" role to the registered application.
*/

import { ServiceBusClient } from "@azure/service-bus";
import { loginWithServicePrincipalSecret } from "@azure/ms-rest-nodeauth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint =
  process.env.SERVICE_BUS_ENDPOINT || "<your-servicebus-namespace>.servicebus.windows.net";

// Define CLIENT_ID, TENANT_ID and SECRET of your AAD application here
const clientId = process.env.AZURE_CLIENT_ID || "<azure client id>";
const clientSecret = process.env.AZURE_CLIENT_SECRET || "<azure client secret>";
const tenantId = process.env.AZURE_TENANT_ID || "<azure tenant id>";

export async function main() {
  const tokenCreds = await loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, {
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
