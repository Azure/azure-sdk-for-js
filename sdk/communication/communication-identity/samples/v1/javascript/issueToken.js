// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Issue a new user token.
 */

const { CommunicationIdentityClient } = require("@azure/communication-identity");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("\n== Issue Token Sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);
  const scopes = ["chat"];

  // Create user
  console.log("Creating User");
  const user = await client.createUser();
  console.log(`Created user with id: ${user.communicationUserId}`);
  console.log("Issuing Token");

  // Issue token and get token from response
  const defaultToken = await client.getToken(user, scopes);
  console.log(`Issued token: ${defaultToken.token}`);

  // Issue token with custom expiration and get token from response
  console.log("Issuing Token with custom expiration.");
  const tokenOptions = { tokenExpiresInMinutes: 60 };
  const { token, expiresOn } = await client.getToken(user, scopes, tokenOptions);
  console.log(`Issued token with custom expiration: ${token}`);
  console.log(`Token expires on: ${expiresOn}`);
}

main().catch((error) => {
  console.error("Encountered an error while issuing token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});

module.exports = { main };
