// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { DetectLanguageTest } from "./detectLanguage.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(DetectLanguageTest);

perfProgram.run();
