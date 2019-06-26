/*Copyright (c) Microsoft Corporation. All rights reserved.
 Licensed under the MIT License. See License.txt in the project root for license information.

This sample utilizes Event Hubs and demonstrates how to authenticate using AAD token credentials
obtained from using Service Principal Secrets.

Setup :
      Please ensure that your Azure Event Hubs resource is in US East, US East 2, or West Europe
      region. AAD Role Based Access Control is not supported in other regions yet.

Register a new application in AAD and assign the "owner" role to it
     - See https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
       to register a new application in the Azure Active Directory.
     - Note down the CLIENT_ID and TENANT_ID from the above step.
     - In the "Certificates & Secrets" tab, create a secret and note that down.
     - In the Azure portal, go to your Even Hubs resource and click on the Access control(IAM)
       tab.Here, assign "owner" role to the registered application.
*/

import {
  ConnectionContextBase,
  CbsResponse,
  EventHubConnectionConfig,
  TokenType,
  Constants
} from "@azure/core-amqp";
import { EnvironmentCredential } from "@azure/identity";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

// Define AZURE_TENANT_ID, AZURE_CLIENT_ID and AZURE_CLIENT_SECRET of your AAD application in your environment

const ehConnectionConfig = EventHubConnectionConfig.create(connectionString, eventHubName);
const parameters = {
  config: ehConnectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-core-amqp",
    version: "0.1.0"
  }
};
const connectionContext = ConnectionContextBase.create(parameters);

async function authenticate(
  audience: string,
  closeConnection: boolean = false
): Promise<CbsResponse> {
  await connectionContext.cbsSession.init();
  const credential = new EnvironmentCredential();
  const tokenObject = await credential.getToken(Constants.aadEventHubsScope);
  if (!tokenObject) {
    throw new Error("Aad token cannot be null");
  }
  const result = await connectionContext.cbsSession.negotiateClaim(
    audience,
    tokenObject,
    TokenType.CbsTokenTypeJwt
  );
  console.log("Result is: %O", result);
  if (closeConnection) {
    await connectionContext.connection.close();
    console.log("Successfully closed the connection.");
  }
  return result;
}

async function main(): Promise<void> {
  await authenticate(ehConnectionConfig.getSenderAudience());
  /*
 Add code here to create a sender or receiver link for which you have
 just sent the authentication request
*/
  await connectionContext.connection.close();
}

main().catch((err) => console.log(err));
