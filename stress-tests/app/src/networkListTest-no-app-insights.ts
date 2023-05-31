// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import heapdump from "heapdump";
import * as fs from "fs-extra";
// Expects the .env file at the same level
import * as dotenv from "dotenv";

dotenv.config({ path: process.env.ENV_FILE || ".env" });

let loops = 0;
let testDurationInSeconds = 20 * 24 * 60 * 60;
let globalCount = 0; // number of network interfaces listed
const startedAt = new Date();

async function main() {
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, process.env["AZURE_SUBSCRIPTION_ID"] || "");
  console.log("TimeElapsed\t\tMemory.arrayBuffers\t\tMemory.rss\t\tMemory.heapUsed\t\tLoops\t\tGlobalCount");
  while ((new Date().valueOf() - startedAt.valueOf()) < testDurationInSeconds * 1000) {
    let iterable = client.networkInterfaces.list(process.env["AZURE_RESOURCE_GROUP"] || "");
    let count = 0
    for await (const _element of iterable) {
      // console.log(count, loops)
      count++;
    }
    loops++;
    globalCount = count
  }
}

main().catch((err) => {
  throw new Error("Failed to run sample:" + err.message);
});

function snapshot() {
  // console.log("Taking snapshot");
  const elapsedTimeInSeconds = (new Date().valueOf() - startedAt.valueOf()) / 1000;
  generateHeapDump(elapsedTimeInSeconds);
  const eventProperties: Record<string, number> = {}
  const { arrayBuffers, rss, heapUsed } = process.memoryUsage()
  eventProperties["elapsedTimeInSeconds"] = elapsedTimeInSeconds;
  eventProperties["memory.arrayBuffers"] = arrayBuffers;
  eventProperties["memory.rss"] = rss;
  eventProperties["memory.heapUsed"] = heapUsed;
  eventProperties["loops"] = loops;
  eventProperties["globalCount"] = globalCount;
  console.log(`${elapsedTimeInSeconds}\t\t${arrayBuffers}\t\t${rss}\t\t${heapUsed}\t\t${loops}\t\t${globalCount}`)
}

setInterval(() => { snapshot() }, 2 * 60 * 1000)


export function generateHeapDump(secondsElapsed: number) {
  try {
    if (global.gc) { global.gc(); }
  } catch (e) {
    console.log("`Run with --expose-gc flag`");
    process.exit();
  }
  fs.ensureDirSync("./dumps");
  // console.log("Generating heap dump");
  heapdump.writeSnapshot(`./dumps/dump-${Math.floor(secondsElapsed)}.heapsnapshot`);
  // console.log("Heap dump generated");
}
