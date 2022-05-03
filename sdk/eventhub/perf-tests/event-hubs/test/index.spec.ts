// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { SendTest } from "./send.spec";
import { SubscribeTest } from "./subscribe.spec";

const perfProgram = createPerfProgram(SendTest, SubscribeTest);

perfProgram.run();
