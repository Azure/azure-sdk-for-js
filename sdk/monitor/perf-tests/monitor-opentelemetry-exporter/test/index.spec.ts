// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure/test-utils-perf";
import { SpanExportTest } from "./spanExport.spec";

const perfProgram = createPerfProgram(SpanExportTest);
perfProgram.run();
