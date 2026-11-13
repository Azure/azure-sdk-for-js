// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import {
  joinFilePath,
  relativeImportPath,
} from "../../../src/serialization/bicep/file-layout/file-paths.js";

describe("file paths", () => {
  it.each([
    ["infra", "widget.bicep", "infra/widget.bicep"],
    ["nested//./infra", "widget.bicep", "nested/infra/widget.bicep"],
    ["nested/../infra", "widget.bicep", "infra/widget.bicep"],
    ["../../infra", "widget.bicep", "../../infra/widget.bicep"],
    ["nested\\infra", "widget.bicep", "nested/infra/widget.bicep"],
    ["/../infra", "widget.bicep", "/infra/widget.bicep"],
    ["C:\\infra\\..\\app", "widget.bicep", "C:/app/widget.bicep"],
    ["C:/../../infra", "widget.bicep", "C:/infra/widget.bicep"],
    [".", "widget.bicep", "widget.bicep"],
    ["", "widget.bicep", "widget.bicep"],
  ])("joins %s and %s as %s", (directory, fileName, expected) => {
    expect(joinFilePath(directory, fileName)).toBe(expected);
  });

  it.each([
    ["main.bicep", "infra/widget.bicep", "./infra/widget.bicep"],
    ["infra/main.bicep", "infra/widget.bicep", "./widget.bicep"],
    ["infra/main.bicep", "shared/widget.bicep", "../shared/widget.bicep"],
    ["infra/nested/main.bicep", "shared/widget.bicep", "../../shared/widget.bicep"],
    ["app/main.bicep", "application/widget.bicep", "../application/widget.bicep"],
    ["nested//./infra.bicep", "nested/infra/widget.bicep", "./infra/widget.bicep"],
    ["nested/../infra.bicep", "infra/widget.bicep", "./infra/widget.bicep"],
    ["../infra.bicep", "../infra/widget.bicep", "./infra/widget.bicep"],
    ["nested\\infra.bicep", "nested\\infra\\widget.bicep", "./infra/widget.bicep"],
    ["/infra/main.bicep", "/shared/widget.bicep", "../shared/widget.bicep"],
    ["C:\\infra\\main.bicep", "C:\\infra\\widget.bicep", "./widget.bicep"],
    ["main.bicep", ".infra/widget.bicep", "./.infra/widget.bicep"],
    ["main.bicep", ".widget.bicep", "./.widget.bicep"],
  ])("resolves imports from %s to %s", (from, to, expected) => {
    expect(relativeImportPath(from, to)).toBe(expected);
  });

  it.each([
    ["/infra/main.bicep", "infra/widget.bicep"],
    ["C:/infra/main.bicep", "D:/infra/widget.bicep"],
  ])("rejects imports across different roots from %s to %s", (from, to) => {
    expect(() => relativeImportPath(from, to)).toThrow("across different path roots");
  });
});
