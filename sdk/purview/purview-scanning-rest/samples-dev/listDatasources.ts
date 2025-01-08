// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 * @azsdk-weight 40
 */

import type {
  DataSourceOutput,
  PagedAsyncIterableIterator,
  PageSettings,
} from "@azure-rest/purview-scanning";
import PurviewScanning, { paginate, isUnexpected } from "@azure-rest/purview-scanning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const endpoint = process.env["ENDPOINT"] || "";

async function main(): Promise<void> {
  console.log("== List dataSources ==");
  const client = PurviewScanning(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/datasources").get();
  if (isUnexpected(dataSources)) {
    throw dataSources.body.error;
  }
  const iter = paginate(client, dataSources);

  const items: DataSourceOutput[] = [];

  for await (const item of <
    PagedAsyncIterableIterator<DataSourceOutput, DataSourceOutput[], PageSettings>
  >iter) {
    items.push(item);
  }
  console.log(items.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
