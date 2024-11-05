// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 * @azsdk-weight 40
 */

import PurviewScanning, {
  DataSourceOutput,
  ErrorResponseModelOutput,
  paginate,
} from "@azure-rest/purview-scanning";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List dataSources ==");
  const client = PurviewScanning(endpoint, new DefaultAzureCredential());

  const dataSources = await client.path("/datasources").get();
  if (dataSources.status !== "200") {
    const dataSourcesOutput = dataSources.body as ErrorResponseModelOutput;
    throw dataSourcesOutput.error;
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
