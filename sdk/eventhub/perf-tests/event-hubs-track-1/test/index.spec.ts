// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SendTest } from "./send.spec";

const perfProgram = createPerfProgram(SendTest);

perfProgram.run();
