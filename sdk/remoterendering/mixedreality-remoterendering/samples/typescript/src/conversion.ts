// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates using the Remote Rendering SDK to convert an asset.
 */

import {
  RemoteRenderingClient
} from "@azure/mixedreality-remoterendering";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const accountDomain = process.env["REMOTE_RENDERING_ARR_ACCOUNT_DOMAIN"] || "<account domain>";
const accountId = process.env["REMOTE_RENDERING_ARR_ACCOUNT_ID"] || "<account ID>";
const accountKey = process.env["REMOTE_RENDERING_ARR_ACCOUNT_KEY"] || "<account key>";
const serviceEndpoint = process.env["REMOTE_RENDERING_ARR_SERVICE_ENDPOINT"] || "<serviceEndpoint>";
const storageAccountName = process.env["REMOTE_RENDERING_ARR_STORAGE_ACCOUNT_NAME"] || "<storageAccountName>";
const blobContainerName = process.env["REMOTE_RENDERING_ARR_BLOB_CONTAINER_NAME"] || "<blobStorageName>";
const sasToken = process.env["REMOTE_RENDERING_ARR_SAS_TOKEN"] || "<sasToken>";

export async function main() {
  console.log("== Alternative Document Input Objects Sample ==");

  const client = new RemoteRenderingClient();
}
