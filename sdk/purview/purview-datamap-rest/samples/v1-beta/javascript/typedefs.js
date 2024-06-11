// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 */

const PurviewDataMap = require("@azure-rest/purview-datamap").default;
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
const { isUnexpected } = require("@azure-rest/purview-datamap");

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== Get typedefs sample ==");
  const client = PurviewDataMap(endpoint, new DefaultAzureCredential());

  const result = await client.path("/atlas/v2/types/typedefs").get();

  if (isUnexpected(result)) {
    throw result;
  }
}

main().catch(console.error);
