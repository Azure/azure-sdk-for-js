// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  ConnectionContextBase, CreateConnectionContextBaseParameters, ConnectionConfig, CbsResponse
} from "../lib";
import * as dotenv from "dotenv";
dotenv.config(); // Optional for loading environment configuration from a .env (config) file


export const str = process.env.CONNECTION_STRING || "";
export const path = process.env.ENTITY_PATH;
export const connectionConfig = ConnectionConfig.create(str, path);
const parameters: CreateConnectionContextBaseParameters = {
  config: connectionConfig,
  connectionProperties: {
    product: "MSJSClient",
    userAgent: "/js-amqp-common",
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
export async function authenticate(audience: string, closeConnection = false): Promise<CbsResponse> {
  await connectionContext.cbsSession.init();
  const tokenObject = await connectionContext.tokenProvider.getToken(audience);
  const result = await connectionContext.cbsSession.negotiateClaim(audience, tokenObject);
  console.log("Result is: %O", result);
  if (closeConnection) {
    await connectionContext.connection.close();
    console.log("Successfully closed the connection.");
  }
  return result;
}

//Audience is for an EventHub or ServiceBus sender.
// You can uncomment the following line and just run this sample, if required.
// authenticate(`${config.endpoint}${path}`).catch((err) => console.log(err));