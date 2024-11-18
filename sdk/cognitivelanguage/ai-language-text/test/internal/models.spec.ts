// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AnalyzeAction, KnownAnalyzeTextLROTaskKind } from "../../src/generated/models";
import type { AnalyzeActionName, AnalyzeBatchActionName } from "../../src";
import type { AssertEqual } from "./utils";
import { assert } from "@azure-tools/test-utils";

describe("Models", function () {
  it("AnalyzeActionName", function () {
    const equalTypes: AssertEqual<AnalyzeActionName, AnalyzeAction["kind"]> = true;
    assert.isTrue(equalTypes);
  });
  it("AnalyzeBatchActionName", function () {
    const equalTypes: AssertEqual<
      AnalyzeBatchActionName,
      keyof typeof KnownAnalyzeTextLROTaskKind
    > = true;
    assert.isTrue(equalTypes);
  });
});
