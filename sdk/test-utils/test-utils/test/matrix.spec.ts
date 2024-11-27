// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import sinon from "sinon";
import { matrix } from "../src";

describe("matrix test support", () => {
  it("should call handler with correct argument", () => {
    const handler = sinon.spy();
    matrix([[true, false]] as const, handler);

    assert(handler.called);
    assert(handler.calledWith(true));
    assert(handler.calledWith(false));
  });

  it("should call handler with correct arguments", () => {
    const handler = sinon.spy();
    matrix([[true, false] as const, [1, 2, 3]], handler);

    assert(handler.called);
    assert(handler.calledWith(true, 1));
    assert(handler.calledWith(false, 3));
  });

  it("arguments should have the correct type", () => {
    const handler = sinon.spy();
    matrix([[true, false] as const, [1, 2, 3]], handler);

    assert(handler.called);

    const call1Args = handler.getCall(0).args;
    assert.isBoolean(call1Args[0]);
    assert.isNumber(call1Args[1]);
  });

  it("should call handler correct amount of times", () => {
    const handler = sinon.spy();
    matrix([[true, false] as const, [1, 2, 3]], handler);

    assert(handler.called);
    assert.equal(handler.callCount, 6);
  });
});
