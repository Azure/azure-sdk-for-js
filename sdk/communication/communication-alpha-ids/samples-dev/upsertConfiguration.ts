// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Change the Alpha ID configuration for the current resource
 */

import { AlphaIdsClient } from "@azure-tools/communication-alpha-ids";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Change the Alpha ID configuration for the current resource ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new AlphaIdsClient(connectionString);

  // enable the usage of Alpha IDs
  const usageIsEnabled: boolean = true;

  await client.upsertConfiguration(usageIsEnabled);

  console.log(`The usage of Alpha IDs is now enabled`);
}

main().catch((error) => {
  console.log("The sample upsertConfiguration encountered an error:", error);
  process.exit(1);
});
