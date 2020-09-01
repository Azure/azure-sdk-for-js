// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { Base, Envelope } from "../../src/Declarations/Contracts";
import {
  AI_OPERATION_ID,
  AI_OPERATION_PARENT_ID
} from "../../src/utils/constants/applicationinsights";
import { Expectation } from "./scenario/types";

export const assertData = (actual: Base, expected: Base): void => {
  assert.strictEqual(actual.baseType, expected.baseType);
  assert.strictEqual(actual.properties, expected.properties);

  if (expected.baseData) {
    assert.ok(actual.baseData);
    for (const [key, value] of Object.entries(expected.baseData)) {
      assert.deepStrictEqual(actual.baseData![key], value, `baseData.${key} should be equal`);
    }
  }
};

export const assertTrace = (actual: Envelope[], expectation: Expectation): void => {
  const envelope = actual.filter(
    (e) => e.data!.baseData!.name === expectation.data!.baseData!.name
  );
  if (envelope.length !== 1) {
    assert.ok(false, `assertTrace: could not find exported envelope: ${expectation.name}`);
    return;
  }
  const operationId = envelope[0].tags[AI_OPERATION_ID];

  const parseId = (id: string): { traceId: string; spanId: string } => {
    const parts = id.replace("|", "").split(".");
    return {
      traceId: parts[0],
      spanId: parts[1]
    };
  };

  for (const child of expectation.children) {
    const childEnvelopes = actual.filter((e) => {
      const { spanId } = parseId(envelope[0].data!.baseData!.id);

      return (
        e.tags[AI_OPERATION_ID] === operationId &&
        e.tags[AI_OPERATION_PARENT_ID] === spanId &&
        e.data!.baseData!.name === child.data!.baseData!.name
      );
    });
    assert.strictEqual(
      childEnvelopes.length,
      1,
      `Could not find a child envelope for ${envelope[0].data!.baseData!.name}`
    );
  }
};

export const assertCount = (actual: Envelope[], expectations: Expectation[]): void => {
  const countExpectations = (expectation: Expectation[]): number => {
    return (
      expectation.length + expectation.reduce((sum, e) => sum + countExpectations(e.children), 0)
    );
  };
  const expectationsLength = countExpectations(expectations);
  assert.strictEqual(actual.length, expectationsLength);
};

export const assertExpectation = (actual: Envelope[], expectations: Expectation[]): void => {
  for (const expectation of expectations) {
    const envelope = actual.filter(
      (e) => e.data!.baseData!.name === expectation.data!.baseData!.name
    );
    if (envelope.length !== 1) {
      assert.ok(false, `assertExpectation: could not find exported envelope: ${expectation.name}`);
      return;
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
      switch (key) {
        case "children":
          assertTrace(actual, expectation);
          assertExpectation(actual, expectation.children);
          break;
        case "data":
          if (envelope[0].data) {
            assertData(envelope[0].data, value as Base);
          }
          break;
        default:
          assert.strictEqual(envelope[0][key], value, `envelope.${key} should be equal`);
      }
    }
  }
};
