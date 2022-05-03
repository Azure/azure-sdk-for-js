// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { StorageBlobDownloadTest } from "./download.spec";
import { StorageBlobUploadTest } from "./upload.spec";
import { StorageBlobListTest } from "./listBlobs.spec";

const perfProgram = createPerfProgram(
  StorageBlobDownloadTest,
  StorageBlobUploadTest,
  StorageBlobListTest
);

perfProgram.run();
