// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieve an access token from the Mixed
 * Reality security token service (STS).
 */

import { AzureKeyCredential } from "@azure/core-auth";
import { MixedRealityStsClient } from "@azure/mixedreality-authentication";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values:
const accountDomain = process.env["MIXEDREALITY_ACCOUNT_DOMAIN"] || "<account domain>";
const accountId = process.env["MIXEDREALITY_ACCOUNT_ID"] || "<account identifier>";
const accountKey = process.env["MIXEDREALITY_ACCOUNT_KEY"] || "<account key>";

export async function main() {
  console.log("== Retrieving token ==");
  const keyCredential = new AzureKeyCredential(accountKey);

  const client = new MixedRealityStsClient(accountId, accountDomain, keyCredential);

  const token = await client.getToken();

  if (token) {
    console.log("== Token retrieved ==");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
