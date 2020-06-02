// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  checkAndFormatIfAndIfNoneMatch,
  formatWildcards,
  extractAfterTokenFromNextLink,
  quoteETag,
  makeConfigurationSettingEmpty,
  transformKeyValue,
  transformKeyValueResponseWithStatusCode,
  transformKeyValueResponse
} from "../src/internal/helpers";
import * as assert from "assert";
import { ConfigurationSetting, HttpResponseField, HttpResponseFields } from "../src";
import { HttpHeaders } from "@azure/core-http";

describe("helper methods", () => {
  it("checkAndFormatIfAndIfNoneMatch", () => {
    const key = "ignored";

    assert.deepEqual(
      {
        ifMatch: undefined,
        ifNoneMatch: undefined
      },
      checkAndFormatIfAndIfNoneMatch({ key }, {})
    );

    assert.deepEqual(
      {
        ifMatch: '"hello"',
        ifNoneMatch: undefined
      },
      checkAndFormatIfAndIfNoneMatch(
        { key, etag: "hello" },
        {
          onlyIfUnchanged: true
        }
      )
    );

    assert.deepEqual(
      {
        ifNoneMatch: '"hello"',
        ifMatch: undefined
      },
      checkAndFormatIfAndIfNoneMatch(
        { key, etag: "hello" },
        {
          onlyIfChanged: true
        }
      )
    );
  });

  it("checkAndFormatIfAndIfNoneMatch - mutually exclusive", () => {
    const key = "ignored";

    assert.throws(
      () =>
        checkAndFormatIfAndIfNoneMatch(
          { key, etag: "won't get used" },
          {
            onlyIfChanged: true,
            onlyIfUnchanged: true
          }
        ),
      /onlyIfChanged and onlyIfUnchanged are mutually-exclusive/
    );
  });

  describe("quoteETag", () => {
    it("undefined", () => {
      assert.equal(undefined, quoteETag(undefined));

      assert.equal('"etagishere"', quoteETag("etagishere"));

      assert.equal("'etagishere'", quoteETag("'etagishere'"));

      assert.equal("*", quoteETag("*"));
    });
  });

  describe("formatWildcards", () => {
    it("undefined", () => {
      const result = formatWildcards({
        keyFilter: undefined,
        labelFilter: undefined
      });

      assert.ok(!result.key);
      assert.ok(!result.label);
    });

    it("single values only", () => {
      const result = formatWildcards({
        keyFilter: "key1",
        labelFilter: "label1"
      });

      assert.equal("key1", result.key);
      assert.equal("label1", result.label);
    });

    it("multiple values", () => {
      const result = formatWildcards({
        keyFilter: "key1,key2",
        labelFilter: "label1,label2"
      });

      assert.equal("key1,key2", result.key);
      assert.equal("label1,label2", result.label);
    });

    it("fields map properly", () => {
      const result = formatWildcards({
        fields: ["isReadOnly", "value"]
      });

      assert.deepEqual(["locked", "value"], result.select);
    });
  });

  describe("extractAfterTokenFromNextLink", () => {
    it("token is extracted and properly unescaped", () => {
      let token = extractAfterTokenFromNextLink("/kv?key=someKey&api-version=1.0&after=bGlah%3D");
      assert.equal("bGlah=", token);
    });
  });

  it("makeConfigurationSettingEmpty", () => {
    const response: ConfigurationSetting & HttpResponseField<any> & HttpResponseFields = {
      key: "mykey",
      statusCode: 204,
      isReadOnly: false,
      ...fakeHttp204Response
    };

    makeConfigurationSettingEmpty(response);

    // key isn't touched
    assert.equal("mykey", response.key);

    for (const name of getAllConfigurationSettingFields()) {
      assert.ok(!response[name], name);
    }

    // These point is these properties are untouched and won't throw
    // since they're the only properties the user is allowed to touch on these
    // "body empty" objects.
    assert.equal(204, response._response.status);
    assert.equal(204, response.statusCode);
  });

  it("transformKeyValue", () => {
    const configurationSetting = transformKeyValue({
      key: "hello",
      locked: true
    });

    assert.deepEqual(
      {
        // the 'locked' property should not be present in the object since
        // it should be 'renamed' to readOnly
        isReadOnly: true,
        key: "hello"
      },
      configurationSetting
    );
  });

  it("transformKeyValueResponseWithStatusCode", () => {
    const configurationSetting = transformKeyValueResponseWithStatusCode({
      key: "hello",
      locked: true,
      ...fakeHttp204Response
    });

    const actualKeys = Object.keys(configurationSetting).sort();

    // _response is explictly set to not enumerate, even in our copied object.
    assert.deepEqual(["isReadOnly", "key", "statusCode"], actualKeys);

    // now make it enumerable so we can do our comparison
    Object.defineProperty(configurationSetting, "_response", {
      enumerable: true
    });

    assert.deepEqual(
      {
        isReadOnly: true,
        key: "hello",

        statusCode: 204,
        _response: fakeHttp204Response._response
      },
      configurationSetting
    );
  });

  it("transformKeyValueResponse", () => {
    const configurationSetting = transformKeyValueResponse({
      key: "hello",
      locked: true,
      ...fakeHttp204Response
    });

    const actualKeys = Object.keys(configurationSetting).sort();

    // _response is explictly set to not enumerate, even in our copied object.
    assert.deepEqual(["isReadOnly", "key"], actualKeys);

    // now make it enumerable so we can do our comparison
    Object.defineProperty(configurationSetting, "_response", {
      enumerable: true
    });

    assert.deepEqual(
      {
        isReadOnly: true,
        key: "hello",
        _response: fakeHttp204Response._response
      },
      configurationSetting
    );
  });

  function getAllConfigurationSettingFields(): Exclude<keyof ConfigurationSetting, "key">[] {
    const configObjectWithAllFieldsRequired: Required<ConfigurationSetting> = {
      contentType: "",
      etag: "",
      key: "",
      label: "",
      lastModified: new Date(),
      isReadOnly: true,
      tags: {},
      value: ""
    };

    const keys = Object.keys(configObjectWithAllFieldsRequired).filter((key) => key !== "key");
    return keys as Exclude<keyof ConfigurationSetting, "key">[];
  }

  const fakeHttp204Response: HttpResponseField<any> = {
    _response: {
      request: {
        url: "unused",
        abortSignal: {
          aborted: true,
          addEventListener: () => {},
          removeEventListener: () => {}
        },
        method: "GET",
        withCredentials: false,
        headers: new HttpHeaders(),
        timeout: 0,
        requestId: "",
        clone: function() {
          return this;
        },
        validateRequestProperties: () => {},
        prepare: function() {
          return this;
        }
      },
      status: 204,
      headers: new HttpHeaders(),
      bodyAsText: "",
      parsedHeaders: {}
    }
  };
});
