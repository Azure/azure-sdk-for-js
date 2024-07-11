// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { APIM_EDITOR_DATA_KEY } from "../../src/index.js";
import { getEditorValuesPure, getValuesPure, getWidgetDataPure } from "../../src/utils.js";
import { describe, it, assert } from "vitest";

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
