// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AnalyzeAction, KnownAnalyzeTextLROTaskKind } from "../../src/generated/models";
import { AnalyzeActionName, AnalyzeBatchActionName } from "../../src";
import { AssertEqual } from "./utils";
import { assert } from "@azure/test-utils";

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
