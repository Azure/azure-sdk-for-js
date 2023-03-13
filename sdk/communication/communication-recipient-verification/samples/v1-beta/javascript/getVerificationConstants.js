// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get verification constants for a resource
 */

const {
  RecipientVerificationClient,
} = require("@azure-tools/communication-recipient-verification");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log("\n== Get Verification Constants Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new RecipientVerificationClient(connectionString);

  // get constants for the resource
  var constants = await client.getVerificationConstants();

  // print constant values
  console.log(constants);
}

main().catch((error) => {
  console.log("The sample getVerificationConstants encountered an error:", error);
  process.exit(1);
});

module.exports = { main };
