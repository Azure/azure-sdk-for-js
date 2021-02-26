// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RestError } from "@azure/core-http";
import { CanonicalCode } from "@opentelemetry/api";
import { createSpanFunction } from "@azure/core-tracing";

/**
 * Creates a span using the global tracer.
 * @internal
 */
export const createSpan = createSpanFunction({
  packagePrefix: "Azure.ServiceBus",
  namespace: "Microsoft.ServiceBus"
});

/**
 * @internal
 */
export function getCanonicalCode(err: Error): CanonicalCode {
  if (err instanceof RestError) {
    switch (err.statusCode) {
      case 401:
        return CanonicalCode.PERMISSION_DENIED;
      case 404:
        return CanonicalCode.NOT_FOUND;
      case 412:
        return CanonicalCode.FAILED_PRECONDITION;
    }
  }

  return CanonicalCode.UNKNOWN;
}
