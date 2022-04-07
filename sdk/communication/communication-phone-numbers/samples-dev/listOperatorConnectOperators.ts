// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Iterate operator connect operators one by one or with paing.
 */

import {
  OperatorConnectClient,
} from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== List operators sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new OperatorConnectClient(connectionString);

  console.log("Iterating over operators page by page.");

  for await (const operatorsPage of client
    .listOperators({ requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } })
    .byPage({ maxPageSize: 5 })) {
    console.log(`Received page of '${operatorsPage.length}' operators`);

    // Printing single page results
    for (const operator of operatorsPage) {
      console.log(`Operator name '${operator.friendlyName}'`);
      console.log(` Aquaired numbers: '${operator.acquiredNumbersCount}'`);
      if (operator.landingPage != null) {
        console.log(` Link: '${operator.landingPage}'`);
      }
    }
  }
  
  console.log("Iterating over operators one by one.");
  for await (const operator of client.listOperators({ requestOptions: { customHeaders: { "x-ms-useragent": "acs-mock-test" } } })) {
    // Printing single page results
    console.log(`Operator name '${operator.friendlyName}'`);
    console.log(` Aquaired numbers: '${operator.acquiredNumbersCount}'`);
    if (operator.landingPage != null) {
      console.log(` Link: '${operator.landingPage}'`);
    }
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
