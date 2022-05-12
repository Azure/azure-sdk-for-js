// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure/test-utils-perf";
import { BatchReceiveTest } from "./receiveBatch.spec";
import { BatchSendTest } from "./sendBatch.spec";
import { SubscribeTest } from "./subscribe.spec";

const perfProgram = createPerfProgram(BatchSendTest, BatchReceiveTest, SubscribeTest);

perfProgram.run();
