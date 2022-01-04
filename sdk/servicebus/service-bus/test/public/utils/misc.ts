// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TestTracer, setTracer, resetTracer } from "@azure/test-utils";

// some functions useful as we transition between interfaces and classes.
export function setTracerForTest<T extends TestTracer>(
  tracer?: T
): { tracer: T; resetTracer: () => void } {
  tracer = tracer ?? (new TestTracer() as T);
  setTracer(tracer);

  return {
    tracer,
    resetTracer,
  };
}
