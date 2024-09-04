// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "../src";
import { allTestClasses } from "./declareTests";

createPerfProgram(...allTestClasses).run();
