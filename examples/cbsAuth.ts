// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ConnectionContextBase, CreateConnectionContextBaseParameters, ConnectionConfig } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.CONNECTION_STRING || "";
const path = process.env.ENTITY_PATH;

async function main(): Promise<void> {
  const config = ConnectionConfig.create(str, path);
  const parameters: CreateConnectionContextBaseParameters = {
    config: config,
    connectionProperties: {
      product: "MSJSClient",
      userAgent: "/js-amqp-common",
      version: "0.1.0"
    }
  };
  const context = ConnectionContextBase.create(parameters);
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
  const audience: string = `${config.endpoint}${path}`; //Audience is for an EvenntHub or ServiceBus sender.
  await context.cbsSession.init();
  const tokenObject = await context.tokenProvider.getToken(audience);
  const result = await context.cbsSession.negotiateClaim(audience, tokenObject);
  console.log("Result is: %O", result);
  await context.connection.close();
  console.log("Successfully closed the connection.");
}

main().catch((err) => { console.log(err); });