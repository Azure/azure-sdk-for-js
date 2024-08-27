// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/* eslint-disable no-invalid-this */
import { odata } from "../src/utils";
import { assert } from "chai";

describe("Can parse odata to string", function () {
  it("can wrap different types as expected", async () => {
    const userId = "vic's";
    const anonymous = null;
    const length = 3;
    const filter = odata`userId eq ${anonymous} or userId eq ${userId} or length(userId) gt ${length}`;
    assert.equal("userId eq null or userId eq 'vic''s' or length(userId) gt 3", filter);
  });
});
