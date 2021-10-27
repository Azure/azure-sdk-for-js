// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { StorageFileShareDownloadTest } from "./download.spec";
import { StorageFileShareDownloadToFileTest } from "./downloadToFile.spec";
import { StorageFileShareUploadTest } from "./upload.spec";
import { StorageFileShareUploadFromFileTest } from "./uploadFromFile.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([
    StorageFileShareDownloadTest,
    StorageFileShareDownloadToFileTest,
    StorageFileShareUploadTest,
    StorageFileShareUploadFromFileTest
  ])
);

perfProgram.run();
