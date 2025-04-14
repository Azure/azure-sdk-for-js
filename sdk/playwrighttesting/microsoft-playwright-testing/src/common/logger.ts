// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";

export const coreLogger = createClientLogger("mpt");
export const reporterLogger = createClientLogger("mpt:reporter");
