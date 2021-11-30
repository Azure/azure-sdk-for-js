// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { BatchSendTest } from "./sendBatch.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([BatchSendTest]));

perfProgram.run();
