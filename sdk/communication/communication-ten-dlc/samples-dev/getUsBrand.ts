// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get a Campaign Brief.
 */

import { USBrand, TenDlcClient } from "@azure-tools/communication-ten-dlc";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get a USBrand ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new TenDlcClient(connectionString);

  // a dummy campaign brief Id
  const uSBrandId = "63215741-b596-4eb4-a9c0-b2905ce22cb0";

  // get a campaign brief
  const usBrand: USBrand = await client.getUSBrand(uSBrandId);

  console.log(usBrand);
}

main().catch((error) => {
  console.log("The sample getCampaignBrief encountered an error:", error);
  process.exit(1);
});
