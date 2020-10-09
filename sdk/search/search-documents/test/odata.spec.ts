// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { odata } from "../src/odata";

describe("odata", () => {
  it("simple string isn't changed", () => {
    const result = odata`Rooms/any(room: room/BaseRate lt 200) and Rating ge 4`;
    assert.strictEqual(result, "Rooms/any(room: room/BaseRate lt 200) and Rating ge 4");
  });

  it("substitutions are incorporated", () => {
    const rate = 200;
    const rating = 4;
    const result = odata`Rooms/any(room: room/BaseRate lt ${rate}) and Rating ge ${rating}`;
    assert.strictEqual(result, "Rooms/any(room: room/BaseRate lt 200) and Rating ge 4");
  });

  it("literals are escaped", () => {
    const value = "you're";
    const result = odata`search.ismatch('${value}', 'Description')`;
    assert.strictEqual(result, "search.ismatch('you''re', 'Description')");
  });

  it("unquoted literals are quoted", () => {
    const value = "you're";
    const result = odata`search.ismatch(${value}, 'Description')`;
    assert.strictEqual(result, "search.ismatch('you''re', 'Description')");
  });

  it("no arguments", () => {
    assert.strictEqual(odata`Foo eq 2`, "Foo eq 2");
  });

  it("one argument", () => {
    assert.strictEqual(odata`Foo eq ${2}`, "Foo eq 2");
  });

  it("many arguments", () => {
    assert.strictEqual(
      odata`Foo eq ${2} and Bar eq ${3} and Baz eq ${4} and Qux eq ${5} and Quux eq ${6}`,
      "Foo eq 2 and Bar eq 3 and Baz eq 4 and Qux eq 5 and Quux eq 6"
    );
  });

  it("null", () => {
    assert.strictEqual(odata`Foo eq ${null}`, "Foo eq null");
  });

  it("bool", () => {
    const x: boolean = true;
    assert.strictEqual(odata`Foo eq ${x}`, "Foo eq true");
    assert.strictEqual(odata`Foo eq ${true}`, "Foo eq true");
  });

  it("numbers", () => {
    assert.strictEqual(odata`Foo eq ${0}`, "Foo eq 0");
    assert.strictEqual(odata`Foo eq ${2}`, "Foo eq 2");
    assert.strictEqual(odata`Foo eq ${-2}`, "Foo eq -2");
    assert.strictEqual(odata`Foo eq ${2.5}`, "Foo eq 2.5");
  });

  it("limits", () => {
    assert.strictEqual(odata`Foo eq ${Number.NEGATIVE_INFINITY}`, "Foo eq -Infinity");
    assert.strictEqual(odata`Foo eq ${Number.POSITIVE_INFINITY}`, "Foo eq Infinity");
    assert.strictEqual(odata`Foo eq ${Number.NaN}`, "Foo eq NaN");
  });

  it("dates", () => {
    const result: string = odata`Foo eq ${new Date(1912, 6, 23, 11, 59, 59)}`;
    assert.strictEqual(result.includes("Tue Jul 23 1912 11:59:59"), true);
  });

  it("text", () => {
    assert.strictEqual(odata`Foo eq ${"x"}`, "Foo eq 'x'");
    assert.strictEqual(odata`Foo eq ${"'"}`, "Foo eq ''''");
    assert.strictEqual(odata`Foo eq ${'"'}`, "Foo eq '\"'");
    assert.strictEqual(odata`Foo eq ${"bar"}`, "Foo eq 'bar'");
    assert.strictEqual(odata`Foo eq ${"bar's"}`, "Foo eq 'bar''s'");
    assert.strictEqual(odata`Foo eq ${'"bar"'}`, "Foo eq '\"bar\"'");
  });

  afterEach(() => {
    sinon.restore();
  });
});
