// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SendTest } from "./send.spec.js";
import { SubscribeTest } from "./subscribe.spec.js";

const perfProgram = createPerfProgram(SendTest, SubscribeTest);

perfProgram.run();
