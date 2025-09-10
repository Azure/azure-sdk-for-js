// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SeverityNumber } from "@opentelemetry/api-logs";
import { Resource } from "@opentelemetry/resources";
import type { SdkLogRecord } from "@opentelemetry/sdk-logs";

export function successfulBreezeResponse(count: number): any {
  return {
    itemsAccepted: count,
    itemsReceived: count,
    errors: [],
  };
}

export function failedBreezeResponse(count: number, statusCode: number): any {
  return {
    itemsAccepted: 0,
    itemsReceived: count,
    errors: new Array(count).fill(0).map((_, index) => ({
      index,
      statusCode,
      message: "foo",
    })),
  };
}

export function partialBreezeResponse(statusCodes: number[]): {
  itemsAccepted: number;
  itemsReceived: number;
  errors: { index: number; statusCode: number; message: string }[];
} {
  const itemsAccepted = statusCodes.filter((v) => v === 200).length;
  return {
    itemsAccepted,
    itemsReceived: statusCodes.length,
    errors: statusCodes
      .filter((v) => v !== 200)
      .map((v) => ({
        index: statusCodes.findIndex((s) => v === s),
        statusCode: v,
        message: "foo",
      })),
  };
}

export function createMockSdkLogRecord(
  resource?: Resource,
  instrumentationScope?: { name: string; version?: string },
  initialData: any = {},
): SdkLogRecord {
  const { body, ...otherData } = initialData;
  return {
    resource: resource || { attributes: {} },
    instrumentationScope: instrumentationScope || { name: "test", version: "1.0.0" },
    hrTime: otherData.hrTime || [Date.now() / 1000, 0],
    hrTimeObserved: otherData.hrTimeObserved || [Date.now() / 1000, 0],
    severityNumber: otherData.severityNumber || SeverityNumber.INFO,
    severityText: otherData.severityText || "INFO",
    body: body,
    attributes: otherData.attributes || {},
    droppedAttributesCount: otherData.droppedAttributesCount || 0,
    spanContext: otherData.spanContext,
  } as SdkLogRecord;
}
