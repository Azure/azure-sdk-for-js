// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, { getLongRunningPoller } from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Delete a sent share
 *
 * @summary Delete a sent share
 */
async function deleteSentShare() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).delete();

  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main() {
  deleteSentShare();
}

main().catch(console.error);
