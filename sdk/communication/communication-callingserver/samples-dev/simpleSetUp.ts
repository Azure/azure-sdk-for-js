// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Issue a new Relay configuration
 */

import { CallingServerClient } from "@azure/communication-callingserver";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export async function main() {
  console.log("\n== Get Relay configuration Sample ==\n");

  // Create user
  console.log("Creating User");

  const client = new CallingServerClient(connectionString);
  console.log("Getting relay configuration");

  const config = await client.getCallConnection("test");
  console.log("RelayConfig", config);
}

main().catch((error) => {
  console.error("Encountered an error while issuing relay configuration: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
