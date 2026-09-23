// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GitHubActionsCredential } from "@azure/identity";
import { assert, describe, it } from "vitest";

describe("GitHubActionsCredential", function () {
  it("is unavailable in the browser", function () {
    assert.throws(
      () => new GitHubActionsCredential(),
      /GitHubActionsCredential is not supported in the browser/,
    );
  });
});
