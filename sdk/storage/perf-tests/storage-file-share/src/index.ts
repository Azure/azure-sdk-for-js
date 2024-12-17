// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageFileShareDownloadTest } from "./download.spec.js";
import { StorageFileShareDownloadToFileTest } from "./downloadToFile.spec.js";
import { StorageFileShareUploadTest } from "./upload.spec.js";
import { StorageFileShareUploadFromFileTest } from "./uploadFromFile.spec.js";

const perfProgram = createPerfProgram(
  StorageFileShareDownloadTest,
  StorageFileShareDownloadToFileTest,
  StorageFileShareUploadTest,
  StorageFileShareUploadFromFileTest,
);

perfProgram.run();
