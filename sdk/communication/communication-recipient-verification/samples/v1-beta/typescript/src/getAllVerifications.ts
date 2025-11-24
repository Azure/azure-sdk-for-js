// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get all verifications for a resource
 */

import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get All Verifications Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // get all verifications for a resource
  var verifications = await client.getVerifications();

  // print all verifications
  for await (const verification of verifications) {
    console.log(verification);
  }
}

main().catch((error) => {
  console.log("The sample getAllVerifications encountered an error:", error);
  process.exit(1);
});
