// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { GetWidgetTest } from "./getWidget.spec.js";

const perfProgram = createPerfProgram(GetWidgetTest);

perfProgram.run();
