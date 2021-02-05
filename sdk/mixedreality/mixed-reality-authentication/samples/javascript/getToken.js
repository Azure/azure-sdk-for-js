// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates something
 */

const { AzureKeyCredential } = require("@azure/core-auth");
const { MixedRealityStsClient } = require("@azure/mixed-reality-authentication");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set this environment variables or edit the following values:
const accountDomain = process.env["MIXEDREALITY_ACCOUNT_DOMAIN"] || "<account domain>";
const accountId = process.env["MIXEDREALITY_ACCOUNT_ID"] || "<account identifier>";
const accountKey = process.env["MIXEDREALITY_ACCOUNT_KEY"] || "<account key>";

async function main() {
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
