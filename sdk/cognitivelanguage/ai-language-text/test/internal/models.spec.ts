// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AnalyzeAction,
  KnownAnalyzeTextLROTaskKind,
} from "$internal/generated/models/index.js";
import type { AnalyzeActionName, AnalyzeBatchActionName } from "@azure/ai-language-text";
import type { AssertEqual } from "./utils.js";
import { describe, it, assert } from "vitest";

describe("Models", () => {
  it("AnalyzeActionName", () => {
    const equalTypes: AssertEqual<AnalyzeActionName, AnalyzeAction["kind"]> = true;
    assert.isTrue(equalTypes);
  });
  it("AnalyzeBatchActionName", () => {
    const equalTypes: AssertEqual<
      AnalyzeBatchActionName,
      keyof typeof KnownAnalyzeTextLROTaskKind
    > = true;
    assert.isTrue(equalTypes);
  });
});
