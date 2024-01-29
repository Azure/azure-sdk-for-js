// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "../src";
import { allTestClasses } from "./declareTests";

createPerfProgram(...allTestClasses).run();
