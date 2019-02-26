/*
  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from using Service Principal Secrets.

  Setup :
    Please ensure that your Azure Service Bus resource is in one of the below regions.
    - [US East, US East 2, or West Europe]
    AAD Role Based Access Control is not supported in other regions yet.

    Register a new application in AAD
     - Follow Documentation to register a new application
       [https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app]
       in the Azure Active Directory(in the azure-portal).
     - Note down the CLIENT_ID and TENANT_ID.
     - In the "Certificates & Secrets" tab, create a secret and note that down.

    Assign owner role to the registered application
     - In the azure-portal,
       go to your servicebus-namespace and assign owner role to the registered application.
     - This can be done from Access control (IAM) tab
       (in the left-side-navbar of your servicebus-namespace in the azure-portal)
*/

import { Namespace } from "@azure/service-bus";
import { loginWithServicePrincipalSecret } from "ms-rest-azure";

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint = ""; // <your-servicebus-namespace>.servicebus.windows.net

// Define CLIENT_ID, TENANT_ID and SECRET of your AAD application here
const clientId = "";
const clientSecret = "";
const tenantId = "";

async function main(): Promise<void> {
  const tokenCreds = await loginWithServicePrincipalSecret(clientId, clientSecret, tenantId, {
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
