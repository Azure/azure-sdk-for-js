// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { checkAndFormatIfAndIfNoneMatch } from "../src/internal/helpers"
import * as assert from "assert";

describe("helper methods", () => {
  it("checkAndFormatIfAndIfNoneMatch", () => {
    assert.deepEqual({
      ifMatch: undefined,
      ifNoneMatch: undefined
    }, checkAndFormatIfAndIfNoneMatch({}));

    assert.deepEqual({
      ifMatch: "\"hello\"",
      ifNoneMatch: undefined
    }, checkAndFormatIfAndIfNoneMatch({
      ifMatch: "hello"
    }));

    assert.deepEqual({
      ifNoneMatch: "\"hello\"",
      ifMatch: undefined
    }, checkAndFormatIfAndIfNoneMatch({
      ifNoneMatch: "\"hello\"",
      ifMatch: undefined,
    }));
  });

  it("checkAndFormatIfAndIfNoneMatch - mutually exclusive", () => {
    assert.throws(() => checkAndFormatIfAndIfNoneMatch({
      ifMatch: "'hello'",
      ifNoneMatch: "\"world\""
    }), /^Error: ifMatch and ifNoneMatch are mutually-exclusive/);    
  });
})