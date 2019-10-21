// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createClientLogger } from "@azure/logger";

/**
 * The AzureLogger used for all clients within the identity package
 */
export const logger = createClientLogger("identity");
