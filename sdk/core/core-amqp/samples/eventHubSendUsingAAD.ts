// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ConnectionContextBase,
  CreateConnectionContextBaseParameters,
  CbsResponse,
  EventHubConnectionConfig,
  TokenType,
  Constants
} from "../src";
import * as dotenv from "dotenv";
dotenv.config(); // Optional for loading environment configuration from a .env (config) file
import { EnvironmentCredential } from "@azure/identity";

const str = process.env.CONNECTION_STRING || "";
const path = process.env.ENTITY_PATH || "";

const ehConnectionConfig = EventHubConnectionConfig.create(str, path);
const parameters: CreateConnectionContextBaseParameters = {
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
 Refer to other event hub samples, and place your code here
 to send/receive events
*/
  await connectionContext.connection.close();
}

main().catch((err) => console.log(err));
