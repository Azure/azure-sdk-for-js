// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { StorageFileShareDownloadTest } from "./download.spec";
import { StorageFileShareDownloadToFileTest } from "./downloadToFile.spec";
import { StorageFileShareUploadTest } from "./upload.spec";
import { StorageFileShareUploadFromFileTest } from "./uploadFromFile.spec";
import { StorageDirGetPropertiesTest } from "./getDirProperties.spec";
import { StorageFileGetPropertiesTest } from "./getFileProperties.spec";
import { StorageShareGetPropertiesTest } from "./getShareProperties.spec";
import { StorageServiceGetPropertiesTest } from "./getServiceProperties.spec";

const perfProgram = createPerfProgram(
  StorageFileShareDownloadTest,
  StorageFileShareDownloadToFileTest,
  StorageFileShareUploadTest,
  StorageFileShareUploadFromFileTest,
  StorageDirGetPropertiesTest,
  StorageFileGetPropertiesTest,
  StorageShareGetPropertiesTest,
  StorageServiceGetPropertiesTest
);

perfProgram.run();
