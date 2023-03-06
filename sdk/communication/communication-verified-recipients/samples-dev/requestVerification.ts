// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Request identity verification
 */

import { VerifiedRecipientsClient } from "@azure-tools/communication-verified-recipients";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Request Verification Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new VerifiedRecipientsClient(connectionString);

  // body of the request
  const VerificationRequest = {
    identity: "+11234567890",
    channel: "sms",
  };

  // get the verification status
  var status = await client.requestVerification(VerificationRequest);

  // print the status of the phone number
  console.log(status);
}

main().catch((error) => {
  console.log("The sample requestVerification encountered an error:", error);
  process.exit(1);
});
