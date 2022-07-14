// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EDITOR_DATA_KEY, ON_CHANGE_MESSAGE_KEY, onChangeWithOrigin } from "../src";
import { getEditorDataPure, getEditorValuesPure } from "../src/utils";
import { assert } from "chai";
import sinon from "sinon";
import valuesUrl from "./valuesUrl.json";

const valuesDefault = {
  foo: "from const",
  bar: 42,
};

const urlSearchPrams = new URLSearchParams([[EDITOR_DATA_KEY, JSON.stringify(valuesUrl)]]);

describe("getEditorData", () => {
  it("runs", () => {
    const editorData = getEditorDataPure(valuesDefault, urlSearchPrams);
    assert.isObject(editorData);
  });

  it("contains origin", () => {
    const editorData = getEditorDataPure(valuesDefault, urlSearchPrams);
    assert.deepEqual(Object.keys(editorData), Object.keys(valuesUrl));
  });
});

describe("getEditorValues", () => {
  it("runs", () => {
    const editorValues = getEditorValuesPure(valuesDefault, urlSearchPrams);
    assert.isObject(editorValues);
  });

  it("contains values", () => {
    const editorValues = getEditorValuesPure(valuesDefault, urlSearchPrams);
    assert.containsAllKeys(editorValues, Object.keys(valuesDefault));
  });

  it("contains correct foo value", () => {
    const editorValues = getEditorValuesPure(valuesDefault, urlSearchPrams);
    assert.equal(editorValues.foo, valuesUrl.values.foo);
  });

  it("contains correct bar value", () => {
    const editorValues = getEditorValuesPure(valuesDefault, urlSearchPrams);
    assert.equal(editorValues.bar, valuesDefault.bar);
  });
});

describe("onChangeWithOrigin", () => {
  it("reports values in valid form", () => {
    const changedValueKey = "foo";
    const changedValues = { [changedValueKey]: "new value" };

    sinon.stub(self.parent, "postMessage").callsFake((msg, targetOrigin: any) => {
      const data = msg[ON_CHANGE_MESSAGE_KEY];
      assert.equal(valuesUrl.instanceId, data.instanceId);
      assert.equal(changedValueKey, data.key);
      assert.equal(changedValues[changedValueKey], data.value);

      assert.equal(valuesUrl.origin, targetOrigin);
    });
    onChangeWithOrigin(valuesUrl.origin, valuesUrl.instanceId, changedValues);
  });
});
