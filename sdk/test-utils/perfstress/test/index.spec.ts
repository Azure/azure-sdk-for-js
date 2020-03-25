// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { PerfStressPolicyTest } from "./perfStressPolicy.spec";
import { Delay500ms } from "./delay.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    SynchronousException,
    AsynchronousException,
    PerfStressPolicyTest,
    Delay500ms
  ])
);

perfStressProgram.run();
