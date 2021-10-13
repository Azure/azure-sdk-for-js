// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of datasources
 *
 * @summary gets a list of datasources
 */

import PurviewScanning, { paginate } from "@azure-rest/purview-scanning";
import { DefaultAzureCredential } from "@azure/identity";

async function main() {
  console.log("== List dataSources ==");
  const client = PurviewScanning(
    "https://<purview-account-name>.scan.purview.azure.com",
    new DefaultAzureCredential()
  );

  const dataSources = await client.path("/datasources").get();
  const iter = paginate(client, dataSources)
  if (dataSources.status !== "200") {
    throw dataSources;
  }
  const items: any[] = [];

  for await (const item of iter) {
    // console.log(item);
    items.push(item);
  }
  console.log(items?.map((ds) => ds.name).join("\n"));
}

main().catch(console.error);
