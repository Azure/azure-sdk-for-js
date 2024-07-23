// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary a succinct and simple sample example
 */

const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  const credential = new DefaultAzureCredential();
  await credential.getToken("https://vault.azure.net/.default");

  const envValue = process.env.MY_VARIABLE ?? "<my variable>";

  // Let's test some new Node 14 syntax
  const n = 1_999_999;

  const f = (n) => n;

  console.log(f?.(n)?.toString());

  console.log("Here's what we found:", envValue);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
