// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { StorageBlobDownloadTest } from "./download.spec";
import { StorageBlobUploadTest } from "./upload.spec";
import { StorageBlobUploadFileTest } from "./uploadFromFile.spec";
import { StorageBlobListTest } from "./listBlobs.spec";
import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { CoreHTTPDownloadWithSASTest } from "./core-http.spec";
import { NodeFetchDownloadWithSASTest } from "./node-fetch.spec";
import { CoreHTTPSDownloadWithSASTest } from "./core-rest-pipeline.spec";

const perfProgram = createPerfProgram(
  StorageBlobDownloadTest,
  StorageBlobUploadTest,
  StorageBlobUploadFileTest,
  StorageBlobListTest,
  StorageBlobDownloadWithSASTest,
  CoreHTTPDownloadWithSASTest,
  CoreHTTPSDownloadWithSASTest,
  NodeFetchDownloadWithSASTest
);

perfProgram.run();
