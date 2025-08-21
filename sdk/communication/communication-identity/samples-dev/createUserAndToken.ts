// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create a new user and a token simultaneously.
 */

import type { TokenScope, CreateUserAndTokenOptions } from "@azure/communication-identity";
import { CommunicationIdentityClient } from "@azure/communication-identity";

// Load the .env file if it exists
import "dotenv/config";

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export async function main(): Promise<void> {
  console.log("\n== Create User and Token Sample ==\n");
  const client = new CommunicationIdentityClient(connectionString);
  const scopes: TokenScope[] = ["chat"];
  const customId = "alice@contoso.com";

  // Create user with default token
  console.log("Creating User and Token");
  const communicationUserToken = await client.createUserAndToken(scopes, { customId });
  console.log(`Created user with id: ${communicationUserToken.user.communicationUserId}`);
  console.log(`Issued token: ${communicationUserToken.token}`);
  console.log(`Token expires on: ${communicationUserToken.expiresOn}`);

  // Get user
  const userResult = await client.getUserDetail(communicationUserToken.user);
  console.log(
    `Got user with id: ${userResult.user.communicationUserId} customId: ${userResult.customId} lastTokenIssuedAt: ${userResult.lastTokenIssuedAt}`,
  );

  // Create user with token with custom expiration
  console.log("Creating User and Token with custom expiration.");
  const userAndTokenOptions: CreateUserAndTokenOptions = { tokenExpiresInMinutes: 60 };
  const { user, token, expiresOn } = await client.createUserAndToken(scopes, userAndTokenOptions);

  console.log(`Created user with id: ${user.communicationUserId}`);
  console.log(`Issued token with custom expiration: ${token}`);
  console.log(`Token expires on: ${expiresOn}`);
}

main().catch((error) => {
  console.error("Encountered an error while issuing token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
