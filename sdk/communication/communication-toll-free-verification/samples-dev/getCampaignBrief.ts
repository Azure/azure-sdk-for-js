// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get the Alpha IDs configuration that's applied for the current resource
 */

import {
  CampaignBrief,
  TollFreeVerificationClient,
} from "@azure-tools/communication-toll-free-verification";

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
  const client = new TollFreeVerificationClient(connectionString);

  // get the applied configuration for the current resource
  const campaignBrief: CampaignBrief = await client.getCampaignBrief(
    "63215741-b596-4eb4-a9c0-b2905ce22cb0",
    "US"
  );

  console.log(`The usage of Alpha IDs is currently ${campaignBrief}`);
}

main().catch((error) => {
  console.log("The sample getConfiguration encountered an error:", error);
  process.exit(1);
});
