// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfProgram, selectPerfTest } from "@azure/test-utils-perf";
import { AnomaliesListTest } from "./listAnomalies.spec";
import { IncidentsListTest } from "./listIncidents.spec";
import { RootCauseTest } from "./rootCauses.spec";
console.log("=== Starting the perf test ===");

const perfProgram = new PerfProgram(
  selectPerfTest([AnomaliesListTest, IncidentsListTest, RootCauseTest])
);
perfProgram.run();
