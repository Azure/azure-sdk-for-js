// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 * @azsdk-weight 40
 */

import PurviewCatalog from "@azure-rest/purview-datamap";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List entity typedefs sample ==");
  const client = PurviewDataMap(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/atlas/v2/types/typedefs").get();

  if (dataSources.status !== "200") {
    throw dataSources;
  }

  if (!dataSources.body.entityDefs) {
    throw new Error("entityDefs is not defined");
  }

  console.log(dataSources.body.entityDefs.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
