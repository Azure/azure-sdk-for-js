/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.
  
  This sample demonstrates how to create a namespace using AAD token credentials
  obtained from signing in through your Azure account.

  Setup :
    Please ensure that your Azure Service Bus resource is in US East, US East 2, or West Europe
    region. AAD Role Based Access Control is not supported in other regions yet.

    In the Azure portal, go to your Service Bus resource and click on the Access control (IAM) tab.
    Here, assign "Azure Service Bus Data Owner (Preview)" role to your account.
*/

const { ServiceBusClient } = require("@azure/service-bus");
const { loginWithUsernamePassword } = require("@azure/ms-rest-nodeauth");

// Define Service Bus Endpoint here and related entity names here
const serviceBusEndpoint = ""; // <your-servicebus-namespace>.servicebus.windows.net

const username = "";
const password = "";

async function main() {
  const tokenCreds = await loginWithUsernamePassword(username, password, {
    tokenAudience: "https://servicebus.azure.net/"
  });

  const sbClient = ServiceBusClient.createFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
  /*
   Refer to other samples, and place your code here
   to create queue clients, and to send/receive messages
  */
  await sbClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
