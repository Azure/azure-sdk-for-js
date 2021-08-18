// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get the current SIP routing configuration
 */

import { SipRoutingClient } from '@azure/communication-sip-routing';
import dotenv from "dotenv";

// Load the .env file if it exists
dotenv.config();

export async function main() {
  console.log("== Get SIP Routing Configuration ==");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";
  
  // Create a new client
  const client = new SipRoutingClient(connectionString);

  // Get the current configuration
  const config = await client.getSipConfiguration();

  // Print the configururation formatted as JSON into console
  const json = JSON.stringify(config, null, 4);
  console.log(json);

  console.log("== Done: Get SIP Routing Configuration ==");
}

main().catch((error) => {
  console.error("Encountered an error while getting configuration: ", error);
  process.exit(1);
});
