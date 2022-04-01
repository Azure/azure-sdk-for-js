// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  checkAndFormatIfAndIfNoneMatch,
  extractAfterTokenFromNextLink,
  formatFieldsForSelect,
  formatFiltersAndSelect,
  makeConfigurationSettingEmpty,
  quoteETag,
  serializeAsConfigurationSettingParam,
  transformKeyValue,
  transformKeyValueResponse,
  transformKeyValueResponseWithStatusCode,
} from "../../src/internal/helpers";
import { assert } from "chai";
import {
  ConfigurationSetting,
  ConfigurationSettingParam,
  HttpResponseFields,
  featureFlagContentType,
  secretReferenceContentType,
} from "../../src";
import { FeatureFlagValue } from "../../src/featureFlag";
import { SecretReferenceValue } from "../../src/secretReference";

describe("helper methods", () => {
  it("checkAndFormatIfAndIfNoneMatch", () => {
    const key = "ignored";

    assert.deepEqual(
      {
        ifMatch: undefined,
        ifNoneMatch: undefined,
      },
      checkAndFormatIfAndIfNoneMatch({ key }, {})
    );

    assert.deepEqual(
      {
        ifMatch: '"hello"',
        ifNoneMatch: undefined,
      },
      checkAndFormatIfAndIfNoneMatch(
        { key, etag: "hello" },
        {
          onlyIfUnchanged: true,
        }
      )
    );

    assert.deepEqual(
      {
        ifNoneMatch: '"hello"',
        ifMatch: undefined,
      },
      checkAndFormatIfAndIfNoneMatch(
        { key, etag: "hello" },
        {
          onlyIfChanged: true,
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
            onlyIfUnchanged: true,
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
      const result = formatFiltersAndSelect({
        keyFilter: undefined,
        labelFilter: undefined,
      });

      assert.ok(!result.key);
      assert.ok(!result.label);
    });

    it("single values only", () => {
      const result = formatFiltersAndSelect({
        keyFilter: "key1",
        labelFilter: "label1",
      });

      assert.equal("key1", result.key);
      assert.equal("label1", result.label);
    });

    it("multiple values", () => {
      const result = formatFiltersAndSelect({
        keyFilter: "key1,key2",
        labelFilter: "label1,label2",
      });

      assert.equal("key1,key2", result.key);
      assert.equal("label1,label2", result.label);
    });

    it("fields map properly", () => {
      const result = formatFiltersAndSelect({
        fields: ["isReadOnly", "value"],
      });

      assert.deepEqual(["locked", "value"], result.select);
    });
  });

  describe("extractAfterTokenFromNextLink", () => {
    it("token is extracted and properly unescaped", () => {
      const token = extractAfterTokenFromNextLink("/kv?key=someKey&api-version=1.0&after=bGlah%3D");
      assert.equal("bGlah=", token);
    });
  });

  describe("serializeAsConfigurationSettingParam", () => {
    [`[]`, "Hello World"].forEach((value) => {
      // These values are unexpected for feature flag or secret reference config setting
      // These tests make sure the latest version supports such settings where the value is unexpected
      // as well because the older versions of the SDK support such cases.
      // These tests make sure the SDK is not broken for the users with such use cases.
      it(`serializer doesn't throw on ${value} as feature flag value`, () => {
        const featureFlag: ConfigurationSetting<FeatureFlagValue> = {
          contentType: featureFlagContentType,
          key: "key",
          isReadOnly: false,
          value: { conditions: { clientFilters: [] }, enabled: true },
        };
        featureFlag.value = value as any;
        assert.deepEqual(
          serializeAsConfigurationSettingParam(featureFlag),
          featureFlag as unknown as ConfigurationSettingParam<string>,
          "setting was modified"
        );
      });

      it(`serializer doesn't throw on ${value} as secret reference value`, () => {
        const setting: ConfigurationSetting<SecretReferenceValue> = {
          contentType: secretReferenceContentType,
          key: "key",
          isReadOnly: false,
          value: { secretId: "abc" },
        };
        setting.value = value as any;
        assert.deepEqual(
          serializeAsConfigurationSettingParam(setting),
          setting as any,
          "setting was modified"
        );
      });
    });
  });

  it("makeConfigurationSettingEmpty", () => {
    const response: ConfigurationSetting & HttpResponseFields = {
      key: "mykey",
      statusCode: 204,
      isReadOnly: false,
    };

    makeConfigurationSettingEmpty(response);

    // key isn't touched
    assert.equal("mykey", response.key);

    for (const name of getAllConfigurationSettingFieldsMinusKey()) {
      assert.ok(!response[name], name);
    }

    assert.equal(204, response.statusCode);
  });

  it("transformKeyValue", () => {
    const configurationSetting = transformKeyValue({
      key: "hello",
      locked: true,
    });

    assert.deepEqual(configurationSetting as unknown, {
      // the 'locked' property should not be present in the object since
      // it should be 'renamed' to readOnly
      isReadOnly: true,
      key: "hello",
      value: undefined,
    });
  });

  it("transformKeyValueResponseWithStatusCode", () => {
    const configurationSetting = transformKeyValueResponseWithStatusCode(
      {
        key: "hello",
        locked: true,
      },
      204
    );

    const actualKeys = Object.keys(configurationSetting).sort();

    assert.deepEqual(actualKeys, ["isReadOnly", "key", "statusCode", "value"]);

    assert.deepEqual(configurationSetting, {
      isReadOnly: true,
      key: "hello",
      value: undefined,
      statusCode: 204,
    });
  });

  it("transformKeyValueResponse", () => {
    const configurationSetting = transformKeyValueResponse({
      key: "hello",
      locked: true,
    });

    const actualKeys = Object.keys(configurationSetting).sort();

    assert.deepEqual(actualKeys, ["isReadOnly", "key", "value"]);

    assert.deepEqual(configurationSetting, {
      isReadOnly: true,
      key: "hello",
      value: undefined,
    });
  });

  it("normalizeFilterFields", () => {
    const fields = getAllConfigurationSettingFields();

    assert.deepEqual(formatFieldsForSelect(fields)!.sort(), [
      "content_type",
      "etag",
      "key",
      "label",
      "last_modified",
      "locked", // isReadOnly maps to this
      "tags",
      "value",
    ]);

    assert.ok(formatFieldsForSelect(undefined) === undefined);
    assert.deepEqual(formatFieldsForSelect([]), []);
  });

  /**
   * Gets all the properties from ConfigurationSetting, sorted ascending.
   *
   * @returns All property names, sorted ascending.
   */
  function getAllConfigurationSettingFields(): (keyof ConfigurationSetting)[] {
    const configObjectWithAllFieldsRequired: Required<ConfigurationSetting> = {
      contentType: "",
      etag: "",
      key: "",
      label: "",
      lastModified: new Date(),
      isReadOnly: true,
      tags: {},
      value: "",
    };

    return Object.keys(configObjectWithAllFieldsRequired).sort() as (keyof ConfigurationSetting)[];
  }

  function getAllConfigurationSettingFieldsMinusKey(): Exclude<
    keyof ConfigurationSetting,
    "key"
  >[] {
    const keys = getAllConfigurationSettingFields().filter((key) => key !== "key");

    return keys as Exclude<keyof ConfigurationSetting, "key">[];
  }
});
