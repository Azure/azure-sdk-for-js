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
  AssetConversion
} from "@azure/mixed-reality-remote-rendering";
import {
  DeviceCodeCredential,
  DeviceCodeInfo,
  ClientSecretCredential,
  DefaultAzureCredential
} from "@azure/identity";
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
// Fall back to the same storage account.
const storageAccountName2 =
  process.env["REMOTERENDERING_ARR_STORAGE_ACCOUNT_NAME2"] || storageAccountName;
// Fall back to the same blob container.
const blobContainerName2 =
  process.env["REMOTERENDERING_ARR_BLOB_CONTAINER_NAME2"] || blobContainerName;

const tenantId = process.env["REMOTERENDERING_TENANT_ID"] || "<tenantId>";
const clientId = process.env["REMOTERENDERING_CLIENT_ID"] || "<clientId>";
const clientSecret = process.env["REMOTERENDERING_CLIENT_SECRET"] || "<clientSecret>";

export function getClientWithAccountKey() {
  const credential = new AzureKeyCredential(accountKey);

  return new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential);
}

export function getClientWithAAD() {
  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret, {
    authorityHost: "https://login.microsoftonline.com/" + tenantId
  });

  return new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential, {
    authenticationEndpointUrl: "https://sts.mixedreality.azure.com"
  });
}

export function getClientWithDeviceCode() {
  const userPromptCallback = (deviceCodeInfo: DeviceCodeInfo) => {
    console.debug(deviceCodeInfo.message);
    console.log(deviceCodeInfo.message);
  };

  const credential = new DeviceCodeCredential({
    tenantId: tenantId,
    clientId: clientId,
    userPromptCallback: userPromptCallback,
    authorityHost: "https://login.microsoftonline.com/" + tenantId
  });

  return new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential, {
    authenticationEndpointUrl: "https://sts.mixedreality.azure.com/mixedreality.signin"
  });
}

export function getClientWithDefaultAzureCredential() {
  const credential = new DefaultAzureCredential();

  return new RemoteRenderingClient(serviceEndpoint, accountId, accountDomain, credential, {
    authenticationEndpointUrl: "https://sts.mixedreality.azure.com"
  });
}

export async function main() {
  console.log("== Convert a more complex asset example ==");

  console.log("== Creating a client ==");

  const client = getClientWithAccountKey();

  const inputStorageUrl =
    "https://" + storageAccountName + ".blob.core.windows.net/" + blobContainerName;
  const outputStorageUrl =
    "https://" + storageAccountName2 + ".blob.core.windows.net/" + blobContainerName2;

  const inputSettings: AssetConversionInputSettings = {
    storageContainerUrl: inputStorageUrl,
    blobPrefix: "Bicycle",
    relativeInputAssetPath: "bicycle.gltf"
  };
  const outputSettings: AssetConversionOutputSettings = {
    storageContainerUrl: outputStorageUrl,
    blobPrefix: "ConvertedBicycle"
  };
  const conversionSettings: AssetConversionSettings = { inputSettings, outputSettings };

  const conversionId = uuid();

  const conversionPoller: AssetConversionPollerLike = await client.beginConversion(
    conversionId,
    conversionSettings
  );

  console.log("== Polling ==");

  const conversion: AssetConversion = await conversionPoller.pollUntilDone();

  console.log("== Check results ==");

  // Use a string for the enum.
  if (conversion.status === "Succeeded") {
    console.log("Conversion succeeded: Output written to " + conversion.output?.outputAssetUrl);
  } else if (conversion.status === "Failed") {
    console.log("Conversion failed: " + conversion.error.code + " " + conversion.error.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
