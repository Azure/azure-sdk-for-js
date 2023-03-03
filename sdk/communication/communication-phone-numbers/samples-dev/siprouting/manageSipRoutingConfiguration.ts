// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SipRoutingClient } from "@azure/communication-phone-numbers";

import { v4 as uuid } from "uuid";

import * as dotenv from "dotenv";
dotenv.config();

// NOTE: Before running the example please make sure that the trunks and the routes are empty for specified connection string.
// Otherwise the example may fail on data constraints.
const connectionString =
  process.env.COMMUNICATION_SAMPLES_CONNECTION_STRING ||
  "endpoint=https://resourceName.communication.azure.net/;accessKey=test-key";

export async function main() {
  console.log("\n== Update SIP Routing Client Example ==\n");

  // Build client
  const client = new SipRoutingClient(connectionString);

  // TODO replace with real FQDN
  const firstUuid = uuid();
  const firstDomain = `${firstUuid}.com`;
  const firstTrunkFqdn = `sample.${firstDomain}`;
  // TODO replace with real FQDN
  const secondTrunkFqdn = `sample.${firstDomain}`;

  // Clear configuration
  await client.setRoutes([]);
  await client.setTrunks([]);

  // Set domains
  await client.setDomain({
    domainName: firstDomain,
    enabled: false,
  });

  // Set trunks
  await client.setTrunks([
    {
      fqdn: firstTrunkFqdn,
      sipSignalingPort: 1234,
      enabled: false,
    },
    {
      fqdn: secondTrunkFqdn,
      sipSignalingPort: 1234,
      enabled: false,
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
    enabled: false,
  });

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
    console.log(`Trunk ${domain.domainName} with property enabled:${domain.enabled}`);
  }

  // Clear configuration
  await client.setRoutes([]);
  await client.setTrunks([]);
}

main().catch((error) => {
  console.log("The sample encountered an error:", error);
  process.exit(1);
});
