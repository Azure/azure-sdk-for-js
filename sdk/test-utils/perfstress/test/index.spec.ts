// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "../src";

// Tests:
import { NoOp } from "./noop.spec";
import { OptionsTest } from "./options.spec";
import { SetupCleanupTest } from "./setupCleanup.spec";
import { Delay500ms } from "./delay.spec";
import { Exception } from "./exception.spec";
import { PerfStressPolicyTest } from "./perfStressPolicy.spec";
import { SleepTest } from "./sleep.spec";
import { NodeFetchTest } from "./nodeFetch.spec";
import { ServiceClientGetTest } from "./serviceClientGet.spec";

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
  selectPerfStressTest([
    NoOp,
    OptionsTest,
    SetupCleanupTest,
    Delay500ms,
    Exception,
    PerfStressPolicyTest,
    SleepTest,
    NodeFetchTest,
    ServiceClientGetTest
  ])
);

perfStressProgram.run();
