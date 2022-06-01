// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary a succinct and simple sample example
 */

require("dotenv").config();

async function main() {
  const envValue = process.env.MY_VARIABLE || "<my variable>";

  console.log("Here's what we found:", envValue);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
