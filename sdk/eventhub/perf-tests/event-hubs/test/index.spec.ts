// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { SendTest } from "./send.spec";
import { SubscribeTest } from "./subscribe.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest([SendTest, SubscribeTest]));

perfProgram.run();
