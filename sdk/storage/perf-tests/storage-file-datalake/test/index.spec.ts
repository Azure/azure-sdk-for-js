// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageDFSAppendTest } from "./append.spec";
import { StorageDFSReadTest } from "./read.spec";
import { StorageDFSUploadTest } from "./upload.spec";
import { StorageDFSUploadFromFileTest } from "./uploadFromFile.spec";

const perfProgram = createPerfProgram(
  StorageDFSAppendTest,
  StorageDFSReadTest,
  StorageDFSUploadTest,
  StorageDFSUploadFromFileTest,
);

perfProgram.run();
