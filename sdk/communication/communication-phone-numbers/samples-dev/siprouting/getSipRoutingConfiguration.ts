// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SipRoutingClient } from "@azure/communication-phone-numbers";
import { DefaultAzureCredential } from "@azure/identity";

import "dotenv/config";

const endpoint =
  process.env.COMMUNICATION_ENDPOINT || "https://resourceName.communication.azure.net/";

export async function main(): Promise<void> {
  console.log("\n== SIP Routing Client Example ==\n");

  // Build client
  const client = new SipRoutingClient(endpoint, new DefaultAzureCredential());

  // Get trunks
  for await (const trunk of client.listTrunks()) {
    console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
  }

  // Get routes
  for await (const route of client.listRoutes()) {
    console.log(`Route ${route.name} with pattern ${route.numberPattern}`);
    console.log(`Route's trunks: ${route.trunks?.join()}`);
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
