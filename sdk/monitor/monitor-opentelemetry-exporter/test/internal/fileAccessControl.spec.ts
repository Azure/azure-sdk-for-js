// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { getWindowsSystemExecutable } from "$internal/platform/nodejs/persist/fileAccessControl.js";

describe("getWindowsSystemExecutable", () => {
  it("resolves beneath a drive-qualified Windows system root", () => {
    expect(getWindowsSystemExecutable("C:\\Windows", "System32", "icacls.exe")).toBe(
      "C:\\Windows\\System32\\icacls.exe",
    );
  });

  it.each(["\\Windows", "//server/share", "\\\\server\\share"])(
    "rejects an untrusted Windows system root %s",
    (systemRoot) => {
      expect(() => getWindowsSystemExecutable(systemRoot, "System32", "icacls.exe")).toThrow(
        /trusted Windows system directory/i,
      );
    },
  );
});
