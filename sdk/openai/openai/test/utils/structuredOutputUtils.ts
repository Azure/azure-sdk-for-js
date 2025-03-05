// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import { assertNonEmptyArray } from "./asserts.js";

// Structure output interfaces
export interface Step {
  explanation: string;
  output: string;
}
export interface MathResponse {
  steps: Step[];
  final_answer: string;
}

function assertStep(steps: Step): void {
  assert.isString(steps.explanation);
  assert.isString(steps.output);
}

export function assertMathResponseOutput(output: MathResponse): void {
  assertNonEmptyArray(output.steps, assertStep);
  assert.isString(output.final_answer);
}
