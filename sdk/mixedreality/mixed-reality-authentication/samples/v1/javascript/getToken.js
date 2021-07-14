// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to retrieve an access token from the
 * Mixed Reality security token service (STS).
 */

const { AzureKeyCredential } = require("@azure/core-auth");
const { MixedRealityStsClient } = require("@azure/mixed-reality-authentication");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values:
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
