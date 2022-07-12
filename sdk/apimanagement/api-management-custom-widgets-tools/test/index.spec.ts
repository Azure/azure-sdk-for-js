// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ON_CHANGE_MESSAGE_KEY,
  TEditorData,
  TOnChange,
  buildOnChange,
  getEditorData,
  getEditorValues, EDITOR_DATA_KEY,
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

describe("getEditorData", () => {
  let editorData: TEditorData<typeof valuesDefault>;

  it("runs", () => {
    editorData = getEditorData(valuesDefault);
    assert.isObject(editorData);
  });

  it("contains origin", () => {
    console.log({editorData, valuesUrl})
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
    console.log(editorValues.foo, valuesUrl.values.foo)
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
    const changedValueKey = "foo";
    const changedValues = { [changedValueKey]: "new value" };

    sinon.stub(self.parent, "postMessage").callsFake((msg, targetOrigin: any) => {
      console.log({ msg, targetOrigin }); // TODO

      const data = msg[ON_CHANGE_MESSAGE_KEY];
      assert.equal(valuesUrl.instanceId, data.instanceId);
      assert.equal(changedValueKey, data.key);
      assert.equal(changedValues[changedValueKey], data.value);

      assert.equal(valuesUrl.origin, targetOrigin);
    });
    onChange(changedValues);
  });
});
