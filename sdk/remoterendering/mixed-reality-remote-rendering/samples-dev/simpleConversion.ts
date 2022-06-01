// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using the Azure Remote Rendering SDK to convert an asset.
 */

/// <reference lib="esnext.asynciterable" />

import { v4 as uuid } from "uuid";

import {
  RemoteRenderingClient,
  AssetConversionInputSettings,
  AssetConversionOutputSettings,
  AssetConversionSettings,
  AssetConversionPollerLike,
  AssetConversion,
} from "@azure/mixed-reality-remote-rendering";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set this environment variables or edit the following values
const accountDomain = process.env["REMOTERENDERING_ARR_ACCOUNT_DOMAIN"] || "<account domain>";
const accountId = process.env["REMOTERENDERING_ARR_ACCOUNT_ID"] || "<account ID>";
const accountKey = process.env["REMOTERENDERING_ARR_ACCOUNT_KEY"] || "<account key>";
const serviceEndpoint = process.env["REMOTERENDERING_ARR_SERVICE_ENDPOINT"] || "<serviceEndpoint>";
const storageAccountName =
  process.env["REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME"] || "<storageAccountName>";
const blobContainerName =
  process.env["REMOTERENDERING_ARR_BLOB_CONTAINER_NAME"] || "<blobStorageName>";

export async function main() {
  console.log("== Convert an asset example ==");

  console.log("== Creating a client ==");

  let credential = new AzureKeyCredential(accountKey);

  const client = new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);

  let storageContainerUrl =
    "https://" + storageAccountName + ".blob.core.windows.net/" + blobContainerName;

  console.log("== Starting the conversion ==");

  const inputSettings: AssetConversionInputSettings = {
    storageContainerUrl,
    relativeInputAssetPath: "box.fbx",
  };
  const outputSettings: AssetConversionOutputSettings = {
    storageContainerUrl,
  };
  const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

  // A randomly generated UUID is a good choice for a conversionId.
  const conversionId = uuid();

  const conversionPoller: AssetConversionPollerLike = await client.beginConversion(
    conversionId,
    conversionSettings
  );

  console.log("== Polling ==");

  const conversion: AssetConversion = await conversionPoller.pollUntilDone();

  console.log("== Check results ==");

  if (conversion.status === "Succeeded") {
    console.log("Conversion succeeded: Output written to " + conversion.output?.outputAssetUrl);
  } else if (conversion.status === "Failed") {
    console.log("Conversion failed: " + conversion.error.code + " " + conversion.error.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
