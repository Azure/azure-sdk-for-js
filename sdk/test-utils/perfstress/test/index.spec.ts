// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, findPerfStressTest } from "../src";
import { SynchronousException, AsynchronousException } from "./exception.spec";
import { PerfStressPolicyTest } from "./perfStressPolicy.spec";
import { Delay500ms } from "./delay.spec";

console.log("=== Starting the perfStress tests ===");

const perfStressProgram = new PerfStressProgram(
  findPerfStressTest(
    [
      new SynchronousException(),
      new AsynchronousException(),
      new PerfStressPolicyTest(),
      new Delay500ms()
    ],
    process.argv
  )
);

perfStressProgram.run();
