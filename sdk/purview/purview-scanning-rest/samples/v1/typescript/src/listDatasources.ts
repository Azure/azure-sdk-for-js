// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 */

import PurviewScanning, { paginate, DataSource } from "@azure-rest/purview-scanning";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {
  console.log("== List dataSources ==");
  const client = PurviewScanning(
    "https://<purview-account-name>.scan.purview.azure.com",
    new DefaultAzureCredential()
  );

  const dataSources = await client.path("/datasources").get();
  if (dataSources.status !== "200") {
    throw dataSources.body.error;
  }
  const iter = paginate(client, dataSources)


  const items: DataSource[] = [];

  for await (const item of <PagedAsyncIterableIterator<DataSource, DataSource[], PageSettings>>(
    iter
  )) {
    items.push(item);
  }
  console.log(items?.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
