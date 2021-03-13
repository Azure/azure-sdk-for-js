// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { AnomaliesListTest } from "./listAnomalies.spec";
console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(
    selectPerfStressTest([
        AnomaliesListTest
    ])
  );
perfStressProgram.run();
