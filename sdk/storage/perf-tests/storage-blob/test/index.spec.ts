// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { StorageBlobDownloadTest } from "./download.spec";
import { StorageBlobUploadTest } from "./upload.spec";
import { StorageBlobUploadFileTest } from "./uploadFromFile.spec";
import { StorageBlobListTest } from "./listBlobs.spec";
import { StorageBlobDownloadWithSASTest } from "./dowloadWithSAS.spec";
import { CoreHTTPDownloadWithSASTest } from "./core-http.spec";
import { NodeFetchDownloadWithSASTest } from "./node-fetch.spec";
import { CoreHTTPSDownloadWithSASTest } from "./core-https.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    StorageBlobDownloadTest,
    StorageBlobUploadTest,
    StorageBlobUploadFileTest,
    StorageBlobListTest,
    StorageBlobDownloadWithSASTest,
    CoreHTTPDownloadWithSASTest,
    CoreHTTPSDownloadWithSASTest,
    NodeFetchDownloadWithSASTest
  ])
);

perfStressProgram.run();
