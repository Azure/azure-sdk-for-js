// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 */

const PurviewAccount = require("@azure-rest/purview-Account");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List collections sample ==");
  const client = PurviewAccount(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/collections").get();

  if (dataSources.status !== "200") {
    throw dataSources;
  }

  console.log(dataSources.body);
}

main().catch(console.error);
