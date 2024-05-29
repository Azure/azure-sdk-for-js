// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createPerfProgram } from "@azure-tools/test-perf";
import { SendCloudEventsTest } from "./sendCloudEvents.spec";

import dotenv from "dotenv";
dotenv.config();

const perfProgram = createPerfProgram(SendCloudEventsTest);

perfProgram.run();
