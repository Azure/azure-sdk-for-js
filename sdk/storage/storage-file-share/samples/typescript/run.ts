// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { main as advancedMain } from "./dist/advanced";
import { main as anonymousCredMain } from "./dist/anonymousCred";
import { main as basicMain } from "./dist/basic";
import { main as customPipelineMain } from "./dist/customPipeline";
import { main as iteratorsFilesAndDirectoriesMain } from "./dist/iterators-files-and-directories";
// import { main as iteratorsHandlesMain } from "./dist/iterators-handles";
import { main as iteratorsSharesMain } from "./dist/iterators-shares";
// import { main as proxyAuthMain } from "./dist/proxyAuth";
import { main as sharedKeyCredMain } from "./dist/sharedKeyCred";
import { main as withConnStringMain } from "./dist/withConnString";

const samples: Array<[string, () => Promise<void>]> = [
  ["advanced", advancedMain],
  ["anonymousCred", anonymousCredMain],
  ["basic", basicMain],
  ["customPipeline", customPipelineMain],
  ["iterators-files-and-directories", iteratorsFilesAndDirectoriesMain],
  // ["iterators-handles", iteratorsHandlesMain],
  ["iterators-shares", iteratorsSharesMain],
  // ["proxyAuth", proxyAuthMain],
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
