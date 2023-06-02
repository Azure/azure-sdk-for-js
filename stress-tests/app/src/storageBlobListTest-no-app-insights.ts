// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { delay } from "@azure/core-util";
// Expects the .env file at the same level
import * as dotenv from "dotenv";
import { Buffer } from "buffer";
dotenv.config();
dotenv.config({ path: process.env.ENV_FILE || ".env" });

let loops = 0;
let testDurationInSeconds = 20 * 24 * 60 * 60;
let globalCount = 0; // number of storageBlobs listed
const startedAt = new Date();

async function main() {
  const credential = new DefaultAzureCredential();
  const client = new BlobServiceClient(process.env["AZURE_STORAGE_ENDPOINT"] || "", credential);
  const containerName = `test` + new Date().valueOf()
  await client.createContainer(containerName);
  const containerClient = client.getContainerClient(containerName);
  for (let i = 0; i < 20; i++) {
    const blobClient = containerClient.getBlockBlobClient("blob" + i);
    await blobClient.uploadData(Buffer.from("content" + i));
  }
  console.log(`ElapsedTime\t\tArrayBuffers\t\tRSS\t\tHeapUsed\t\tloops\t\tglobalCount`);
  while ((new Date().valueOf() - startedAt.valueOf()) < testDurationInSeconds * 1000) {
    let iterable = client.getContainerClient(containerName).listBlobsFlat().byPage({ maxPageSize: 3 });
    let count = 0
    for await (const element of iterable) {
      count += element.segment.blobItems.length;
    }
    loops++;
    globalCount = count
    await delay(5000)
  }
}

main().catch((err) => {
  throw new Error("Failed to run sample:" + err.message);
});

function snapshot() {
  const elapsedTimeInSeconds = (new Date().valueOf() - startedAt.valueOf()) / 1000;
  const eventProperties: Record<string, number> = {}
  const { arrayBuffers, rss, heapUsed } = process.memoryUsage()
  eventProperties["elapsedTimeInSeconds"] = elapsedTimeInSeconds;
  eventProperties["memory.arrayBuffers"] = arrayBuffers;
  eventProperties["memory.rss"] = rss;
  eventProperties["memory.heapUsed"] = heapUsed;
  eventProperties["loops"] = loops;
  eventProperties["globalCount"] = globalCount;
  console.log(`${elapsedTimeInSeconds}\t\t${arrayBuffers}\t\t${rss}\t\t${heapUsed}\t\t${loops}\t\t${globalCount}`);
}

setInterval(() => { snapshot() }, 5000)
