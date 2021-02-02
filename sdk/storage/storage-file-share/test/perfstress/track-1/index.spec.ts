// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { StorageFileShareDownloadTest } from "./download.spec";
import { StorageFileShareUploadTest } from "./upload.spec";
console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([StorageFileShareDownloadTest, StorageFileShareUploadTest])
);

perfStressProgram.run();
