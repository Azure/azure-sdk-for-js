// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { checkAndFormatIfAndIfNoneMatch } from "../src/internal/helpers"
import * as assert from "assert";

describe("helper methods", () => {
  const key = "ignored";

  it("checkAndFormatIfAndIfNoneMatch", () => {    
    assert.deepEqual({
      ifMatch: undefined,
      ifNoneMatch: undefined
    }, checkAndFormatIfAndIfNoneMatch({ key }, {}));

    assert.deepEqual({
      ifMatch: "\"hello\"",
      ifNoneMatch: undefined
    }, checkAndFormatIfAndIfNoneMatch({ key, etag: "hello" }, {
      onlyIfUnchanged: true
    }));

    assert.deepEqual({
      ifNoneMatch: "\"hello\"",
      ifMatch: undefined
    }, checkAndFormatIfAndIfNoneMatch({ key, etag: "hello" }, {
      onlyIfChanged: true
    }));
  });

  it("checkAndFormatIfAndIfNoneMatch - mutually exclusive", () => {
    assert.throws(() => checkAndFormatIfAndIfNoneMatch({ key, etag: "won't get used"}, {
      onlyIfChanged: true,
      onlyIfUnchanged: true
    }), /onlyIfChanged and onlyIfUnchanged are mutually-exclusive/);    
  });
})