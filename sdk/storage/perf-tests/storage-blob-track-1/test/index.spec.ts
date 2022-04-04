// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { StorageBlobDownloadTest } from "./download.spec";
import { StorageBlobUploadTest } from "./upload.spec";
import { StorageBlobListTest } from "./listBlobs.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([StorageBlobDownloadTest, StorageBlobUploadTest, StorageBlobListTest])
);

perfProgram.run();
