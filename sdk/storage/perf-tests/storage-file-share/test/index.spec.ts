// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { StorageFileShareDownloadTest } from "./download.spec";
import { StorageFileShareDownloadToFileTest } from "./downloadToFile.spec";
import { StorageFileShareUploadTest } from "./upload.spec";
import { StorageFileShareUploadFromFileTest } from "./uploadFromFile.spec";

const perfProgram = createPerfProgram(
  StorageFileShareDownloadTest,
  StorageFileShareDownloadToFileTest,
  StorageFileShareUploadTest,
  StorageFileShareUploadFromFileTest
);

perfProgram.run();
