// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { AnomaliesListTest } from "./listAnomalies.spec.js";
import { IncidentsListTest } from "./listIncidents.spec.js";
import { RootCauseTest } from "./rootCauses.spec.js";

const perfProgram = createPerfProgram(AnomaliesListTest, IncidentsListTest, RootCauseTest);
perfProgram.run();
