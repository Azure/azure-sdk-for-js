// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { TimeSpan } from "./timeSpan";

/**
 * @hidden
 */
export function parseDelimitedString(delimitedString: string): {
  [key: string]: any;
} {
  if (delimitedString == null) {
    throw new Error("delimitedString is null or undefined");
  }

  const metrics: { [key: string]: any } = {};

  const headerAttributes = delimitedString.split(";");
  for (const attribute of headerAttributes) {
    const attributeKeyValue = attribute.split("=");

    if (attributeKeyValue.length !== 2) {
      throw new Error("recieved a malformed delimited string");
    }

    const attributeKey = attributeKeyValue[0];
    const attributeValue = parseFloat(attributeKeyValue[1]);

    metrics[attributeKey] = attributeValue;
  }

  return metrics;
}

/**
 * @hidden
 */
export function timeSpanFromMetrics(
  metrics: { [key: string]: any } /* TODO: any */,
  key: string
): TimeSpan {
  if (key in metrics) {
    return TimeSpan.fromMilliseconds(metrics[key]);
  }

  return TimeSpan.zero;
}

/**
 * @hidden
 */
export function isNumeric(input: unknown): boolean {
  return !isNaN(parseFloat(input as string)) && isFinite(input as number);
}
