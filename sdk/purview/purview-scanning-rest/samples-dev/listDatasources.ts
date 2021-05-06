// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 * @azsdk-weight 40
 */

import PurviewScanning from "@azure-rest/purview-scanning";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List dataSources sample ==");
  const client = PurviewScanning(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/datasources").get();

  if (dataSources.status !== "200") {
    throw dataSources.body.error;
  }

  console.log(dataSources.body.value?.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
