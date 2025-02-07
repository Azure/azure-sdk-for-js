// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 * @azsdk-weight 40
 */

import PurviewDataMap from "@azure-rest/purview-datamap";
import { DefaultAzureCredential } from "@azure/identity";
import { isUnexpected } from "@azure-rest/purview-datamap";
import "dotenv/config";

const endpoint = process.env["ENDPOINT"] || "";

async function main(): Promise<void> {
  console.log("== Get typedefs sample ==");
  const client = PurviewDataMap(endpoint, new DefaultAzureCredential());

  const result = await client.path("/atlas/v2/types/typedefs").get();

  if (isUnexpected(result)) {
    throw result;
  }
}

main().catch(console.error);
