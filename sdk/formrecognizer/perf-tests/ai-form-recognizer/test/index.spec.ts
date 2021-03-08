// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressProgram, selectPerfStressTest } from "@azure/test-utils-perfstress";
import { CustomModelRecognitionTest } from "./custom.spec";

import dotenv from "dotenv";
dotenv.config();

console.log("=== Starting the perfStress test ===");

const perfStressProgram = new PerfStressProgram(selectPerfStressTest([CustomModelRecognitionTest]));

perfStressProgram.run();
