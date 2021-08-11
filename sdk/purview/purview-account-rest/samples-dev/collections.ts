// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of typedefs
 *
 * @summary gets a list of typedefs for entities
 * @azsdk-weight 40
 */

import PurviewAccount from "@azure-rest/purview-account";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

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
