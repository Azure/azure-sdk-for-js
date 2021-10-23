// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { StorageFileShareDownloadTest } from "./download.spec";
import { StorageFileShareUploadTest } from "./upload.spec";
console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([StorageFileShareDownloadTest, StorageFileShareUploadTest])
);

perfProgram.run();
