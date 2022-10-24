// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { UploadLogsTest } from "./uploadLogs.spec";
import { createPerfProgram } from "@azure/test-utils-perf";

const perfProgram = createPerfProgram(UploadLogsTest);
perfProgram.run();
