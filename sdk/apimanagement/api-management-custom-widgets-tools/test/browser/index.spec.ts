// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  APIM_EDITOR_DATA_KEY,
  APIM_ON_CHANGE_MESSAGE_KEY,
  onChangeWithOrigin,
} from "../../src/index.js";
import { getEditorValuesPure, getValuesPure, getWidgetDataPure } from "../../src/utils.js";
import { describe, it, assert, vi } from "vitest";

const valuesUrl = {
  origin: "http://localhost:8000",
  environment: "test",
  instanceId: "123",
  values: {
    foo: "from url",
  },
};

const valuesDefault = {
  foo: "from const",
  bar: 42,
};

const urlSearchPrams = new URLSearchParams([[APIM_EDITOR_DATA_KEY, JSON.stringify(valuesUrl)]]);

describe("getEditorData", () => {
  it("runs", () => {
    const editorData = getWidgetDataPure(urlSearchPrams);
    assert.isObject(editorData);
  });

  it("contains origin", () => {
    const editorData = getWidgetDataPure(urlSearchPrams);
    assert.deepEqual(Object.keys(editorData), Object.keys(valuesUrl));
  });
});

describe("getValues", () => {
  it("runs", () => {
    const values = getValuesPure(valuesDefault, urlSearchPrams);
    assert.isObject(values);
  });

  it("contains values", () => {
    const values = getValuesPure(valuesDefault, urlSearchPrams);
    assert.containsAllKeys(values, Object.keys(valuesDefault));
  });

  it("contains correct foo value", () => {
    const values = getValuesPure(valuesDefault, urlSearchPrams);
    assert.equal(values.foo, valuesUrl.values.foo);
  });

  it("contains correct bar value", () => {
    const values = getValuesPure(valuesDefault, urlSearchPrams);
    assert.equal(values.bar, valuesDefault.bar);
  });
});

describe("getEditorValues", () => {
  it("runs", () => {
    const editorValues = getEditorValuesPure(urlSearchPrams);
    assert.isObject(editorValues);
  });

  it("contains values", () => {
    const editorValues = getEditorValuesPure(urlSearchPrams);
    assert.containsAllKeys(editorValues, Object.keys(valuesUrl.values));
  });

  it("contains correct foo value", () => {
    const editorValues = getEditorValuesPure(urlSearchPrams);
    assert.equal(editorValues.foo, valuesUrl.values.foo);
  });

  it("contains correct bar value", () => {
    const editorValues = getEditorValuesPure(urlSearchPrams);
    assert.equal(editorValues.bar, undefined);
  });
});

describe("onChangeWithOrigin", () => {
  it("reports values in valid form", () => {
    const changedValueKey = "foo";
    const changedValues = { [changedValueKey]: "new value" };

    vi.spyOn(self.parent, "postMessage").mockImplementation((msg, targetOrigin: any) => {
      const data = msg[APIM_ON_CHANGE_MESSAGE_KEY];
      assert.equal(valuesUrl.instanceId, data.instanceId);
      assert.equal(changedValueKey, data.key);
      assert.equal(changedValues[changedValueKey], data.value);

      assert.equal(valuesUrl.origin, targetOrigin);
    });

    onChangeWithOrigin(valuesUrl.origin, valuesUrl.instanceId, changedValues);
  });
});
