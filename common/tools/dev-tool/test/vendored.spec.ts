// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { buildVendoredCommand } from "../src/commands/run/vendored.ts";

describe("vendored command safety", () => {
  it("passes arbitrary arguments directly to a native Node process", () => {
    const arbitraryArguments = ["C:\\work (copy)\\file.ts", "value&next", "%PATH%", "!value!"];
    const command = buildVendoredCommand("prettier", arbitraryArguments);

    expect(command[0]).toBe(process.execPath);
    expect(command[1]).toBe("--");
    expect(command[2]).toMatch(/prettier[\\/]bin[\\/]prettier\.cjs$/);
    expect(command.slice(3)).toEqual(arbitraryArguments);
  });
});
