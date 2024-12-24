// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how import a device update to Device Update for IoT Hub.
 *
 * @summary Demonstrates the use of a Update Import.
 */

import DeviceUpdate, { getLongRunningPoller, isUnexpected } from "@azure-rest/iot-device-update";
import { readFileSync, statSync } from "fs";

import { DefaultAzureCredential } from "@azure/identity";
import { computeSha256Hash } from "@azure/core-util";
import dotenv from "dotenv";
import { parse } from "path";

dotenv.config();

const endpoint = process.env["ENDPOINT"] || "";
const instanceId = process.env["INSTANCE_ID"] || "";

async function main() {
  console.log("== Import update ==");
  const payloadFile = process.env["DEVICEUPDATE_PAYLOAD_FILE"] || "";
  const payloadUrl = process.env["DEVICEUPDATE_PAYLOAD_URL"] || "";
  const manifestFile = process.env["DEVICEUPDATE_MANIFEST_FILE"] || "";
  const manifestUrl = process.env["DEVICEUPDATE_MANIFEST_URL"] || "";

  const credentials = new DefaultAzureCredential();

  const client = DeviceUpdate(endpoint, credentials);
  const sha256 = await getFileHash(manifestFile);
  const sizeInBytes = getFileSize(manifestFile);
  const filename = getFileName(payloadFile);

  const initialResponse = await client
    .path("/deviceUpdate/{instanceId}/updates:import", instanceId)
    .post({
      body: [
        {
          importManifest: {
            hashes: {
              sha256: sha256,
            },
            sizeInBytes,
            url: manifestUrl,
          },
          files: [
            {
              filename: filename,
              url: payloadUrl,
            },
          ],
        },
      ],
    });

  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();

  if (isUnexpected(result)) {
    throw result.body.error;
  }

  console.log(result.body);
  console.log(`Import succeeded!`);
}

function getFileSize(filePath: string) {
  const stats = statSync(filePath);
  return stats.size;
}

function getFileName(filePath: string) {
  const fileName = parse(filePath).base;
  return fileName;
}

function getFileHash(filePath: string) {
  const fileContent = readFileSync(filePath, { encoding: "utf8" });
  return computeSha256Hash(fileContent, "base64");
}

main().catch(console.error);
