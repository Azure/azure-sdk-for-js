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

  afterEach(() => {
    sinon.restore();
  });
});
