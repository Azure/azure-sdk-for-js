// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CosmosClient } from "@azure/cosmos";
const masterKey = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";

/**
 * @summary Demonstrates getting Cosmos Diagnostics from database, container, and item.
 */

const client = new CosmosClient({
  key: masterKey,
  endpoint: endpoint,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

const databases = await client.databases.create({
  id: "1",
});

console.log(databases.getCosmosDiagnostics());

const containers = await databases.database.containers.create({
  id: "testContainer",
});

console.log(containers.getCosmosDiagnostics());

await containers.container.items.create({
  id: "1",
  category: "fun",
  name: "Cosmos diagnostics",
  description: "Cosmos diagnostics is fun ⚡.",
  isComplete: false,
});
const item = await containers.container.items.readAll().fetchAll();

console.log(item.getCosmosDiagnostics());
