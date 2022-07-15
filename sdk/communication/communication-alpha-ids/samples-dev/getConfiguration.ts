// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get the Alpha IDs configuration that's applied for the current resource
 */

import {
  AlphaIdConfiguration
} from "@azure-tools/communication-alpha-ids";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get the Alpha IDs configuration that's applied for the current resource ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  var config: AlphaIdConfiguration = {
    enabled: true
  };

  console.log(
    `Test sample for ${config} ${connectionString}`
  );
}

main().catch((error) => {
  console.log("The sample getAndUpdateProgramBriefs encountered an error:", error);
  process.exit(1);
});
