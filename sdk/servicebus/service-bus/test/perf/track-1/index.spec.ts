// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { BatchSendTest } from "./sendBatch.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([BatchSendTest]));

perfStressProgram.run();
