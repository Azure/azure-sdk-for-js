// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Test trunk status APi.
 */

// import { TrunkStatusClient } from "../src/index";
import { SipRoutingClient } from "../src/";

// Load the .env file if it exists
import * as dotenv from "dotenv";

dotenv.config();

export async function main() {
  console.log("\n== Get Trunk Status Sample ==\n");

  // You will need to set following environment variables or edit the following values
  const connectionString =
    process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
    "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

  const trunkFqdn = process.env.COMMUNICATION_SAMPLES_TRUNK_FQDN || "sbc.trunkstatustest.com";
  
  //const client = new TrunkStatusClient(connectionString);
  const client = new SipRoutingClient(connectionString);

  const trunkStatus = await client.getTrunkStatus(trunkFqdn);

  console.log(`The trunk's fqdn is: ${trunkStatus.fqdn}`);
  console.log(`The trunk's ping is: ${trunkStatus.ping}`);
  console.log(`The trunk's tls is: ${trunkStatus.tls}`);
  console.log(`The trunk's overall status is: ${trunkStatus.trunkOverallStatus}`);
  console.log(`The trunk's last update time is: ${trunkStatus.lastUpdateTime}`);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
