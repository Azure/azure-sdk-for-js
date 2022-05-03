// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { CustomModelRecognitionTest } from "./custom.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(CustomModelRecognitionTest);

perfProgram.run();
