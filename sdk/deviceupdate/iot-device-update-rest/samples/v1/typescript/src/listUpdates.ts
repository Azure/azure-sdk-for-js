// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a list of available updates
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to list all updates in Device Update for IoT Hub.
 */

import DeviceUpdate, { isUnexpected, paginate } from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== List updates ==");
  const provider = process.env["DEVICEUPDATE_UPDATE_PROVIDER"] || "";
  const name = process.env["DEVICEUPDATE_UPDATE_NAME"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  console.log("List providers, names and versions of updates in Device Update for IoT Hub...");

  console.log("\nProviders:");
  const providersResult = await client
    .path("/deviceUpdate/{instanceId}/updates/providers", instanceId)
    .get();

  if (isUnexpected(providersResult)) {
    throw providersResult.body;
  }

  const providers = paginate(client, providersResult);
  for await (const provider of providers) {
    console.log(provider);
  }

  console.log("\nNames in provider '" + provider + "':");
  const namesResult = await client
    .path("/deviceUpdate/{instanceId}/updates/providers/{provider}/names", instanceId, provider)
    .get();

  if (isUnexpected(namesResult)) {
    throw namesResult.body;
  }

  const names = paginate(client, namesResult);
  for await (const name of names) {
    console.log(name);
  }

  console.log("\nVersions in provider '" + provider + "' and name '" + name + "':");
  const versionsResult = await client
    .path(
      "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions",
      instanceId,
      provider,
      name,
    )
    .get();

  if (isUnexpected(versionsResult)) {
    throw versionsResult.body;
  }

  const versions = paginate(client, versionsResult);
  for await (const version of versions) {
    console.log(version);
  }
}

main().catch(console.error);
