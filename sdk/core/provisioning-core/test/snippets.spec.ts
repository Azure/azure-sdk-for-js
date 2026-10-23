// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  asDiscriminator,
  ParameterCollection,
  type ExpressionOrValue,
} from "@azure/provisioning-core";
import { describe, it } from "vitest";

type RuleInput =
  | {
      kind: "cache";
      cacheKind: ExpressionOrValue<"long" | "short">;
      days: ExpressionOrValue<number>;
    }
  | {
      kind: "redirect";
      url: ExpressionOrValue<string>;
    };

describe("documentation snippets", () => {
  const kindParam = new ParameterCollection().add("ruleKind", "string", {
    allowed: ["cache"],
  });
  const widget: { properties: { primaryRule?: RuleInput } } = {
    properties: {},
  };

  it("AsDiscriminator", () => {
    widget.properties.primaryRule = {
      kind: asDiscriminator(kindParam),
      cacheKind: "long",
      days: 7,
    };
  });
});
