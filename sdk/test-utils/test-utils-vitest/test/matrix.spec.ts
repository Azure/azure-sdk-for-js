// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { matrix } from "../src/index.js";

describe("matrix test support", () => {
  it("should call handler with correct argument", () => {
    const handler = vi.fn();
    matrix([[true, false]] as const, handler);

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(true);
    expect(handler).toHaveBeenCalledWith(false);
  });

  it("should call handler with correct arguments", () => {
    const handler = vi.fn();
    matrix([[true, false] as const, [1, 2, 3]], handler);

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(true, 1);
    expect(handler).toHaveBeenCalledWith(false, 3);
  });

  it("arguments should have the correct type", () => {
    const handler = vi.fn();
    matrix([[true, false] as const, [1, 2, 3]], handler);

    const call1Args = handler.mock.lastCall;
    assert.isBoolean(call1Args?.[0]);
    assert.isNumber(call1Args?.[1]);
  });

  it("should call handler correct amount of times", () => {
    const handler = vi.fn();
    matrix([[true, false] as const, [1, 2, 3]], handler);

    expect(handler).toBeCalledTimes(6);
  });
});
