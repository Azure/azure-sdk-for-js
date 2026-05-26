// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  CONDITION_IN_VALUE_SEPARATOR,
  createInCondition,
  getConditionValues,
  KnownConditionOperator,
  setConditionValues,
} from "../src/index.js";

describe("Condition values helpers", () => {
  it("getConditionValues splits on the ^^ separator", () => {
    expect(getConditionValues({ value: "east^^west^^north" })).toEqual(["east", "west", "north"]);
  });

  it("getConditionValues returns an empty array when value is undefined", () => {
    expect(getConditionValues({ value: undefined as unknown as string })).toEqual([]);
  });

  it("setConditionValues joins with the ^^ separator", () => {
    const condition = { value: "placeholder" };
    setConditionValues(condition, ["east", "west"]);
    expect(condition.value).toBe("east^^west");
  });

  it("createInCondition builds an In condition", () => {
    const condition = createInCondition(KnownConditionOperator.In, ["east", "west"], {
      dimensionName: "region",
    });
    expect(condition.operator).toBe(KnownConditionOperator.In);
    expect(condition.value).toBe("east^^west");
    expect(condition.dimensionName).toBe("region");
  });

  it("createInCondition builds a NotIn condition", () => {
    const condition = createInCondition(KnownConditionOperator.NotIn, ["only"]);
    expect(condition.operator).toBe(KnownConditionOperator.NotIn);
    expect(condition.value).toBe("only");
  });

  it("createInCondition rejects wrong operators", () => {
    expect(() => createInCondition(KnownConditionOperator.Equal, ["east"])).toThrow(
      /must be KnownConditionOperator\.In or KnownConditionOperator\.NotIn/,
    );
  });

  it("createInCondition rejects empty values", () => {
    expect(() => createInCondition(KnownConditionOperator.In, [])).toThrow(
      /at least one value is required/,
    );
  });

  it("createInCondition rejects items containing the separator", () => {
    expect(() => createInCondition(KnownConditionOperator.In, ["ok", "bad^^value"])).toThrow(
      /reserved '\^\^' separator/,
    );
  });

  it("CONDITION_IN_VALUE_SEPARATOR is the wire separator", () => {
    expect(CONDITION_IN_VALUE_SEPARATOR).toBe("^^");
  });
});
