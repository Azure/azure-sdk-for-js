// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageBlobDownloadTest } from "./download.spec.js";
import { StorageBlobUploadTest } from "./upload.spec.js";
import { StorageBlobUploadFileTest } from "./uploadFromFile.spec.js";
import { StorageBlobListTest } from "./listBlobs.spec.js";
import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec.js";
import { CoreHTTPSDownloadWithSASTest } from "./core-rest-pipeline.spec.js";

const perfProgram = createPerfProgram(
  StorageBlobDownloadTest,
  StorageBlobUploadTest,
  StorageBlobUploadFileTest,
  StorageBlobListTest,
  StorageBlobDownloadWithSASTest,
  CoreHTTPSDownloadWithSASTest,
);

perfProgram.run();
