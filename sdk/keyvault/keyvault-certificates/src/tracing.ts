// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction } from "@azure/core-tracing";

/*
 * @internal
 */
export const createSpan = createSpanFunction({
  // TODO: @sadasant - would you prefer to have a prefix? This is inconsistently applied
  // in here (the generated client has a `generatedClient` prefix, but the other operations do not)
  packagePrefix: "",
  namespace: "Microsoft.KeyVault"
});
