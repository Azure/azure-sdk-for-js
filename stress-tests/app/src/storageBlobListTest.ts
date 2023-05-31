// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import * as appInsights from "applicationinsights";
import util from "util";
// Expects the .env file at the same level
import * as dotenv from "dotenv";
import { delay } from "@azure/core-util";

dotenv.config({ path: process.env.ENV_FILE || ".env" });

appInsights.setup().setAutoCollectConsole(true).setUseDiskRetryCaching(true).start();

export const defaultClientAppInsights = appInsights.defaultClient;
let loops = 0;
let testDurationInSeconds = 20 * 24 * 60 * 60;
let globalCount = 0; // number of storageBlobs listed
const startedAt = new Date();

export function captureConsoleOutputToAppInsights() {
  const debug = require("debug");

  debug.log = (...args: any[]) => {
    // for some reason the appinsights console.log hook doesn't seem to be firing for me (or at least
    // it's inconsistent). For now I'll just add a hook in here and send the events myself.
    defaultClientAppInsights.trackTrace({
      message: util.format(...args),
    });
  };
}

async function main() {
  const credential = new DefaultAzureCredential();
  const client = new BlobServiceClient(process.env["AZURE_STORAGE_CONNECTION_STRING"] || "", credential);
  await client.createContainer("test");
  const containerClient = client.getContainerClient("test");
  for (let i = 0; i < 20; i++) {
    const blobClient = containerClient.getBlockBlobClient("blob" + i);
    await blobClient.uploadData("content" + i);
  }
  defaultClientAppInsights.commonProperties = {
    // these will be reported with each event
    testName: "storageBlobListTest",
  };

  defaultClientAppInsights.trackEvent({
    name: "pre-listing",
    properties: {
      testName: "storageBlobListTest",
    },
  });
  while ((new Date().valueOf() - startedAt.valueOf()) < testDurationInSeconds * 1000) {
    try {
      let iterable = client.getContainerClient("test").listBlobsFlat().byPage({ maxPageSize: 3 });
      let count = 0
      for await (const element of iterable) {
        count += element.segment.blobItems.length;
      }
      loops++;
      globalCount = count
    } catch (error) {
      defaultClientAppInsights.trackException({
        exception: { message: (error as Error)!.message, name: (error as Error)!.name }, time: new Date()
      });
      await delay(10000);
    }
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
  defaultClientAppInsights.trackEvent({
    name: "summary",
    properties: eventProperties
  });
  defaultClientAppInsights.flush();
}

setInterval(() => { snapshot() }, 5000)
