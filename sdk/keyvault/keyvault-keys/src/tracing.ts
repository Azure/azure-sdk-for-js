// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSpanFunction, OperationTracingOptions } from "@azure/core-tracing";
import { trace } from "../../keyvault-common/src/tracingHelpers";
import { Span } from "@opentelemetry/api";

const packagePrefix = "Azure.KeyVault.Keys";
const namespace = "Microsoft.KeyVault";

/**
 * @internal
 */
export const withTrace = trace(packagePrefix);

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
  packagePrefix: packagePrefix,
  namespace: namespace
});
