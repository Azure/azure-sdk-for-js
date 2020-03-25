// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { PerfStressPolicyTest } from "./perfStressPolicy.spec";
import { Delay500ms } from "./delay.spec";

console.log("=== Starting the perfStress tests ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    new SynchronousException(),
    new AsynchronousException(),
    new PerfStressPolicyTest(),
    new Delay500ms()
  ])
);

perfStressProgram.run();
