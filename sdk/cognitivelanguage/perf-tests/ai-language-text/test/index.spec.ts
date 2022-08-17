// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { LanguageDetectionTest } from "./languageDetection.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(LanguageDetectionTest);

perfProgram.run();
