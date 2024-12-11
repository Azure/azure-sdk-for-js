// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AzureLogger } from "@azure/logger";
import { createClientLogger } from "@azure/logger";

/**
 * The \@azure/logger configuration for this package.
 */
export const defaultLogger: AzureLogger = createClientLogger("cosmosdb");
