// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  supports,
  versionsToTest,
  SupportedVersions,
  MultiVersionTestOptions,
  TestFunctionWrapper
} from "./multiVersion";

export { matrix } from "./matrix";
export { isNode, isNode8 } from "./utils";

export { TestSpan } from "./tracing/testSpan";
export * from "./tracing/testTracer";
export * from "./tracing/testTracerProvider";
