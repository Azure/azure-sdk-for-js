// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ON_CHANGE_MESSAGE_KEY,
  getEditorData,
  getEditorValues,
  EDITOR_DATA_KEY,
  onChangeWithOrigin,
} from "../src"
import { assert } from "chai";
import sinon from "sinon";
import valuesUrl from "./valuesUrl.json";

const valuesDefault = {
  foo: "from const",
  bar: 42,
};

const searchParams = new URLSearchParams("https://localhost:3000");
searchParams.set(EDITOR_DATA_KEY, JSON.stringify(valuesUrl));

/*
describe("getEditorData", () => {
  it("runs", () => {
    const editorData = getEditorData(valuesDefault);
    assert.isObject(editorData);
  });

  it("contains origin", () => {
    const editorData = getEditorData(valuesDefault);
    assert.deepEqual(Object.keys(editorData), Object.keys(valuesUrl));
  });
});

describe("getEditorValues", () => {
  it("runs", () => {
    const editorValues = getEditorValues(valuesDefault);
    assert.isObject(editorValues);
  });

  it("contains values", () => {
    const editorValues = getEditorValues(valuesDefault);
    assert.containsAllKeys(editorValues, Object.keys(valuesDefault));
  });

  it("contains correct foo value", () => {
    const editorValues = getEditorValues(valuesDefault);
    assert.equal(editorValues.foo, valuesUrl.values.foo);
  });

  it("contains correct bar value", () => {
    const editorValues = getEditorValues(valuesDefault);
    assert.equal(editorValues.bar, valuesDefault.bar);
  });
});

describe("buildOnChange", () => {
  it("runs", () => {
    const onChange = buildOnChange(valuesDefault);
    assert.isFunction(onChange);
  });
*/

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
