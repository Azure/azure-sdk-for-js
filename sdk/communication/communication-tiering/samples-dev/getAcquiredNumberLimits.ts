// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get acquired numbers and limits for a resource
 */

import { TieringClient } from "@azure-tools/communication-tiering";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get acquired numbers and limits for a resource ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new TieringClient(connectionString);

  const resourceId = "5d41e908-de88-4bbf-94dc-fe9a1b51029b";

  // Get acquired numbers and limits for a resource
  var acquiredNumberLimits = await client.getAcquiredNumberLimits(resourceId);

  // print all number limits
  console.log(acquiredNumberLimits);
}

main().catch((error) => {
  console.log("The sample getAcquiredNumberLimits encountered an error:", error);
  process.exit(1);
});
