// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SipRoutingClient } from "@azure/communication-phone-numbers";

import * as dotenv from "dotenv";
dotenv.config();

const connectionString =
  process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
  "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

export async function main() {
  console.log("\n== SIP Routing Client Example ==\n");

  // Build client
  const client = new SipRoutingClient(connectionString);

  // List trunks
  const trunks = await client.listTrunks();
  for await (const trunk of trunks) {
    console.log(
      `Trunk ${trunk.fqdn}:${trunk.sipSignalingPort} with property enabled:${trunk.enabled}`
    );
  }

  // List routes
  const routes = await client.listRoutes();
  for await (const route of routes) {
    console.log(`Route ${route.name} with pattern ${route.numberPattern}`);
    console.log(`Route's trunks: ${route.trunks?.join()}`);
  }

  // List domains
  const domains = await client.listDomains();
  for await (const domain of domains) {
    console.log(`Domain ${domain.domainName} with property enabled:${domain.enabled}`);
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
