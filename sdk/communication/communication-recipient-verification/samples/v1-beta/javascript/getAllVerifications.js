// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get all verifications for a resource
 */

const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");

// Load the .env file if it exists
require("dotenv/config");

async function main() {
  console.log("\n== Get All Verifications Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // get all verifications for a resource
  const verifications = client.getVerifications();

  // print all verifications
  for await (const verification of verifications) {
    console.log(verification);
  }
}

main().catch((error) => {
  console.log("The sample getAllVerifications encountered an error:", error);
  process.exit(1);
});

module.exports = { main };
