// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { AnomaliesListTest } from "./listAnomalies.spec";
import { IncidentsListTest } from "./listIncidents.spec";
import { RootCauseTest } from "./rootCauses.spec";

const perfProgram = createPerfProgram(AnomaliesListTest, IncidentsListTest, RootCauseTest);
perfProgram.run();
