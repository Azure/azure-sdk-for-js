// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 */

const PurviewScanning, { paginate } = require("@azure-rest/purview-scanning");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List dataSources sample ==");
  const client = PurviewScanning(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/datasources").get();

  const iter = paginate(client, dataSources)
  if (dataSources.status !== "200") {
    throw dataSources;
  }
  const items = [];

  for await (const item of iter) {
    // console.log(item);
    items.push(item);
  }
  console.log(items?.map((ds) => ds?.name).join("\n"));
}

main().catch(console.error);
