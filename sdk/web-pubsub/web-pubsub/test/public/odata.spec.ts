// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { odata } from "@azure/web-pubsub";
import { describe, it, assert } from "vitest";

describe("Can parse odata to string", () => {
  it("can wrap different types as expected", () => {
    const userId = "vic's";
    const anonymous = null;
    const length = 3;
    const filter = odata`userId eq ${anonymous} or userId eq ${userId} or length(userId) gt ${length}`;
    assert.equal("userId eq null or userId eq 'vic''s' or length(userId) gt 3", filter);
  });
});
