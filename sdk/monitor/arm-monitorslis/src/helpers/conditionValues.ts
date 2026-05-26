// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Condition, ConditionOperator, SamplingType, ScalarFunction } from "../models/models.js";
import { KnownConditionOperator } from "../models/models.js";

/**
 * Literal delimiter the SLI resource provider expects between list items for the
 * {@link KnownConditionOperator.In} / {@link KnownConditionOperator.NotIn} operators.
 */
export const CONDITION_IN_VALUE_SEPARATOR = "^^";

/**
 * Returns the list of items encoded into {@link Condition.value} for the
 * {@link KnownConditionOperator.In} / {@link KnownConditionOperator.NotIn} operators by splitting
 * on the literal `^^` separator. Returns an empty array when the value is `undefined` or `null`.
 */
export function getConditionValues(condition: Pick<Condition, "value">): string[] {
  const raw = condition.value;
  if (raw === undefined || raw === null) {
    return [];
  }
  return raw.split(CONDITION_IN_VALUE_SEPARATOR);
}

/**
 * Populates {@link Condition.value} by joining `values` with the literal `^^` separator used on the
 * wire for the {@link KnownConditionOperator.In} / {@link KnownConditionOperator.NotIn} operators.
 * Mutates the supplied `condition` in place and returns it for chaining.
 */
export function setConditionValues<T extends { value: string }>(condition: T, values: readonly string[]): T {
  condition.value = values.join(CONDITION_IN_VALUE_SEPARATOR);
  return condition;
}

/**
 * Optional non-list properties forwarded onto the {@link Condition} created by
 * {@link createInCondition}.
 */
export interface CreateInConditionOptions {
  /** Dimension name used in filtering. */
  dimensionName?: string;
  /** Scalar function applied for filtering. */
  scalarFunction?: ScalarFunction;
  /** Defines the sampling type. */
  samplingType?: SamplingType;
}

/**
 * Builds a {@link Condition} for a list operator ({@link KnownConditionOperator.In} or
 * {@link KnownConditionOperator.NotIn}) by joining `values` with the wire `^^` separator.
 *
 * @throws Error when `operator` is not a list operator, `values` is empty, or an item contains the
 *         reserved `^^` separator.
 */
export function createInCondition(
  operator: ConditionOperator,
  values: readonly string[],
  options: CreateInConditionOptions = {},
): Condition {
  if (operator !== KnownConditionOperator.In && operator !== KnownConditionOperator.NotIn) {
    throw new Error(
      `createInCondition: operator must be KnownConditionOperator.In or KnownConditionOperator.NotIn; got '${operator}'.`,
    );
  }
  if (values.length === 0) {
    throw new Error("createInCondition: at least one value is required for list operators.");
  }
  values.forEach((item, index) => {
    if (item.includes(CONDITION_IN_VALUE_SEPARATOR)) {
      throw new Error(
        `createInCondition: value at index ${index} contains the reserved '${CONDITION_IN_VALUE_SEPARATOR}' separator.`,
      );
    }
  });
  return {
    operator,
    value: values.join(CONDITION_IN_VALUE_SEPARATOR),
    dimensionName: options.dimensionName,
    scalarFunction: options.scalarFunction,
    samplingType: options.samplingType,
  };
}
