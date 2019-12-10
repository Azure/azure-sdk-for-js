// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { main: advancedMain } = require("./advanced");
const { main: anonymousCredMain } = require("./anonymousCred");
const { main: basicMain } = require("./basic");
const { main: customPipelineMain } = require("./customPipeline");
const { main: iteratorsFilesAndDirectoriesMain } = require("./iterators-files-and-directories");
// const { main: iteratorsHandlesMain } = require("./iterators-handles");
const { main: iteratorsSharesMain } = require("./iterators-shares");
// const { main: proxyAuthMain } = require("./proxyAuth");
const { main: sharedKeyCredMain } = require("./sharedKeyCred");
const { main: withConnStringMain } = require("./withConnString");

const { config: dotenv } = require("dotenv");
dotenv();

const samples = [
  ["advanced", advancedMain],
  ["anonymousCred", anonymousCredMain],
  ["basic", basicMain],
  ["customPipeline", customPipelineMain],
  ["iterators-files-and-directories", iteratorsFilesAndDirectoriesMain],
  // ["iterators-handles", iteratorsHandlesMain], // Must be populated with a pre-existing share/directory name to run
  ["iterators-shares", iteratorsSharesMain],
  // ["proxyAuth", proxyAuthMain], // Requires a proxy
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
