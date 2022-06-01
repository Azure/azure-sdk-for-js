// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLogger, createClientLogger } from "@azure/logger";

/**
 * The \@azure/logger configuration for this package.
 *
 * @internal
 */
export const logger: AzureLogger = createClientLogger("mixed-reality-authentication");
