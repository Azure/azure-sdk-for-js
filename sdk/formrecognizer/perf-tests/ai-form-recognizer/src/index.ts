// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { CustomModelRecognitionTest } from "./custom.spec.js";
import "dotenv/config";

const perfProgram = createPerfProgram(CustomModelRecognitionTest);

perfProgram.run();
