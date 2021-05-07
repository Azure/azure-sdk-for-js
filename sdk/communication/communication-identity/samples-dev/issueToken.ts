// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Issue a new user token.
 */

import { CommunicationIdentityClient, TokenScope } from "@azure/communication-identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export async function main() {
  console.log("\n== Issue Token Sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);
  const scopes: TokenScope[] = ["chat"];

  // Create user
  console.log("Creating User");

  const user = await client.createUser();

  console.log(`Created user with id: ${user.communicationUserId}`);
  console.log("Issuing Token");

  // Issue token and get token from response
  const { token } = await client.getToken(user, scopes);

  console.log(`Issued token: ${token}`);
}

main().catch((error) => {
  console.error("Encountered an error while issuing token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
