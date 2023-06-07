// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 */

const PurviewCatalog = require("@azure-rest/purview-catalog").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List entity typedefs sample ==");
  const client = PurviewCatalog(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/atlas/v2/types/typedefs").get();

  if (dataSources.status !== "200") {
    throw dataSources;
  }

  if (!dataSources.body.entityDefs) {
    throw new Error("entityDefs is undefined");
  }

  console.log(dataSources.body.entityDefs.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
