// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 * @azsdk-weight 40
 */

import type { DataSource } from "@azure-rest/purview-scanning";
import PurviewScanning, { paginate } from "@azure-rest/purview-scanning";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["ENDPOINT"] || "";

async function main(): Promise<void> {
  console.log("== List dataSources ==");
  const client = PurviewScanning(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/datasources").get();
  if (dataSources.status !== "200") {
    throw dataSources.body.error;
  }
  const iter = paginate(client, dataSources);

  const items: DataSource[] = [];

  for await (const item of <PagedAsyncIterableIterator<DataSource, DataSource[], PageSettings>>(
    iter
  )) {
    items.push(item);
  }
  console.log(items.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
