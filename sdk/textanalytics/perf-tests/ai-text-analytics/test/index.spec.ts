// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { DetectLanguageTest } from "./detectLanguage.spec.js";

import dotenv from "dotenv";
import { describe, it, assert } from "vitest";

dotenv.config();

const perfProgram = createPerfProgram(DetectLanguageTest);

perfProgram.run();
