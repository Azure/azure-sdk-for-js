// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createTraceFunction, TracedFunction } from "../../keyvault-common/src/tracingHelpers";

const packagePrefix = "Azure.KeyVault.Admin";

/**
 * @internal
 */
export const withTrace: TracedFunction = createTraceFunction(packagePrefix);
