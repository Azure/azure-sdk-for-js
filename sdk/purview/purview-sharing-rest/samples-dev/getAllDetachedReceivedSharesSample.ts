// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, { paginate } from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to List detached received shares
 *
 * @summary List detached received shares
 */
async function getAllDetachedReceivedShares() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const initialResponse = await client.path("/receivedShares/detached").get();
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

async function main() {
  getAllDetachedReceivedShares();
}

main().catch(console.error);
