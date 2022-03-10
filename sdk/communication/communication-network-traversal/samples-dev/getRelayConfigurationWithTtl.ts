// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 *
 * @summary Issue a new Relay configuration providing a ttl
 * @azsdk-weight 30
 */

import {
  CommunicationRelayClient,
  GetRelayConfigurationOptions,
} from "@azure/communication-network-traversal";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export async function main() {
  console.log("\n== Get Relay configuration passing Time to live for credential ==\n");

  const relayClient = new CommunicationRelayClient(connectionString);
  console.log("Getting relay configuration");

  const options: GetRelayConfigurationOptions = { ttl: 4000 };
  const config = await relayClient.getRelayConfiguration(options);
  console.log("RelayConfig", config);
}

main().catch((error) => {
  console.error("Encountered an error while issuing relay configuration: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
