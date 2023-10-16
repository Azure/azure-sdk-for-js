// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Get all Short Code Costs for a resource
 */

import { ShortCodesClient } from "@azure-tools/communication-short-codes";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Get All Short Code Costs Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new ShortCodesClient(connectionString);

  // get all short code costs for a resource
  var shortCodeCosts = await client.listShortCodeCosts({
    onResponse:
      (response) =>
      (res = response) => {
        if (!res || res.status != 201) {
          throw new Error(
            `Short Code Cots listing failed.
            Status code cost: ${res.status}; 
            Error: ${res.bodyAsText}; 
            CV: ${res.headers.get("MS-CV")}`
          );
        }
      },
  });
  // print all short code costs
  for await (const shortCodeCost of shortCodeCosts) {
    console.log(`${shortCodeCost}`);
  }
}

main().catch((error) => {
  console.log("The sample getAllShortCodeCosts encountered an error:", error);
  process.exit(1);
});
