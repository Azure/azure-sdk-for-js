// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SipRoutingClient } from "@azure/communication-phone-numbers";
import { randomUUID } from "@azure/core-util";
import * as dotenv from "dotenv";

dotenv.config();

// NOTE: Before running the example please make sure that the trunks and the routes are empty for specified connection string.
// Otherwise the example may fail on data constraints.
const connectionString =
  process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
  "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

export async function main(): Promise<void> {
  console.log("\n== Update SIP Routing Client Example ==\n");

  // Build client
  const client = new SipRoutingClient(connectionString);

  // TODO replace with real FQDN
  const firstTrunkFqdn = `sample.${randomUUID()}.com`;
  // TODO replace with real FQDN
  const secondTrunkFqdn = `sample.${randomUUID()}.com`;

  // Clear configuration
  await client.setRoutes([]);
  await client.setTrunks([]);

  // Set trunks
  await client.setTrunks([
    {
      fqdn: firstTrunkFqdn,
      sipSignalingPort: 1234,
    },
    {
      fqdn: secondTrunkFqdn,
      sipSignalingPort: 1234,
    },
  ]);

  // Set routes
  await client.setRoutes([
    {
      name: "First Route",
      description: "<first route description>",
      numberPattern: "^+[1-9][0-9]{3,23}$",
      trunks: [firstTrunkFqdn],
    },
    {
      name: "Second Route",
      description: "<second route description>",
      numberPattern: "^.*$",
      trunks: [secondTrunkFqdn, firstTrunkFqdn],
    },
  ]);

  // Update a trunk
  await client.setTrunk({
    fqdn: firstTrunkFqdn,
    sipSignalingPort: 4321,
  });

  // Get trunks
  const trunks = await client.listTrunks();
  for await (const trunk of trunks) {
    console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
  }

  // Get routes
  const routes = await client.listRoutes();
  for await (const route of routes) {
    console.log(`Route ${route.name} with pattern ${route.numberPattern}`);
    console.log(`Route's trunks: ${route.trunks?.join()}`);
  }

  // Clear configuration
  await client.setRoutes([]);
  await client.setTrunks([]);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
