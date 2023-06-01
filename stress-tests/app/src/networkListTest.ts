// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as appInsights from "applicationinsights";
import util from "util";
// Expects the .env file at the same level
import * as dotenv from "dotenv";

dotenv.config({ path: process.env.ENV_FILE || ".env" });

appInsights.setup().setAutoCollectConsole(true).setUseDiskRetryCaching(true).start();

export const defaultClientAppInsights = appInsights.defaultClient;
let loops = 0;
let testDurationInSeconds = 20 * 24 * 60 * 60;
let globalCount = 0; // number of network interfaces listed
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
  const client = new NetworkManagementClient(credential, process.env["AZURE_SUBSCRIPTION_ID"] || "");
  defaultClientAppInsights.commonProperties = {
    // these will be reported with each event
    testName: "networkListTest",
  };

  defaultClientAppInsights.trackEvent({
    name: "pre-listing",
    properties: {
      testName: "networkListTest",
    },
  });
  while ((new Date().valueOf() - startedAt.valueOf()) < testDurationInSeconds * 1000) {
    let iterable = client.networkInterfaces.list(process.env["AZURE_RESOURCE_GROUP"] || "");
    let count = 0
    for await (const _element of iterable) {
      // console.log(element.id)
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
