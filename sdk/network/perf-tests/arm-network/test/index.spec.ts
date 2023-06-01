// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { ListTest } from "./list.spec";

const perfProgram = createPerfProgram(ListTest);

perfProgram.run();
