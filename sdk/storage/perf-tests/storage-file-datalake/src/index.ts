// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageDFSAppendTest } from "./append.spec.js";
import { StorageDFSReadTest } from "./read.spec.js";
import { StorageDFSUploadTest } from "./upload.spec.js";
import { StorageDFSUploadFromFileTest } from "./uploadFromFile.spec.js";

const perfProgram = createPerfProgram(
  StorageDFSAppendTest,
  StorageDFSReadTest,
  StorageDFSUploadTest,
  StorageDFSUploadFromFileTest,
);

perfProgram.run();
