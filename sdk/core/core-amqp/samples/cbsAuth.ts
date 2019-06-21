/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

 This sample utilizes Service Bus/Event Hubs and demonstrates how to authenticate using SharedKeyCredential.
*/
import {
  ConnectionContextBase,
  CreateConnectionContextBaseParameters,
  ConnectionConfig,
  CbsResponse,
  TokenType,
  SharedKeyCredential
} from "../src";

// Define connection string and related entity path here
const connectionString = "";
const path = "";
export const connectionConfig = ConnectionConfig.create(connectionString, path);
const parameters: CreateConnectionContextBaseParameters = {
  config: connectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-core-amqp",
    version: "0.1.0"
  }
};
export const connectionContext = ConnectionContextBase.create(parameters);

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
  const sharedTokenCredential = <SharedKeyCredential>connectionContext.tokenCredential;
  const tokenObject = sharedTokenCredential.getToken(audience);
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

// Audience is for an EventHub or ServiceBus sender.
// You can uncomment the following line and just run this sample, if required.
// authenticate(`${config.endpoint}${path}`).catch((err) => console.log(err));
