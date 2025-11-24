// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Delete a verification for a resource
 */

import { RecipientVerificationClient } from "@azure-tools/communication-recipient-verification";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Delete Verification Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // id that is used to reference users phone number
  const verificationId = process.env.VERIFICATION_ID;

  // delete verification for a resource
  await client.deleteVerification(verificationId);
}

main().catch((error) => {
  console.log("The sample deleteVerification encountered an error:", error);
  process.exit(1);
});
