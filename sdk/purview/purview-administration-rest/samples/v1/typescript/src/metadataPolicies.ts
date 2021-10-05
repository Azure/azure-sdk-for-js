// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of metadata policies
 *
 * @summary gets a list of metadata policies
 */

import {
  PurviewMetadataPolicies,
  PurviewMetadataPoliciesClient,
} from "@azure-rest/purview-administration";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";

async function main() {
  console.log("== List metadata policies sample ==");
  const client = PurviewMetadataPoliciesClient(endpoint, new DefaultAzureCredential());

  const response = await client.path("/metadataPolicies").get();

  if (response.status !== "200") {
    const error = `GET "/metadataPolicies" failed with ${response.status}`;
    console.log();
    throw new Error(error);
  }

  const policies = PurviewMetadataPolicies.Pagination.paginate(client, response);

  for await (const policy of policies) {
    console.log(policy.name);
  }
}

main().catch(console.error);
