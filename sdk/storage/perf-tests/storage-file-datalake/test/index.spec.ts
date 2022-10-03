// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { StorageDFSAppendTest } from "./append.spec";
import { StorageDFSReadTest } from "./read.spec";
import { StorageDFSUploadTest } from "./upload.spec";
import { StorageDFSUploadFromFileTest } from "./uploadFromFile.spec";

const perfProgram = createPerfProgram(
  StorageDFSAppendTest,
  StorageDFSReadTest,
  StorageDFSUploadTest,
  StorageDFSUploadFromFileTest
);

perfProgram.run();
