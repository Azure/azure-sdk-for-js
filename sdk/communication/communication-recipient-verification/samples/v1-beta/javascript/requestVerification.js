// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Request identity verification
 */

const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log("\n== Request Verification Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // body of the request
  const verificationRequest = {
    identity: "+1123456789",
    channel: "sms",
  };

  // get the verification status
  var status = await client.requestVerification(verificationRequest);

  // print the status of the phone number
  console.log(status);
}

main().catch((error) => {
  console.log("The sample requestVerification encountered an error:", error);
  process.exit(1);
});

module.exports = { main };
