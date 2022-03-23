// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get all Short Codes for a resource
 */

const { ShortCodesClient } = require("@azure-tools/communication-short-codes");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

async function main() {
  console.log("\n== Get All Short Codes Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new ShortCodesClient(connectionString);

  // get all short codes for a resource
  var shortCodes = await client.listShortCodes();

  // print all short codes
  for await (const shortCode of shortCodes) {
    console.log(`${shortCode}`);
  }
}

main().catch((error) => {
  console.log("The sample getAllShortCodes encountered an error:", error);
  process.exit(1);
});
