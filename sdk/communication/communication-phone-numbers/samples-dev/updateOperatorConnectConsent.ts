// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Search for a toll-free phone number then purchase it.
 */

import { OperatorConnectClient } from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Update OperatorConnect consent sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new OperatorConnectClient(connectionString);

  console.log("Update OperatorConnect consent.");

  const consent = await client.updateConsent({
    operatorId: "fa82b96a-3352-4594-80f2-a0a18924a001",
    lastModifiedBy: {
      fullName: "User1",
      email: "Test@contoso.com",
    },
    companyName: "Updated company name",
  });
  console.log(`Company Name '${consent.companyName}'`);
  console.log(`OperatorId: '${consent.operatorId}'`);
  console.log(`Status: '${consent.status}'`);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
