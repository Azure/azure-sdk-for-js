// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export {
  supports,
  versionsToTest,
  SupportedVersions,
  MultiVersionTestOptions,
  TestFunctionWrapper,
} from "./multiVersion.js";

export { chai, assert, expect, should } from "./chai.js";
export { matrix } from "./matrix.js";
export { isNode, isNode8 } from "./utils.js";
export { getYieldedValue } from "./getYieldedValue.js";

export { TestSpan } from "./tracing/testSpan.js";
export * from "./tracing/mockInstrumenter.js";
export * from "./tracing/mockTracingSpan.js";
export * from "./tracing/testTracer.js";
export * from "./tracing/testTracerProvider.js";
export * from "./tracing/spanGraphModel.js";

export * from "./fakeTestSecrets.js";

export { createXhrHttpClient } from "./xhrHttpClient.js";

export { createMockTracingContext } from "./tracing/mockContext.js";
