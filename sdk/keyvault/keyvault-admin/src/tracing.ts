// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction, OperationTracingOptions } from "@azure/core-tracing";
import { Span } from "@opentelemetry/api";

/*
 * @internal
 */
export const createSpan: <T extends {
  tracingOptions?: OperationTracingOptions | undefined;
}>(
  operationName: string,
  operationOptions: T | undefined
) => {
  span: Span;
  updatedOptions: T;
} = createSpanFunction({
  // TODO: @sadasant - would you prefer to have a prefix? This is inconsistently applied
  // in here (the generated client has a `generatedClient` prefix, but the other operations do not)
  packagePrefix: "",
  namespace: "Microsoft.KeyVault"
});
