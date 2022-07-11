// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TEditorData, getEditorData, getEditorValues } from "../src";
import { TOnChange, buildOnChange } from "../src";
import { assert } from "chai";
import valuesUrl from "./valuesUrl.json";

const valuesDefault = {
  foo: "from const",
  bar: 42,
};

describe("getEditorData", () => {
  let editorData: TEditorData<typeof valuesDefault>;

  it("runs", () => {
    editorData = getEditorData(valuesDefault);
    assert.isObject(editorData);
  });

  it("contains origin", () => {
    assert.deepEqual(Object.keys(editorData), Object.keys(valuesUrl));
  });
});

describe("getEditorValues", () => {
  let editorValues: typeof valuesDefault;

  it("runs", () => {
    editorValues = getEditorValues(valuesDefault);
    assert.isObject(editorValues);
  });

  it("contains values", () => {
    assert.containsAllKeys(editorValues, Object.keys(valuesDefault));
  });

  it("contains correct foo value", () => {
    assert.equal(editorValues.foo, valuesUrl.values.foo);
  });

  it("contains correct bar value", () => {
    assert.equal(editorValues.bar, valuesDefault.bar);
  });
});

describe("buildOnChange", () => {
  let onChange: TOnChange<typeof valuesDefault>;

  it("runs", () => {
    onChange = buildOnChange(valuesDefault);
    assert.isFunction(onChange);
  });

  it("reports values in valid form", () => {
    /* TODO come up with a solution to test post message
    const changedValueKey = "foo"
    const changedValues = {[changedValueKey]: "new value"}
    onChange(changedValues, (msg: any, targetOrigin) => {
      const data = msg[ON_CHANGE_MESSAGE_KEY]
      assert.equal(valuesUrl.instanceId, data.instanceId)
      assert.equal(changedValueKey, data.key)
      assert.equal(changedValues[changedValueKey], data.value)

      assert.equal(valuesUrl.origin, targetOrigin)
    })
     */
  });
});
