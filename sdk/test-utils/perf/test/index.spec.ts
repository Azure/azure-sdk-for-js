// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "../src";

// Tests:
import { NoOp } from "./noop.spec";
import { OptionsTest } from "./options.spec";
import { SetupCleanupTest } from "./setupCleanup.spec";
import { Delay500ms } from "./delay.spec";
import { Exception } from "./exception.spec";
import { PerfPolicyTest } from "./perfPolicy.spec";
import { SleepTest } from "./sleep.spec";
import { NodeFetchTest } from "./nodeFetch.spec";
import { ServiceClientGetTest } from "./serviceClientGet.spec";
import { MockReceiverTest } from "./batch/mockReceiverTest.spec";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([
    NoOp,
    OptionsTest,
    SetupCleanupTest,
    Delay500ms,
    Exception,
    PerfPolicyTest,
    SleepTest,
    NodeFetchTest,
    ServiceClientGetTest,
    MockReceiverTest
  ])
);

perfProgram.run();
