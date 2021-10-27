// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { StorageDFSAppendTest } from "./append.spec";
import { StorageDFSReadTest } from "./read.spec";
import { StorageDFSUploadTest } from "./upload.spec";
import { StorageDFSUploadFromFileTest } from "./uploadFromFile.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([
    StorageDFSAppendTest,
    StorageDFSReadTest,
    StorageDFSUploadTest,
    StorageDFSUploadFromFileTest
  ])
);

perfProgram.run();
