// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "vitest";
import type { Expectation } from "./types.js";
import type {
  MonitorBase,
  MonitorDomain,
  RequestData,
  TelemetryItem as Envelope,
} from "../../src/generated/index.js";
import { KnownContextTagKeys } from "../../src/generated/index.js";

const hasName = (
  baseData: Record<string, any> | undefined,
): baseData is MonitorDomain & { name: string } => {
  return !!baseData && "name" in baseData;
};

const isMetricsData = (
  baseData: Record<string, any> | undefined,
): baseData is MonitorDomain & { metrics: any[] } => {
  return !!baseData && "metrics" in baseData;
};

// Maps TypeScript model property names to wire-format names used by TypeSpec serializers.
// When the serializer renames a property (e.g., version → ver), we check both names.
const wirePropertyMap: Record<string, string> = {
  version: "ver",
};

// Maps metric data point TypeScript property names to wire-format names.
const metricDataPointWireMap: Record<string, string> = {
  dataPointType: "kind",
  namespace: "ns",
};

/**
 * Converts an expected metric data point object to wire format for comparison
 * with actual serialized data.
 */
function toWireMetricDataPoint(expected: Record<string, any>): Record<string, any> {
  const wire: Record<string, any> = {};
  for (const [key, value] of Object.entries(expected)) {
    const wireKey = metricDataPointWireMap[key] ?? key;
    wire[wireKey] = value;
  }
  return wire;
}

const getBaseDataProp = (baseData: Record<string, any> | undefined, key: string): unknown => {
  const wireKey = wirePropertyMap[key] ?? key;
  return baseData?.[wireKey] ?? baseData?.[key];
};

/**
 * Converts an expected value to wire format if it's a metrics array.
 */
function toWireValue(key: string, value: unknown): unknown {
  if (key === "metrics" && Array.isArray(value)) {
    return value.map((item) =>
      typeof item === "object" && item !== null ? toWireMetricDataPoint(item) : item,
    );
  }
  return value;
}

const getEnvelopeProp = (envelope: Envelope, key: keyof Expectation): unknown => {
  if (key === "instrumentationKey") {
    return (envelope as any).instrumentationKey ?? (envelope as any).iKey;
  }
  return (envelope as any)[key];
};

export const assertData = (actual: MonitorBase, expected: MonitorBase): void => {
  assert.strictEqual(actual.baseType, expected.baseType);

  assert.isDefined(actual.baseData);
  for (const [key, value] of Object.entries(expected.baseData ?? {})) {
    const actualValue = getBaseDataProp(actual.baseData as MonitorDomain, key);
    const expectedWireValue = toWireValue(key, value);
    assert.deepStrictEqual(
      actualValue,
      expectedWireValue,
      `baseData.${key} should be equal\nActual: ${String(actualValue)}\nExpected: ${String(expectedWireValue)}`,
    );
  }
};

export const assertTrace = (actual: Envelope[], expectation: Expectation): void => {
  let envelope: Envelope[] = [];
  if (hasName(expectation.data?.baseData)) {
    const expectedName = (expectation.data!.baseData as any).name;
    envelope = actual.filter(
      (e) => hasName(e.data?.baseData) && (e as any).data!.baseData!.name === expectedName,
    );
  } else {
    envelope = actual.filter((e) => e.name === expectation.name);
  }
  if (envelope.length !== 1) {
    assert.fail(`assertTrace: could not find exported envelope: ${expectation.name}`);
  }
  const operationId = envelope[0].tags![KnownContextTagKeys.AiOperationId];

  for (const child of expectation.children) {
    let childEnvelopes: Envelope[] = [];
    const spanId = (envelope[0].data!.baseData as RequestData).id;
    if (hasName(child.data?.baseData)) {
      const childName = (child.data!.baseData as any).name;
      childEnvelopes = actual.filter(
        (e) =>
          e.tags![KnownContextTagKeys.AiOperationId] === operationId &&
          e.tags![KnownContextTagKeys.AiOperationParentId] === spanId &&
          hasName(e.data?.baseData) &&
          (e as any).data!.baseData!.name === childName,
      );
    } else {
      childEnvelopes = actual.filter(
        (e) =>
          e.tags![KnownContextTagKeys.AiOperationId] === operationId &&
          e.tags![KnownContextTagKeys.AiOperationParentId] === spanId &&
          e.name === child.name,
      );
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
    let envelope: Envelope[] = [];

    if (hasName(expectation.data?.baseData)) {
      const expectedName = (expectation.data!.baseData as any).name;
      envelope = actual.filter(
        (e) => hasName(e.data?.baseData) && (e as any).data!.baseData!.name === expectedName,
      );
    } else {
      envelope = actual.filter((e) => e.name === expectation.name);
    }
    if (envelope.length !== 1) {
      assert.fail(
        `assertExpectation: could not find exported envelope: ${
          hasName(expectation.data?.baseData)
            ? (expectation as any).data!.baseData!.name
            : expectation.name
        }`,
      );
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
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
          assert.strictEqual(
            getEnvelopeProp(envelope[0], key),
            value,
            `envelope.${key} should be equal\nActual: ${String(getEnvelopeProp(envelope[0], key))}\nExpected: ${value}`,
          );
      }
    }
  }
};

export const assertMetricExpectation = (actual: Envelope[], expectations: Expectation[]): void => {
  for (const expectation of expectations) {
    let envelope: Envelope[] = [];
    if (
      isMetricsData(expectation.data!.baseData) &&
      (expectation as any).data!.baseData.metrics.length > 0
    ) {
      const expectedMetricName = (expectation as any).data!.baseData.metrics[0].name;
      envelope = actual.filter(
        (e) =>
          isMetricsData(e.data?.baseData) &&
          (e as any).data!.baseData.metrics[0].name === expectedMetricName,
      );
    } else {
      envelope = actual.filter((e) => e.name === expectation.name);
    }
    if (envelope.length !== 1) {
      assert.fail(
        `assertExpectation: Envelope ${
          isMetricsData(expectation.data?.baseData)
            ? (expectation as any).data!.baseData!.metrics[0].name
            : expectation.name
        } found ${envelope.length} times.`,
      );
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
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
          assert.strictEqual(
            getEnvelopeProp(envelope[0], key),
            value,
            `envelope.${key} should be equal\nActual: ${String(getEnvelopeProp(envelope[0], key))}\nExpected: ${value}`,
          );
      }
    }
  }
};

export const assertLogExpectation = (actual: Envelope[], expectations: Expectation[]): void => {
  for (const expectation of expectations) {
    let envelope: Envelope[] = [];
    if (hasName(expectation.data?.baseData)) {
      const expectedName = (expectation.data!.baseData as any).name;
      envelope = actual.filter(
        (e) =>
          hasName((e as any).data?.baseData) && (e as any).data!.baseData!.name === expectedName,
      );
    } else {
      envelope = actual.filter((e) => e.name === expectation.name);
    }
    if (envelope.length !== 1) {
      assert.fail(
        `assertExpectation: could not find exported envelope: ${
          hasName(expectation.data?.baseData)
            ? (expectation as any).data!.baseData!.name
            : expectation.name
        }`,
      );
    }

    for (const [key, value] of Object.entries(expectation) as [keyof Expectation, unknown][]) {
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
          assert.strictEqual(
            getEnvelopeProp(envelope[0], key),
            value,
            `envelope.${key} should be equal\nActual: ${String(getEnvelopeProp(envelope[0], key))}\nExpected: ${value}`,
          );
      }
    }
  }
};
