// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createTracingClient,
  type TracingSpan,
  type TracingSpanOptions,
} from "@azure/core-tracing";
import { packageVersion } from "./constants.js";
import type { OperationOptions } from "../operationOptions.js";
import { type RestCompatibleOperationOptions, toRestOperationOptions } from "./operationOptions.js";

const coreTracingClient = createTracingClient({
  namespace: "Microsoft.AppConfiguration",
  packageName: "@azure/app-configuration",
  packageVersion,
});

async function withSpan<Options extends OperationOptions, Result>(
  name: string,
  operationOptions: Options,
  callback: (
    updatedOptions: RestCompatibleOperationOptions<Options>,
    span: Omit<TracingSpan, "end">,
  ) => Result,
  spanOptions?: TracingSpanOptions,
): Promise<Awaited<Result>> {
  return coreTracingClient.withSpan(
    name,
    operationOptions,
    (updatedOptions, span) => callback(toRestOperationOptions(updatedOptions), span),
    spanOptions,
  );
}

/** @internal */
export const tracingClient = {
  ...coreTracingClient,
  withSpan,
};
