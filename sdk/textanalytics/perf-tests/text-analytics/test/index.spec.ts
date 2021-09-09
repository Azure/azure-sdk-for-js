// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { DetectLanguageTest } from "./detectLanguage.spec";

import dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([DetectLanguageTest]));

perfStressProgram.run();
