// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { BatchReceiveTest } from "./receiveBatch.spec";
import { BatchSendTest } from "./sendBatch.spec";

const perfProgram = createPerfProgram(BatchSendTest, BatchReceiveTest);

perfProgram.run();
