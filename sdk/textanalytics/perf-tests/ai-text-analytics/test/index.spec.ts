// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { DetectLanguageTest } from "./detectLanguage.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(DetectLanguageTest);

perfProgram.run();
