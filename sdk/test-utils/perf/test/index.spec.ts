// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "../src/index.js";
import { allTestClasses } from "./declareTests.js";

createPerfProgram(...allTestClasses).run();
