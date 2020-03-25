// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "../src";

// Tests:
import { OptionsTest } from "./options.spec";
import { Delay500ms } from "./delay.spec";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { PerfStressPolicyTest } from "./perfStressPolicy.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    OptionsTest,
    Delay500ms,
    SynchronousException,
    AsynchronousException,
    PerfStressPolicyTest
  ])
);

perfStressProgram.run();
