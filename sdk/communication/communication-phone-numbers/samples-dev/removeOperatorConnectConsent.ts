// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Search for a toll-free phone number then purchase it.
 */

import {
  OperatorConnectClient,
} from "@azure/communication-phone-numbers";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== Remove OperatorConnect consent sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  const client = new OperatorConnectClient(connectionString);

  console.log("Remove OperatorConnect consent.");

  try {
    const consent = await client.removeConsent({
      operatorId: "fa82b96a-3352-4594-80f2-a0a18924a001",
      lastModifiedBy: {
        fullName: "User1",
        email: "Test@contoso.com"
      },
    });
    console.log(`Company Name '${consent.companyName}'`);
    console.log(`OperatorId: '${consent.operatorId}'`);
    console.log(`Status: '${consent.status}'`);
  } catch (ex: any) {
    if(ex.statusCode == "404")
      console.log("Consent does not exist");
    else
      console.log(ex);
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
