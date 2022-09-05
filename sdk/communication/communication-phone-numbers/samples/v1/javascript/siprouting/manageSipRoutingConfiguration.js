// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SipRoutingClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
  "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

async function main() {
  console.log("\n== SIP Routing Client Example ==\n");

  // Build client
  const client = new SipRoutingClient(connectionString);

  // Clear
  await client.setRoutes([]);
  await client.setTrunks([]);

  // Set trunks
  await client.setTrunks([
    {
      fqdn: "sbc.one.domain.com",
      sipSignalingPort: 1234,
    },
    {
      fqdn: "sbc.two.domain.com",
      sipSignalingPort: 1234,
    },
  ]);

  // Set routes
  await client.setRoutes([
    {
      name: "First Route",
      description: "route's description",
      numberPattern: "^+[1-9][0-9]{3,23}$",
      trunks: ["sbc.one.domain.com"],
    },
    {
      name: "Second Route",
      description: "route's description",
      numberPattern: "^.*$",
      trunks: ["sbc.two.domain.com", "sbc.one.domain.com"],
    },
  ]);

  // Update a trunk
  await client.setTrunk({
    fqdn: "sbc.one.domain.com",
    sipSignalingPort: 4321,
  });

  // List trunks
  const trunks = await client.listTrunks();
  for (const trunk of trunks) {
    console.log(`Trunk ${trunk.fqdn}:${trunk.sipSignalingPort}`);
  }

  // List routes
  const routes = await client.listRoutes();
  for (const route of routes) {
    console.log(`Route ${route.name} with pattern ${route.numberPattern}`);
    console.log(`Route's trunks: ${route.trunks?.join()}`);
  }
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
