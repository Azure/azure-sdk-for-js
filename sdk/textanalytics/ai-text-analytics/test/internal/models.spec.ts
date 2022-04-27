// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AnalyzeAction } from "../../src/generated/models";
import { AnalyzeActionName } from "../../src";
import { AssertEqual } from "./utils";
import { assert } from "@azure/test-utils";

describe("Models", function () {
  describe("AnalyzeActionName", function () {
    const equalTypes: AssertEqual<AnalyzeActionName, AnalyzeAction["kind"]> = true;
    assert.isTrue(equalTypes);
  });
});
