import fs from "fs";
import path from "path";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  runCommand: vi.fn(),
  loggerInfo: vi.fn(),
  loggerWarn: vi.fn(),
}));

vi.mock("../../common/utils.js", () => ({
  runCommand: mocks.runCommand,
  runCommandOptions: { shell: true },
}));

vi.mock("../../utils/logger.js", () => ({
  logger: {
    info: mocks.loggerInfo,
    warn: mocks.loggerWarn,
  },
}));

describe("customizeCodes", () => {
  beforeEach(() => {
    mocks.runCommand.mockReset();
    mocks.loggerInfo.mockReset();
    mocks.loggerWarn.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("applies customizations when a root-level generated folder exists", async () => {
    const packageDirectory = path.join(__dirname, "testCases", "customized-package");
    const existsSync = vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const { customizeCodes } = await import("../../common/devToolUtils.js");

    await expect(customizeCodes(packageDirectory)).resolves.toBeUndefined();
    expect(existsSync).toHaveBeenCalledWith(path.join(packageDirectory, "generated"));
    expect(mocks.runCommand).toHaveBeenCalledWith(
      "npm",
      ["exec", "--", "dev-tool", "customization", "apply", "-s", "./generated", "-t", "./src"],
      { shell: true, cwd: packageDirectory },
      true,
      600,
    );
  });

  test("skips src/generated packages without a root-level generated folder", async () => {
    const packageDirectory = path.join(__dirname, "testCases", "src-generated-package");
    vi.spyOn(fs, "existsSync").mockReturnValue(false);
    const { customizeCodes } = await import("../../common/devToolUtils.js");

    await expect(customizeCodes(packageDirectory)).resolves.toBeUndefined();
    expect(mocks.runCommand).not.toHaveBeenCalled();
    expect(mocks.loggerInfo).toHaveBeenCalledWith(
      `Skip customization because '${path.join(packageDirectory, "generated")}' does not exist.`,
    );
  });

  test("logs failures without blocking generation", async () => {
    const packageDirectory = path.join(__dirname, "testCases", "conflicting-package");
    vi.spyOn(fs, "existsSync").mockReturnValue(true);
    const error = new Error("merge conflict");
    mocks.runCommand.mockRejectedValue(error);
    const { customizeCodes } = await import("../../common/devToolUtils.js");

    await expect(customizeCodes(packageDirectory)).resolves.toBeUndefined();
    expect(mocks.loggerWarn).toHaveBeenCalledWith(
      `Failed to customize codes due to: ${error.stack}`,
    );
  });
});
