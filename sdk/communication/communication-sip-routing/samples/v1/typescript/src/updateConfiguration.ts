// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Create and then update a SIP routing configuration
 */

import { SipRoutingClient } from '@azure/communication-sip-routing';
import dotenv from "dotenv";

// Load the .env file if it exists
dotenv.config();

async function main() {
  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://<resource-name>.communication.azure.com/;<access-key>";

  // Create a new client
  const client = new SipRoutingClient(connectionString);

  console.log("== Create an initial configuration ==");
  
  // Create a new configuration so that we have a record to update in the next step
  const newConfig = {
    trunks: {
      "my-new-trunk.contoso.com": {
        sipSignallingPort: 9999
      }
    }
  };

  // Insert the new config
  await client.updateSipConfiguration(newConfig);

  console.log("== Modify the configuration ==");

  // Modify the config by changing the port number
  const updatedConfig = {
    trunks: {
      "my-new-trunk.contoso.com": {
        sipSignallingPort: 10000
      }
    }
  };

  // Save the modified config
  await client.updateSipConfiguration(updatedConfig);

  console.log("== Delete the configuration ==");

  // Finally, create an entry that deletes the trunk created previously as a clean-up
  const trunkToDelete = {
    trunks: {
      "my-new-trunk.contoso.com": null
    }
  };

  // Delete the trunk by saving the config back.
  await client.updateSipConfiguration(trunkToDelete);

  console.log("== Done ==");
}

main().catch((error) => {
  console.error("Encountered an error while updating configuration: ", error);
  process.exit(1);
});
