// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to us the PhoneNumbersClient
 * to release phone numbers.
 */

import { PhoneNumberAdministrationClient } from "@azure/communication-phone-numbers";

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values
const connectionString =
  process.env["COMMUNICATION_CONNECTION_STRING"] || "<communication service connection string>";

export const main = async () => {
  console.log("\n== Release Phone Numbers Typescript Sample ==\n");
};

main().catch((error) => {
  console.error("Encountered an error while releasing phone numbers: ");
  console.error("Request: \n", error.request);
  console.error("\nResponse: \n", error.response);
  console.error(error);
});
