import { beforeEach, describe, expect, test, vi } from "vitest";

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

  test("runs the package customize script from the package directory", async () => {
    const packageDirectory = "/sdk/example";
    const { customizeCodes } = await import("../../common/devToolUtils.js");

    await expect(customizeCodes(packageDirectory)).resolves.toBeUndefined();

    // `--if-present` makes this a no-op for packages without a `customize` script,
    // so the caller does not need to know whether a package opts into customization.
    expect(mocks.runCommand).toHaveBeenCalledWith(
      "npm",
      ["run", "--if-present", "customize"],
      { shell: true, cwd: packageDirectory },
      true,
      600,
    );
  });

  test("logs failures without blocking generation", async () => {
    const packageDirectory = "/sdk/example";
    const error = new Error("merge conflict");
    mocks.runCommand.mockRejectedValue(error);
    const { customizeCodes } = await import("../../common/devToolUtils.js");

    await expect(customizeCodes(packageDirectory)).resolves.toBeUndefined();
    expect(mocks.loggerWarn).toHaveBeenCalledWith(
      `Failed to customize codes due to: ${error.stack}`,
    );
  });
});
