// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageFileShareDownloadTest } from "./download.spec";
import { StorageFileShareUploadTest } from "./upload.spec";

const perfProgram = createPerfProgram(StorageFileShareDownloadTest, StorageFileShareUploadTest);

perfProgram.run();
