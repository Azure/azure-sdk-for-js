// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import createPurviewSharingClient from "@azure-rest/purview-sharing";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Get a sent share
 *
 * @summary Get a sent share
 */
async function getSentShare() {
  const endpoint = process.env["ENDPOINT"] || "";

  const credential = new DefaultAzureCredential();
  const client = createPurviewSharingClient(endpoint, credential);

  const sentShareId = "FF4A2AAE-8755-47BB-9C00-A774B5A7006E";
  const result = await client.path("/sentShares/{sentShareId}", sentShareId).get();
  console.log(result);
}

async function main() {
  getSentShare();
}

main().catch(console.error);
