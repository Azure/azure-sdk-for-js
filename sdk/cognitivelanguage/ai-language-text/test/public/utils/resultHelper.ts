// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AnalyzeBatchResult,
  KnownTextAnalysisErrorCode,
  PagedAnalyzeBatchResult,
} from "../../../src/";
import { assert } from "@azure-tools/test-utils";
import { isRestError } from "@azure/core-rest-pipeline";

export async function assertActionsResults(
  actions: PagedAnalyzeBatchResult,
  expectations: AnalyzeBatchResult[],
  options: {
    maxPageSize?: number;
    excludedAdditionalProps?: string[];
  } = {},
): Promise<void> {
  const { maxPageSize, excludedAdditionalProps = [] } = options;
  let actionIndex = 0;
  for await (const page of actions.byPage(maxPageSize !== undefined ? { maxPageSize } : {})) {
    for (const action of page) {
      assert.deepEqualExcludingEvery(action, expectations[actionIndex++], [
        "completedOn",
        "modelVersion",
        "deploymentName",
        "projectName",
        "confidenceScore",
        "confidenceScores",
        "failedOn",
        ...excludedAdditionalProps,
      ] as any);
    }
  }
}

export async function assertRestError(
  error: Promise<unknown>,
  options: {
    statusCode?: number;
    code?: keyof typeof KnownTextAnalysisErrorCode;
    messagePattern?: RegExp;
  } = {},
): Promise<void> {
  const { code, statusCode, messagePattern } = options;
  try {
    await error;
    assert.fail(`Should have failed instead!`);
  } catch (e: unknown) {
    if (isRestError(e)) {
      if (code) {
        assert.equal(e.code, code);
      }
      if (statusCode) {
        assert.equal(e.statusCode, statusCode);
      }
      if (messagePattern) {
        assert.match(e.message, messagePattern);
      }
    } else {
      assert.fail(`Unexpected error: ${JSON.stringify(e)}`);
    }
  }
}

export function assertActionResults<T>(
  result: T[],
  expectation: T[],
  options: {
    excludedAdditionalProps?: string[];
  } = {},
): void {
  const { excludedAdditionalProps = ["confidenceScore", "confidenceScores"] } = options;
  assert.deepEqualExcludingEvery(result, expectation, excludedAdditionalProps as any);
}
