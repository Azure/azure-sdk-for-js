// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { StorageBlobDownloadTest } from "./download.spec";
import { StorageBlobUploadTest } from "./upload.spec";
import { StorageBlobUploadFileTest } from "./uploadFromFile.spec";
import { StorageBlobListTest } from "./listBlobs.spec";
import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { CoreHTTPSDownloadWithSASTest } from "./core-rest-pipeline.spec";

const perfProgram = createPerfProgram(
  StorageBlobDownloadTest,
  StorageBlobUploadTest,
  StorageBlobUploadFileTest,
  StorageBlobListTest,
  StorageBlobDownloadWithSASTest,
  CoreHTTPSDownloadWithSASTest,
);

perfProgram.run();
