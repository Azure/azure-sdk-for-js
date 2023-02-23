// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const createPurviewSharingClient = require("@azure-rest/purview-sharing").default,
  { getLongRunningPoller } = require("@azure-rest/purview-sharing");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Update changes to a received share
 *
 * @summary Update changes to a received share
 */
async function createOrReplaceReceivedShareForBlobAssets() {
  const endpoint = process.env["ENDPOINT"] || "";
  const storageAccountResourceId = process.env["STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const receivedShareId = "0D67B9C8-A6C6-4990-9EDE-12EA059D3002";
  const options = {
    body: {
      properties: {
        displayName: "updatedReceivedShareName",
        sink: {
          properties: {
            containerName: "receivingContainer",
            folder: "receivingFolder",
            mountPath: "path",
          },
          storeKind: "BlobAccount",
          storeReference: {
            type: "ArmResourceReference",
            referenceName: storageAccountResourceId,
          },
        },
      },
      shareKind: "InPlace",
    },
  };

  const initialResponse = await client
    .path("/receivedShares/{receivedShareId}", receivedShareId)
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

/**
 * This sample demonstrates how to Update changes to a received share
 *
 * @summary Update changes to a received share
 */
async function createOrReplaceReceivedShareForAdlsGen2Assets() {
  const endpoint = process.env["ENDPOINT"] || "";
  const storageAccountResourceId = process.env["STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const receivedShareId = "35E28F0E-DEA4-472F-84E4-5F1E45FB9937";
  const options = {
    body: {
      properties: {
        displayName: "updatedReceivedShareNameAdls",
        sink: {
          properties: {
            containerName: "receivingContainerAbc",
            folder: "receivingFolderAbc",
            mountPath: "pathAbc",
          },
          storeKind: "AdlsGen2Account",
          storeReference: {
            type: "ArmResourceReference",
            referenceName: storageAccountResourceId,
          },
        },
      },
      shareKind: "InPlace",
    },
  };

  const initialResponse = await client
    .path("/receivedShares/{receivedShareId}", receivedShareId)
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main() {
  createOrReplaceReceivedShareForBlobAssets();
  createOrReplaceReceivedShareForAdlsGen2Assets();
}

main().catch(console.error);
