// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { ListSettingsTest } from "./listSettings.spec.js";

const perfProgram = createPerfProgram(ListSettingsTest);

perfProgram.run();
