// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the use of a DomainVerificationClient to create domain ownership challenge and verify domain ownership.
 */

import { DomainVerificationClient } from "@azure-tools/communication-domain-verification";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  console.log("\n== Verify Domain Ownership ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // You will need to set any of these environment variables or edit the following values
  const domainName = process.env.ACS_DOMAIN_OWNERSHIP_CHALLENGE || "<domain name>";

  const client = new DomainVerificationClient(connectionString);

  const result = await client.verifyDomainOwnership(domainName);

  console.log("The domain status is:", result.status);
  console.log("Details:", result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
