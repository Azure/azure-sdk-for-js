// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SendCloudEventsTest } from "./sendCloudEvents.spec.js";
import "dotenv/config";

const perfProgram = createPerfProgram(SendCloudEventsTest);

perfProgram.run();
