// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 */

import PurviewScanning, { paginate } from "@azure-rest/purview-scanning";
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List dataSources ==");
  const client = PurviewScanning(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/datasources").get();
  if (dataSources.status !== "200") {
    throw dataSources.body.error;
  }
  const iter = paginate(client, dataSources);

  const items = [];

  for await (const item of iter) {
    items.push(item);
  }
  console.log(items?.map((ds) => ds?.name).join("\n"));
}

main().catch(console.error);
