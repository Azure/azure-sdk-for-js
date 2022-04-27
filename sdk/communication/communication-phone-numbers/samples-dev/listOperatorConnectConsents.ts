// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Iterate operator connect consents one by one or with paing.
 */

import { OperatorConnectClient } from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== List consents sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new OperatorConnectClient(connectionString);

  console.log("Iterating over consents page by page.");

  for await (const consentsPage of client
    .listConsents({ requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } })
    .byPage({ maxPageSize: 5 })) {
    console.log(`Received page of '${consentsPage.length}' consents`);

    // Printing single page results
    for (const consent of consentsPage) {
      console.log(`Company Name '${consent.companyName}'`);
      console.log(` Status: '${consent.status}'`);
      if (consent.consentedOn != null) {
        console.log(` Date: '${consent.consentedOn}'`);
      }
    }
  }

  console.log("Iterating over consents one by one.");

  for await (const consent of client.listConsents({
    requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } },
  })) {
    // Printing single page results
    console.log(`Company Name '${consent.companyName}'`);
    console.log(` Status: '${consent.status}'`);
    if (consent.consentedOn != null) {
      console.log(` Date: '${consent.consentedOn}'`);
    }
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
