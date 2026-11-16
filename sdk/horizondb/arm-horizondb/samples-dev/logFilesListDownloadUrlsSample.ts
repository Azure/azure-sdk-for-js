// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a short-lived signed URL for downloading a captured log file. The signed URL is returned only by this action so routine resource GET and LIST responses do not expose bearer credentials.
 *
 * @summary gets a short-lived signed URL for downloading a captured log file. The signed URL is returned only by this action so routine resource GET and LIST responses do not expose bearer credentials.
 * x-ms-original-file: 2026-10-01-preview/LogFiles_ListDownloadUrls.json
 */
async function listASignedURLForDownloadingACapturedLogFile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.logFiles.listDownloadUrls(
    "example-resource-group",
    "example-cluster",
    "22222222-2222-2222-2222-222222222222",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listASignedURLForDownloadingACapturedLogFile();
}

main().catch(console.error);
