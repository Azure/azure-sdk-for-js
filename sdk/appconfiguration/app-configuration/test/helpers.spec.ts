// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { checkAndFormatIfAndIfNoneMatch, formatWildcards, extractAfterTokenFromNextLink, quoteETag, makeConfigurationSettingsFieldsThrow } from "../src/internal/helpers"
import * as assert from "assert";
import { ConfigurationSetting, HttpResponseField, AppConfigurationClient, HttpResponseFields } from '../src';
import { HttpHeaders, ResponseBodyNotFoundError } from '@azure/core-http';

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

  it("makeConfigurationSettingsFieldsThrow", () => {
    const response: ConfigurationSetting & HttpResponseField<any> & HttpResponseFields = {
      key: "undefined",
      _response: {
        request: {
          url: "unused",
          abortSignal: {
            aborted: true,
            addEventListener: () => { },
            removeEventListener: () => { }
          },
          method: "GET",
          withCredentials: false,
          headers: new HttpHeaders(),
          timeout: 0,
          clone: function () { return this; },
          validateRequestProperties: () => { },
          prepare: function (options) { return this; },
        },
        status: 204,
        headers: new HttpHeaders(),
        bodyAsText: "",
        parsedHeaders: {}
      },
      statusCode: 204
    };

    makeConfigurationSettingsFieldsThrow(response,
      "My error message",
      "My error code");
    
    for (const name of getAllConfigurationSettingFields()) {
      assert.throws(() => response[name], (err: ResponseBodyNotFoundError) => {
        assert.equal("ResponseBodyNotFoundError", err.name);
        assert.equal("My error message", err.message);
        assert.equal("My error code", err.code);
        assert.strictEqual(response._response, err.response);
        return true;
      });
    }

    // These point is these properties are untouched and won't throw
    // since they're the only properties the user is allowed to touch on these 
    // "body empty" objects.
    assert.equal(204, response._response.status);
    assert.equal(204, response.statusCode);
  });

  function getAllConfigurationSettingFields() : (keyof ConfigurationSetting)[] {
    const configObjectWithAllFieldsRequired: Required<ConfigurationSetting> = {
      contentType: "",
      etag: "",
      key: "",
      label: "",
      lastModified: new Date(),
      locked: true,
      tags: {},
      value: ""
    };   
    
    return Object.keys(configObjectWithAllFieldsRequired) as (keyof ConfigurationSetting)[];    
  }
})
