// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "../src";
import { allTestClasses } from "./declareTests";

console.log("=== Starting the perf test ===");

const perfProgram = createPerfProgram(allTestClasses);

perfProgram.run();
