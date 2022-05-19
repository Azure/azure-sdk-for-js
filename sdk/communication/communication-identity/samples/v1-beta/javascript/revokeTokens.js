// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Revoke user tokens.
 */

const { CommunicationIdentityClient } = require("@azure/communication-identity");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("\n== Revoke Token sample ==\n");

  const client = new CommunicationIdentityClient(connectionString);

  // Create user
  console.log("Creating User");

  const user = await client.createUser();

  console.log(`Created user with id: ${user.communicationUserId}`);

  console.log("Issuing Tokens");

  // Issue tokens
  const { token: token1 } = await client.getToken(user, ["chat"]);
  const { token: token2 } = await client.getToken(user, ["voip"]);
  const { token: token3 } = await client.getToken(user, ["voip"]);

  console.log("Issued tokens:");
  console.log(token1);
  console.log(token2);
  console.log(token3);

  // Revoke tokens
  console.log("Revoking Tokens");

  await client.revokeTokens(user);

  console.log("Tokens Revoked");
}

main().catch((error) => {
  console.error("Encountered an error while issuing/refreshing token: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});

module.exports = { main };
