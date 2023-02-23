// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Get a received share
 *
 * @summary Get a received share
 */
async function getReceivedShare() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const receivedShareId = "0D67B9C8-A6C6-4990-9EDE-12EA059D3002";
  const result = await client.path("/receivedShares/{receivedShareId}", receivedShareId).get();
  console.log(result);
}

async function main() {
  getReceivedShare();
}

main().catch(console.error);
