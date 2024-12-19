// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how get a specific update version
 *
 * @summary Demonstrates the use of a DeviceUpdateClient to get a specific update version in Device Update for IoT Hub.
 */

import DeviceUpdate, { isUnexpected } from "@azure-rest/iot-device-update";
import { DefaultAzureCredential } from "@azure/identity";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== Get update ==");
  const provider = process.env["DEVICEUPDATE_UPDATE_PROVIDER"] || "";
  const name = process.env["DEVICEUPDATE_UPDATE_NAME"] || "";
  const version = process.env["DEVICEUPDATE_UPDATE_VERSION"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);

  console.log(
    "Get update data for provider '" +
      provider +
      "', name '" +
      name +
      "' and version '" +
      version +
      "'...",
  );
  const updateResult = await client
    .path(
      "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}",
      instanceId,
      provider,
      name,
      version,
    )
    .get();

  if (isUnexpected(updateResult)) {
    throw updateResult.body;
  }

  if (updateResult.status === "304") {
    console.log("no change");
    return;
  }

  console.log("Update:");
  console.log("  Provider: " + updateResult.body.updateId.provider);
  console.log("  Name: " + updateResult.body.updateId.name);
  console.log("  Version: " + updateResult.body.updateId.version);
  console.log("Metadata:");
  console.log(updateResult.body);

  console.log("\nEnumerate update files:");
  const filesResult = await client
    .path(
      "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files",
      instanceId,
      provider,
      name,
      version,
    )
    .get();

  if (isUnexpected(filesResult)) {
    throw filesResult.body;
  }
  filesResult.body.value.forEach((file: string) => {
    console.log(file);
  });

  console.log("\nGet file data:");
  filesResult.body.value.forEach(async (fileId: string) => {
    const fileResult = await client
      .path(
        "/deviceUpdate/{instanceId}/updates/providers/{provider}/names/{name}/versions/{version}/files/{fileId}",
        instanceId,
        provider,
        name,
        version,
        fileId,
      )
      .get();

    if (isUnexpected(fileResult)) {
      throw fileResult.body;
    }

    if (fileResult.status === "304") {
      console.log("no change");
      return;
    }

    console.log("File:");
    console.log("  FileId: " + fileResult.body.fileId);
    console.log("Metadata:");
    console.log(fileResult.body);
  });
}

main().catch(console.error);
