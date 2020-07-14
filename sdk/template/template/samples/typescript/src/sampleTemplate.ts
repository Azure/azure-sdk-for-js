// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

import { AzureKeyCredential } from "@azure/template";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
// const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const apiKey = process.env["API_KEY"] || "<api key>";

export async function main() {
  console.log("== Sample Template ==");
  new AzureKeyCredential(apiKey);

  // TODO
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
