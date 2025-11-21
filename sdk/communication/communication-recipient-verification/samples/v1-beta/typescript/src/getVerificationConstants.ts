// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get verification constants for a resource
 */

import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  console.log("\n== Get Verification Constants Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // get constants for the resource
  const constants = await client.getVerificationConstants();

  // print constant values
  console.log(constants);
}

main().catch((error) => {
  console.log("The sample getVerificationConstants encountered an error:", error);
  process.exit(1);
});
