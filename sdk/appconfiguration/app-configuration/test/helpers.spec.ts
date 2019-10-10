// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { checkAndFormatIfAndIfNoneMatch, formatWildcards, extractAfterTokenFromNextLink, quoteETag } from "../src/internal/helpers"
import * as assert from "assert";

describe("helper methods", () => {
  it("checkAndFormatIfAndIfNoneMatch", () => {    
    const key = "ignored";

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
    const key = "ignored";
    
    assert.throws(() => checkAndFormatIfAndIfNoneMatch({ key, etag: "won't get used"}, {
      onlyIfChanged: true,
      onlyIfUnchanged: true
    }), /onlyIfChanged and onlyIfUnchanged are mutually-exclusive/);    
  });

  describe("quoteETag", () => {
    it("undefined", () => {
      assert.equal(
        undefined,
        quoteETag(undefined)
      );
  
      assert.equal(
        '"etagishere"',
        quoteETag("etagishere")
      );
  
      assert.equal(
        "'etagishere'",
        quoteETag("'etagishere'")
      );
  
      assert.equal(
        "*",
        quoteETag("*")
      );
    });
  });
  
  describe("formatWildcards", () => {
    it("undefined", () => {
      const result = formatWildcards({
        keys: undefined,
        labels: undefined
      });
  
      assert.ok(!result.key);
      assert.ok(!result.label);
    });
  
    it("single values only", () => {
      const result = formatWildcards({
        keys: ["key1"],
        labels: ["label1"]
      });
  
      assert.equal("key1", result.key);
      assert.equal("label1", result.label);
    });
  
    it("multiple values", () => {
      const result = formatWildcards({
        keys: ["key1", "key2"],
        labels: ["label1", "label2"]
      });
  
      assert.equal("key1,key2", result.key);
      assert.equal("label1,label2", result.label);
    });
  });
  
  describe("extractAfterTokenFromNextLink", () => {
    it("token is extracted and properly unescaped", () => {
      let token = extractAfterTokenFromNextLink(
        "/kv?key=someKey&api-version=1.0&after=bGlah%3D"
      );
      assert.equal("bGlah=", token);
    });
  });
})
