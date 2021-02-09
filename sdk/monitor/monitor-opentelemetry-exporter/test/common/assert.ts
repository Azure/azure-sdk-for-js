// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import {
  AI_OPERATION_ID,
  AI_OPERATION_PARENT_ID
} from "../../src/utils/constants/applicationinsights";
import { Expectation } from "./scenario/types";
import { MonitorBase, RequestData, TelemetryItem as Envelope } from "../../src/generated";
import { TelemetryItem as EnvelopeMapper } from "../../src/generated/models/mappers";

export const assertData = (actual: MonitorBase, expected: MonitorBase): void => {
  assert.strictEqual(actual.baseType, expected.baseType);

  if (expected.baseData) {
    assert.ok(actual.baseData);
    for (const [key, value] of Object.entries(expected.baseData)) {
      const serializedKey = EnvelopeMapper.type.modelProperties![key]?.serializedName ?? key;
      assert.deepStrictEqual(
        actual.baseData[serializedKey],
        value,
        `baseData.${serializedKey} should be equal`
      );
    }
  }
};

export const assertTrace = (actual: Envelope[], expectation: Expectation): void => {
  const envelope = actual.filter(
    (e) =>
      (e.data!.baseData as RequestData).name === (expectation.data!.baseData as RequestData).name
  );
  if (envelope.length !== 1) {
    assert.ok(false, `assertTrace: could not find exported envelope: ${expectation.name}`);
  }
  const operationId = envelope[0].tags![AI_OPERATION_ID];

  const parseId = (id: string): { traceId: string; spanId: string } => {
    const parts = id.replace("|", "").split(".");
    return {
      traceId: parts[0],
      spanId: parts[1]
    };
  };

  for (const child of expectation.children) {
    const childEnvelopes = actual.filter((e) => {
      const { spanId } = parseId((envelope[0].data!.baseData as RequestData).id);

      return (
        e.tags![AI_OPERATION_ID] === operationId &&
        e.tags![AI_OPERATION_PARENT_ID] === spanId &&
        (e.data!.baseData as RequestData).name === (child.data!.baseData as RequestData).name
      );
    });
    assert.strictEqual(
      childEnvelopes.length,
      1,
      `Could not find a child envelope for ${(envelope[0].data!.baseData as RequestData).name}`
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
      (e) =>
        (e.data!.baseData as RequestData).name === (expectation.data!.baseData as RequestData).name
    );
    if (envelope.length !== 1) {
      assert.ok(
        false,
        `assertExpectation: could not find exported envelope: ${
          (expectation.data?.baseData as RequestData).name
        }`
      );
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
      const serializedKey = EnvelopeMapper.type.modelProperties![key]?.serializedName ?? undefined;
      switch (key) {
        case "children":
          assertTrace(actual, expectation);
          assertExpectation(actual, expectation.children);
          break;
        case "data":
          if (envelope[0].data) {
            assertData(envelope[0].data, value as MonitorBase);
          }
          break;
        default:
          assert.ok(serializedKey, `Serialized key for ${key}`);
          assert.strictEqual(
            envelope[0][serializedKey as keyof Envelope], // as keyof Serialized(Envelope)
            value,
            `envelope.${serializedKey} should be equal\nActual: ${envelope[0][key]}\nExpected: ${value}`
          );
      }
    }
  }
};
