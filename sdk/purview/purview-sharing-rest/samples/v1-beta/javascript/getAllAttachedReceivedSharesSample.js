// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default,
  { paginate } = require("@azure-rest/purview-sharing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to List attached received shares
 *
 * @summary List attached received shares
 */
async function getAllAttachedReceivedShares() {
  const endpoint = process.env["ENDPOINT"] || "";
  const storageAccountResourceId = process.env["STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const options = {
    queryParameters: {
      referenceName: storageAccountResourceId,
    },
  };

  const initialResponse = await client.path("/receivedShares/attached").get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

async function main() {
  getAllAttachedReceivedShares();
}

main().catch(console.error);
