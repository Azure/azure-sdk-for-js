// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { StorageDFSAppendTest } from "./append.spec";
import { StorageDFSReadTest } from "./read.spec";
import { StorageDFSUploadTest } from "./upload.spec";
import { StorageDFSUploadFromFileTest } from "./uploadFromFile.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    StorageDFSAppendTest,
    StorageDFSReadTest,
    StorageDFSUploadTest,
    StorageDFSUploadFromFileTest
  ])
);

perfStressProgram.run();
