// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageBlobDownloadTest } from "./download.spec";
import { StorageBlobUploadTest } from "./upload.spec";
import { StorageBlobListTest } from "./listBlobs.spec";

const perfProgram = createPerfProgram(
  StorageBlobDownloadTest,
  StorageBlobUploadTest,
  StorageBlobListTest
);

perfProgram.run();
