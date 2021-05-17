// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Issue a new Relay configuration
 */

import { CommunicationIdentityClient } from "@azure/communication-identity";
import { CommunicationRelayClient } from "@azure/communication-network-traversal";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export async function main() {
  console.log("\n== Get Relay configuration Sample ==\n");

  const identityClient = new CommunicationIdentityClient(connectionString);

  // Create user
  console.log("Creating User");

  const user = await identityClient.createUser();
  
  const relayClient = new CommunicationRelayClient(connectionString);
  console.log("Getting relay configuration");

  const config = relayClient.getRelayConfiguration(user);
  console.log(`Config expires on": ${(await config).expiresOn}`);
  
  for(var a of (await config).turnServers){
    
    console.log(`Credential": ${a.credential}`);
    console.log(`Username": ${a.username}`);
    
    for(var url of a.urls){
      console.log(`Url": ${url}`);
    }
  }
}

main().catch((error) => {
  console.error("Encountered an error while issuing relay configuration: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
