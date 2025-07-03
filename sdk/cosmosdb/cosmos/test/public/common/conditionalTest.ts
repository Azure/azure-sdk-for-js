// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";

// Helper to skip tests if SKIP_COMPUTE_GATEWAY_TESTS is true and test name starts with "CGW_"
export const conditionalIt = (
  name: string,
  fn: () => any,
  timeout?: number,
): ReturnType<typeof it> => {
  const skipComputeGateway = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";
  if (skipComputeGateway) {
    return it.skip(name, fn, timeout);
  }
  return it(name, fn, timeout);
};

// Helper to skip tests if SKIP_COMPUTE_GATEWAY_TESTS is true and test name starts with "CGW_"
export const conditionalDescribe = (
  name: string,
  fn: () => any,
  timeout?: number,
): ReturnType<typeof describe> => {
  const skipComputeGateway = process.env.SKIP_COMPUTE_GATEWAY_TESTS === "true";
  if (skipComputeGateway) {
    return describe.skip(name, fn, timeout);
  }
  return describe(name, fn, timeout);
};
