// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "../src";
import { allTestClasses } from "./declareTests";

console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(selectPerfTest(allTestClasses));

perfProgram.run();
