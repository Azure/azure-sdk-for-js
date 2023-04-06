// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SipRoutingClient } = require("@azure/communication-phone-numbers");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// NOTE: Before running the example please make sure that the trunks and the routes are empty for specified connection string.
// Otherwise the example may fail on data constraints.
const connectionString = process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
  "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

async function main() {
  console.log("\n== SIP Routing Client Example ==\n");

  // Build client
  const client = new SipRoutingClient(connectionString);

  // Set trunks
  await client.setTrunks([
    {
      fqdn: "<first trunk fqdn>",
      sipSignalingPort: 1234,
    },
    {
      fqdn: "<second trunk fqdn>",
      sipSignalingPort: 1234,
    },
  ]);

  // Set routes
  await client.setRoutes([
    {
      name: "First Route",
      description: "<first route description>",
      numberPattern: "^+[1-9][0-9]{3,23}$",
      trunks: ["<first trunk fqdn>"],
    },
    {
      name: "Second Route",
      description: "<second route description>",
      numberPattern: "^.*$",
      trunks: ["<second trunk fqdn>", "<first trunk fqdn>"],
    },
  ]);

  // Set domains
  await client.setDomains([
    {
      domainUri: firstDomain,      
      enabled: true,
    },
    {
      domainUri: secondDomain,
      enabled: true,
    },
  ]);

  // Update a trunk
  await client.setTrunk({
    fqdn: "<first trunk fqdn>",
    sipSignalingPort: 4321,
  });

   // Update a domain
   await client.setDomain({
    domainUri: firstDomain,
    enabled: false,
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
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
