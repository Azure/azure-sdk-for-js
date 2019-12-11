// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { main: advancedMain } = require("./advanced");
const { main: anonymousCredMain } = require("./anonymousCred");
const { main: azureAdAuthMain } = require("./azureAdAuth");
const { main: basicMain } = require("./basic");
const { main: customizedClientHeadersMain } = require("./customizedClientHeaders");
const { main: customPipelineMain } = require("./customPipeline");
const { main: errorsAndResponsesMain } = require("./errorsAndResponses");
const { main: iteratorsBlobsHierarchyMain } = require("./iterators-blobs-hierarchy");
const { main: iteratorsBlobsMain } = require("./iterators-blobs");
const { main: iteratorsContainersMain } = require("./iterators-containers");
// const { main: proxyAuthMain } = require("./proxyAuth");
const { main: readingSnapshotMain } = require("./readingSnapshot");
const { main: sharedKeyCredMain } = require("./sharedKeyCred");
const { main: withConnStringMain } = require("./withConnString");

const { config: dotenv } = require("dotenv");
dotenv();

const samples = [
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
