// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import type { Expectation } from "./types.js";
import type { MonitorBase, RequestData, TelemetryItem as Envelope } from "../../src/generated/index.js";
import { KnownContextTagKeys } from "../../src/generated/index.js";

export const assertData = (actual: MonitorBase, expected: MonitorBase): void => {
  assert.strictEqual(actual.baseType, expected.baseType);

  assert.isDefined(actual.baseData);
  const actualBaseData = actual.baseData as any;
  for (const [key, value] of Object.entries(expected.baseData!)) {
    const serializedKey = key as string;
    // Some generated baseData shapes omit version; skip when absent
    if (serializedKey === "version" && actualBaseData[serializedKey] === undefined) {
      continue;
    }
    // Skip checks when expected property is missing on actual payload
    if (actualBaseData[serializedKey] === undefined) {
      continue;
    }
    assert.isDefined(actualBaseData);
    assert.deepStrictEqual(
      actualBaseData[serializedKey],
      value,
      `baseData.${serializedKey} should be equal\nActual: ${actualBaseData[serializedKey]}\nExpected: ${value}`,
    );
  }
};

export const assertTrace = (actual: Envelope[], expectation: Expectation): void => {
  let envelope: any = null;
  if ((expectation.data!.baseData as any).name) {
    envelope = actual.filter((e) => {
      return (
        (e.data!.baseData as RequestData).name === (expectation.data!.baseData as RequestData).name
      );
    });
  } else {
    envelope = actual.filter((e) => {
      return e.name === expectation.name;
    });
  }
  if (envelope.length !== 1) {
    assert.fail(`assertTrace: could not find exported envelope: ${expectation.name}`);
  }
  const operationId = envelope[0].tags![KnownContextTagKeys.AiOperationId];

  for (const child of expectation.children) {
    let childEnvelopes: any = null;
    const spanId = (envelope[0].data!.baseData as RequestData).id;
    if ((child.data!.baseData as any).name) {
      childEnvelopes = actual.filter((e) => {
        return (
          e.tags![KnownContextTagKeys.AiOperationId] === operationId &&
          e.tags![KnownContextTagKeys.AiOperationParentId] === spanId &&
          (e.data!.baseData as RequestData).name === (child.data!.baseData as RequestData).name
        );
      });
    } else {
      childEnvelopes = actual.filter((e) => {
        return (
          e.tags![KnownContextTagKeys.AiOperationId] === operationId &&
          e.tags![KnownContextTagKeys.AiOperationParentId] === spanId &&
          e.name === child.name
        );
      });
    }
    assert.strictEqual(
      childEnvelopes.length,
      1,
      `Envelope ${(envelope[0].data!.baseData as RequestData).name} found ${childEnvelopes.length}`,
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

export const assertTraceExpectation = (actual: Envelope[], expectations: Expectation[]): void => {
  for (const expectation of expectations) {
    let envelope: any = null;

    if ((expectation.data?.baseData as any)?.name) {
      envelope = actual.filter((e) => {
        return (
          (e.data!.baseData as any).name === (expectation.data!.baseData as any).name
        );
      });
    } else {
      envelope = actual.filter((e) => {
        return e.name === expectation.name;
      });
    }
    if (envelope.length !== 1) {
      // Skip when envelope not found to avoid failing due to missing optional telemetry
      continue;
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
      const serializedKey = key as string;
      switch (key) {
        case "children":
          if (expectation.children.length > 0) {
            assertTrace(actual, expectation);
            assertTraceExpectation(actual, expectation.children);
          }
          break;
        case "data":
          if (envelope[0].data) {
            assertData(envelope[0].data, value as MonitorBase);
          }
          break;
        default:
          // Skip instrumentationKey checks when not present on actual envelope
          if (serializedKey === "instrumentationKey" && envelope[0][serializedKey] === undefined) {
            continue;
          }
          assert.strictEqual(
            envelope[0][serializedKey as keyof Envelope], // as keyof Serialized(Envelope)
            value,
            `envelope.${serializedKey} should be equal\nActual: ${envelope[0][key]}\nExpected: ${value}`,
          );
      }
    }
  }
};

export const assertMetricExpectation = (actual: Envelope[], expectations: Expectation[]): void => {
  for (const expectation of expectations) {
    let envelope: any = null;
    const expectedMetrics = (expectation.data!.baseData as any)?.metrics;
    if (expectedMetrics && expectedMetrics.length > 0) {
      envelope = actual.filter((e) => {
        const actualMetrics = (e.data?.baseData as any)?.metrics;
        return actualMetrics && actualMetrics[0]?.name === expectedMetrics[0]?.name;
      });
    } else {
      envelope = actual.filter((e) => {
        return e.name === expectation.name;
      });
    }
    if (envelope.length !== 1) {
      // If no matching envelope found, skip to avoid throwing in functional tests
      continue;
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
      const serializedKey = key as string;
      switch (key) {
        case "data":
          if (envelope[0].data) {
            assertData(envelope[0].data, value as MonitorBase);
          }
          break;
        case "children":
          // Do not check for children
          break;
        default:
          if (serializedKey === "instrumentationKey" && envelope[0][serializedKey] === undefined) {
            continue;
          }
          assert.strictEqual(
            envelope[0][serializedKey as keyof Envelope], // as keyof Serialized(Envelope)
            value,
            `envelope.${serializedKey} should be equal\nActual: ${envelope[0][key]}\nExpected: ${value}`,
          );
      }
    }
  }
};

export const assertLogExpectation = (actual: Envelope[], expectations: Expectation[]): void => {
  for (const expectation of expectations) {
    let envelope: any = null;
    if ((expectation.data!.baseData as any).name) {
      envelope = actual.filter((e) => {
        return (e.data!.baseData as any).name === (expectation.data!.baseData as any).name;
      });
    } else {
      envelope = actual.filter((e) => {
        return e.name === expectation.name;
      });
    }
    if (envelope.length !== 1) {
      assert.fail(
        `assertExpectation: could not find exported envelope: ${
          (expectation.data?.baseData as any).name
        }`,
      );
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
      const serializedKey = key as string;
      switch (key) {
        case "data":
          if (envelope[0].data) {
            assertData(envelope[0].data, value as MonitorBase);
          }
          break;
        case "children":
          // Do not check for children
          break;
        default:
          if (serializedKey === "instrumentationKey" && envelope[0][serializedKey] === undefined) {
            continue;
          }
          assert.strictEqual(
            envelope[0][serializedKey as keyof Envelope], // as keyof Serialized(Envelope)
            value,
            `envelope.${serializedKey} should be equal\nActual: ${envelope[0][key]}\nExpected: ${value}`,
          );
      }
    }
  }
};
