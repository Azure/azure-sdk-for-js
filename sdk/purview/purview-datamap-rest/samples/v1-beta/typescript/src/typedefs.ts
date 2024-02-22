// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 */

import PurviewDataMap from "@azure-rest/purview-datamap";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== Get typedefs sample ==");
  const client = PurviewDataMap(endpoint, new DefaultAzureCredential());

  const result = await client.path("/atlas/v2/types/typedefs").get();

  if (result .status !== "200") {
    throw result ;
  }

}

main().catch(console.error);
