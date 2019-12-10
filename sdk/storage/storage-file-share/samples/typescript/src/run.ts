// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { main as advancedMain } from "./advanced";
import { main as anonymousCredMain } from "./anonymousCred";
import { main as basicMain } from "./basic";
import { main as customPipelineMain } from "./customPipeline";
import { main as iteratorsFilesAndDirectoriesMain } from "./iterators-files-and-directories";
// import { main as iteratorsHandlesMain } from "./iterators-handles";
import { main as iteratorsSharesMain } from "./iterators-shares";
// import { main as proxyAuthMain } from "./proxyAuth";
import { main as sharedKeyCredMain } from "./sharedKeyCred";
import { main as withConnStringMain } from "./withConnString";

import { config as dotenv } from "dotenv";
dotenv();

const samples: Array<[string, () => Promise<void>]> = [
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
