// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use the CommunicationIdentityClient to
 * issue a new user token.
 */

import { CommunicationIdentityClient } from "@azure/communication-administration";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export const main = async () => {
  console.log("\n== Issue Token Typescript Sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);

  // Create user
  console.log("Creating User");

  const user = await client.createUser();

  console.log(`Created user with id: ${user.communicationUserId}`);

  console.log("Issuing Tokens");

  // Issue tokens
  const { token: token1 } = await client.issueToken(user, ["chat"]);
  const { token: token2 } = await client.issueToken(user, ["voip"]);
  const { token: token3 } = await client.issueToken(user, ["voip"]);

  console.log("Issued tokens:");
  console.log(token1);
  console.log(token2);
  console.log(token3);

  // Revoke tokens
  console.log("Revoking Tokens");

  await client.revokeTokens(user);

  console.log("Tokens Revoked");
};

main().catch((error) => {
  console.error("Encountered an error while issuing/refreshing token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
