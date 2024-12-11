// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "../src/index.js";
import { allTestClasses } from "./declareTests.js";
import { describe, it, assert } from "vitest";

createPerfProgram(...allTestClasses).run();
