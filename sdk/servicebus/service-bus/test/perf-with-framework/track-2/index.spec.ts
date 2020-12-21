// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { SimpleSendTest } from "./send.spec";
import { BatchSendTest } from "./sendBatch.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([SimpleSendTest, BatchSendTest])
);

perfStressProgram.run();
