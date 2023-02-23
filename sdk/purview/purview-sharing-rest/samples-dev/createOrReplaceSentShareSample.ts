// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient, {
  SentSharesCreateOrReplaceParameters,
  getLongRunningPoller,
} from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or replace a sent share
 *
 * @summary Create or replace a sent share
 */
async function createOrReplaceSentShareForBlobAssets() {
  const endpoint = process.env["ENDPOINT"] || "";
  const storageAccountResourceId = process.env["STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const options: SentSharesCreateOrReplaceParameters = {
    body: {
      properties: {
        description: "description",
        artifact: {
          properties: {
            paths: [
              {
                containerName: "container1",
                receiverPath: "SharedFile.txt",
                senderPath: "directory/file.txt",
              },
            ],
          },
          storeKind: "AdlsGen2Account",
          storeReference: {
            type: "ArmResourceReference",
            referenceName: storageAccountResourceId,
          },
        },
        displayName: "sentShare1",
      },
      shareKind: "InPlace",
    },
  };

  const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

/**
 * This sample demonstrates how to Create or replace a sent share
 *
 * @summary Create or replace a sent share
 */
async function createOrReplaceSentShareForAdlsGen2Assets() {
  const endpoint = process.env["ENDPOINT"] || "";
  const storageAccountResourceId = process.env["STORAGE_ACCOUNT_RESOURCE_ID"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const options: SentSharesCreateOrReplaceParameters = {
    body: {
      properties: {
        description: "description",
        artifact: {
          properties: {
            paths: [
              {
                containerName: "container1",
                receiverPath: "SharedFile.txt",
                senderPath: "directory/file.txt",
              },
            ],
          },
          storeKind: "AdlsGen2Account",
          storeReference: {
            type: "ArmResourceReference",
            referenceName: storageAccountResourceId,
          },
        },
        displayName: "sentShare1",
      },
      shareKind: "InPlace",
    },
  };

  const initialResponse = await client.path("/sentShares/{sentShareId}", sentShareId).put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

async function main() {
  createOrReplaceSentShareForBlobAssets();
  createOrReplaceSentShareForAdlsGen2Assets();
}

main().catch(console.error);
