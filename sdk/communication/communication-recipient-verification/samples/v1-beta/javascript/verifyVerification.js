// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Verifying idenity with verification code
 */

const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("\n== Request Verification Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // id that is used to reference users phone number
  const verificationId = "4d313ff0-3aeb-477e-8c15-7c9a893e8999";

  // body of the request
  const verificationRequest = {
    verificationCode: "1234567",
  };

  // verifying your phone number
  const status = await client.verifyIdentity(verificationId, verificationRequest);
  console.log(status);
}

main().catch((error) => {
  console.log("The sample verifyVerification encountered an error:", error);
  process.exit(1);
});
