// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, { getLongRunningPoller } from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete a received share
 *
 * @summary Delete a received share
 */
async function deleteReceivedShare() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const receivedShareId = "0D67B9C8-A6C6-4990-9EDE-12EA059D3002";
  const initialResponse = await client
    .path("/receivedShares/{receivedShareId}", receivedShareId)
    .delete();

  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main() {
  deleteReceivedShare();
}

main().catch(console.error);
