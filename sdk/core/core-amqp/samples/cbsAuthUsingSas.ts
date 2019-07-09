/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 This sample utilizes Service Bus/Event Hubs and demonstrates how to authenticate using SharedKeyCredential.
*/

import {
  ConnectionContextBase,
  ConnectionConfig,
  CbsResponse,
  TokenType,
  SharedKeyCredential
} from "@azure/core-amqp";

// Define connection string and related entity path here
const connectionString = "";
const path = "";

const connectionConfig = ConnectionConfig.create(connectionString, path);
const parameters = {
  config: connectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-core-amqp",
    version: "0.1.0"
  }
};
const connectionContext = ConnectionContextBase.create(parameters);

/**
 * audience The entity token audience in one of the following forms:
 *
 * - **ServiceBus**
 *    - **Sender**
 *        - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
 *        - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
 *
 *    - **Receiver**
 *         - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
 *         - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
 *
 *    - **ManagementClient**
 *         - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
 *         - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
 *
 * - **EventHubs**
 *     - **Sender**
 *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
 *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
 *
 *     - **Receiver**
 *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
 *
 *     - **ManagementClient**
 *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
 */
export async function authenticate(
  audience: string,
  closeConnection: boolean
): Promise<CbsResponse> {
  await connectionContext.cbsSession.init();
  const sharedKeyCredential = <SharedKeyCredential>connectionContext.tokenCredential;
  const tokenObject = sharedKeyCredential.getToken(audience);
  const result = await connectionContext.cbsSession.negotiateClaim(
    audience,
    tokenObject,
    TokenType.CbsTokenTypeSas
  );
  console.log("Result is: %O", result);
  if (closeConnection) {
    await connectionContext.connection.close();
    console.log("Successfully closed the connection.");
  }
  return result;
}

async function main(): Promise<void> {
  await authenticate(`${connectionConfig.endpoint}${connectionConfig.entityPath}`, false);
  /*
 Add code here to create a sender or receiver link for which you have
 just sent the authentication request
*/
  await connectionContext.connection.close();
}

main().catch((err) => console.log(err));
