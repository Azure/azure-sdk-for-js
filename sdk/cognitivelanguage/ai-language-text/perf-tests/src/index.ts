// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { LanguageDetectionTest } from "./languageDetection.spec.js";
import "dotenv/config";

const perfProgram = createPerfProgram(LanguageDetectionTest);

perfProgram.run();
