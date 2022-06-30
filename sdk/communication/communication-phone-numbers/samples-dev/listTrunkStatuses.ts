// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Test trunk status APi.
 */

//import { TrunkStatusClient } from "../src/index";
import { SipRoutingClient } from "../src";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log("\n== List Trunk Statuses Sample ==\n");

  // You will need to set this environment variable or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  // create new client
  // const client = new TrunkStatusClient(connectionString);

  const client = new SipRoutingClient(connectionString);
  const trunkStatuses = await client.getTrunksStatus();

  if (!(trunkStatuses.values === undefined || trunkStatuses.values === null)) {
    for (const trunkStatus of trunkStatuses.values) {
      console.log(`The trunk's fqdn is: ${trunkStatus.fqdn}`);
      console.log(`The trunk's ping is: ${trunkStatus.ping}`);
      console.log(`The trunk's tls is: ${trunkStatus.tls}`);
      console.log(`The trunk's overall status is: ${trunkStatus.trunkOverallStatus}`);
      console.log(`The trunk's last update time is: ${trunkStatus.lastUpdateTime}`);
    }
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
