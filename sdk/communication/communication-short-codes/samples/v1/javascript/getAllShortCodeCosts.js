// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get all Short Code Costs for a resource
 */

const { ShortCodesClient } = require("@azure-tools/communication-short-codes");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log("\n== Get All Short Code Costs Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new ShortCodesClient(connectionString);

  // get all short codes for a resource
  var shortCodeCosts = await client.listShortCodeCosts();

  // print all short codes
  for await (const shortCodeCost of shortCodeCosts) {
    console.log(`${shortCodeCost}`);
  }
}

main().catch((error) => {
  console.log("The sample getAllShortCodeCosts encountered an error:", error);
  process.exit(1);
});
