// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary a succinct and simple sample example
 */

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const envValue = process.env.MY_VARIABLE ?? "<my variable>";

  // Let's test some new Node 14 syntax
  const n = 1_999_999;

  const f: ((n: number) => number) | undefined = (n) => n;

  console.log(f?.(n)?.toString());

  console.log("Here's what we found:", envValue);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
