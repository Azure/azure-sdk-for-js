// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { AnomaliesListTest } from "./listAnomalies.spec";
import { IncidentsListTest } from "./listIncidents.spec";
import { RootCauseTest } from "./rootCauses.spec";

const perfProgram = createPerfProgram(AnomaliesListTest, IncidentsListTest, RootCauseTest);
perfProgram.run();
