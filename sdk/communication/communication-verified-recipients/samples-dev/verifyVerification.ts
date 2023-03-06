// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Verifying idenity with verification code
 */

import { VerifiedRecipientsClient } from "@azure-tools/communication-verified-recipients";

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log("\n== Request Verification Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new VerifiedRecipientsClient(connectionString);

  // id that is used to reference users phone number
  const verificationId = "7e5dd7e1-5203-41ab-960e-65c1eb804fc6";

  // body of the request
  const VerificationRequest = {
    verificationCode: "1682793",
  };

  // verifying your phone number
  const status = await client.verifyIdentity(verificationId, VerificationRequest);
  console.log(status);
}

main().catch((error) => {
  console.log("The sample verifyVerification encountered an error:", error);
  process.exit(1);
});
