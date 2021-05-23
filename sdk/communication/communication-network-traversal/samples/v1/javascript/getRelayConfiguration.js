// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Issue a new Relay configuration
 */

const { CommunicationIdentityClient } = require("@azure/communication-identity");
const { CommunicationRelayClient } = require("@azure/communication-network-traversal");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

async function main() {
  console.log("\n== Get Relay configuration Sample ==\n");

  const identityClient = new CommunicationIdentityClient(connectionString);

  // Create user
  console.log("Creating User");

  const user = await identityClient.createUser();

  const relayClient = new CommunicationRelayClient(connectionString);
  console.log("Getting relay configuration");

  const config = await relayClient.getRelayConfiguration(user);
  console.log("RelayConfig", config);
}

main().catch((error) => {
  console.error("Encountered an error while issuing relay configuration: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
