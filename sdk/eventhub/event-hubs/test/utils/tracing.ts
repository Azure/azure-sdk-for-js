// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TestTracer, resetTracer, setTracer } from "@azure-tools/test-utils";

export function setTracerForTest<T extends TestTracer>(
  tracer?: T,
): { tracer: T; resetTracer: () => void } {
  tracer = tracer ?? (new TestTracer() as T);
  setTracer(tracer);

  return {
    tracer,
    resetTracer,
  };
}
