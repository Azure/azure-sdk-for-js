// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { main as advancedMain } from "./advanced";
import { main as anonymousCredMain } from "./anonymousCred";
import { main as azureAdAuthMain } from "./azureAdAuth";
import { main as basicMain } from "./basic";
import { main as customizedClientHeadersMain } from "./customizedClientHeaders";
import { main as customPipelineMain } from "./customPipeline";
import { main as errorsAndResponsesMain } from "./errorsAndResponses";
import { main as iteratorsBlobsHierarchyMain } from "./iterators-blobs-hierarchy";
import { main as iteratorsBlobsMain } from "./iterators-blobs";
import { main as iteratorsContainersMain } from "./iterators-containers";
// import { main as proxyAuthMain } from "./proxyAuth";
import { main as readingSnapshotMain } from "./readingSnapshot";
import { main as sharedKeyCredMain } from "./sharedKeyCred";
import { main as withConnStringMain } from "./withConnString";

import { config as dotenv } from "dotenv";
dotenv();

const samples: Array<[string, () => Promise<void>]> = [
  ["advanced", advancedMain],
  ["anonymousCred", anonymousCredMain],
  ["azureAdAuth", azureAdAuthMain],
  ["basic", basicMain],
  ["customizedClientHeaders", customizedClientHeadersMain],
  ["customPipeline", customPipelineMain],
  ["errorsAndResponses", errorsAndResponsesMain],
  ["iterators-blobs-hierarchy", iteratorsBlobsHierarchyMain],
  ["iterators-blobs", iteratorsBlobsMain],
  ["iterators-containers", iteratorsContainersMain],
  // ["proxyAuth", proxyAuthMain], // Requires a proxy
  ["readingSnapshot", readingSnapshotMain],
  ["sharedKeyCred", sharedKeyCredMain],
  ["withConnString", withConnStringMain]
];

async function main() {
  for (let [sampleName, sampleMain] of samples) {
    console.log("[samples] Running sample", sampleName);
    await sampleMain();
  }
}

main().catch((error) => {
  console.error("[samples] An error occurred:", error);
  process.exit(1);
});
