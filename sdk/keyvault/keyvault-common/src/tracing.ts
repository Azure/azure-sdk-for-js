// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunctionForOperationOptions } from "@azure/core-tracing";

/**
 * @internal
 */
export const createSpan = createSpanFunctionForOperationOptions({
  namespace: "Microsoft.KeyVault",
  packagePrefix: undefined // keyvault handles prefixing on it's own.
});
