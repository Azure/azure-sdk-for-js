// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";
import { PACKAGE_NAME } from "./constants.js";
export const logger = createClientLogger(PACKAGE_NAME);
