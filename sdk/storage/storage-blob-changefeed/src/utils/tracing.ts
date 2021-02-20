// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions, RequestOptionsBase } from "@azure/core-http";
import { createSpanFunction } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.Storage.Blob.Changefeed",
  namespace: "Microsoft.Storage"
});
