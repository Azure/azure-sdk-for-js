// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import type * as util from "node:util";
import { createPrinter, updateBackend } from "../src/util/printer.ts";

vi.mock("node:util", async (importOriginal) => ({
  ...(await importOriginal<typeof util>()),
  styleText: vi.fn<typeof util.styleText>((format, text) => `<${format}>${text}</${format}>`),
}));

describe("createPrinter", () => {
  afterEach(() => {
    updateBackend({ error: console.error });
    vi.restoreAllMocks();
  });

  it("styles each error value in red", () => {
    const error = vi.fn();
    updateBackend({ error });

    createPrinter("test").error("first", ["second", "third"]);

    expect(error).toHaveBeenCalledOnce();
    expect(error).toHaveBeenCalledWith(
      "<red>[test]</red>",
      "<red>first</red>",
      "<red>second,third</red>",
    );
  });

  it("preserves spaces between unscoped values", () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

    createPrinter("test")("first", "second");

    expect(consoleLog).toHaveBeenCalledWith("<reset>[test] first second</reset>");
  });
});
