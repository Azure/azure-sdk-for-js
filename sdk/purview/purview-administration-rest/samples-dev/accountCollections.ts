// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of collections
 *
 * @summary gets a list of collections
 * @azsdk-weight 40
 */

import { PurviewAccount } from "@azure-rest/purview-administration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";
const endpoint = process.env["ENDPOINT"] || "";

async function main(): Promise<void> {
  console.log("== List collections sample ==");
  const client = PurviewAccount.createClient(endpoint, new DefaultAzureCredential());

  const response = await client.path("/collections").get();

  if (response.status !== "200") {
    console.log(`GET "/collections" failed with ${response.status}`);
  }

  const dataSources = PurviewAccount.PaginateHelper.paginate(client, response);

  for await (const dataSource of dataSources) {
    console.log(dataSource);
  }
}

main().catch(console.error);
