// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default,
  { paginate } = require("@azure-rest/purview-sharing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List sent share recipients
 *
 * @summary List sent share recipients
 */
async function getAllSentShareInvitations() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const initialResponse = await client
    .path("/sentShares/{sentShareId}/sentShareInvitations", sentShareId)
    .get();

  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

async function main() {
  getAllSentShareInvitations();
}

main().catch(console.error);
