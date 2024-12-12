// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { BatchReceiveTest } from "./receiveBatch.spec.js";
import { BatchSendTest } from "./sendBatch.spec.js";
import { SubscribeTest } from "./subscribe.spec.js";
import { describe, it, assert } from "vitest";

const perfProgram = createPerfProgram(BatchSendTest, BatchReceiveTest, SubscribeTest);

perfProgram.run();
