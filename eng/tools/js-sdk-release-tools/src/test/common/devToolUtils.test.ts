import { beforeEach, describe, expect, test, vi } from "vitest";
import path from "path";
import { lintFix } from "../../common/devToolUtils.js";

const mocks = vi.hoisted(() => ({
  runCommand: vi.fn(),
  loggerInfo: vi.fn(),
  loggerWarn: vi.fn(),
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
}));

vi.mock("fs", () => ({
  default: {
    readFileSync: mocks.readFileSync,
    existsSync: mocks.existsSync,
  },
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

describe("lintFix", () => {
  const packageDirectory = path.join("sdk", "example");
  const options = { shell: true, cwd: packageDirectory };
  const pluginBuildCommand = [
    "pnpm",
    ["build", "--filter", "@azure/eslint-plugin-azure-sdk"],
    { shell: true },
    true,
    300,
    true,
  ];
  const successMessage = "Fix the automatically repairable lint errors successfully.";

  beforeEach(() => {
    vi.resetAllMocks();
    mocks.existsSync.mockReturnValue(false);
  });

  describe.each([
    {
      name: "package lint:fix script",
      scripts: { "lint:fix": "eslint . --fix" },
      lintCommand: ["npm", ["run", "lint:fix"], options, true, 300, true],
    },
    {
      name: "no-op lint:fix fallback",
      scripts: { "lint:fix": "  echo skipped" },
      lintCommand: [
        "pnpm",
        ["exec", "eslint", "src", "--fix", "--fix-type", "[problem,suggestion]"],
        options,
        true,
        3600,
        true,
      ],
    },
    {
      name: "missing lint:fix script",
      scripts: {},
      lintCommand: ["npm", ["run", "lint:fix"], options, true, 300, true],
    },
    {
      name: "missing scripts",
      scripts: undefined,
      lintCommand: ["npm", ["run", "lint:fix"], options, true, 300, true],
    },
  ])("$name", ({ scripts, lintCommand }) => {
    beforeEach(() => {
      mocks.readFileSync.mockReturnValue(JSON.stringify({ scripts }));
    });

    test("waits for the workspace plugin build before linting", async () => {
      let finishBuild!: () => void;
      const build = new Promise<void>((resolve) => {
        finishBuild = resolve;
      });
      mocks.runCommand.mockReturnValueOnce(build);

      const linting = lintFix(packageDirectory);

      expect(mocks.readFileSync).toHaveBeenCalledWith(path.join(packageDirectory, "package.json"), {
        encoding: "utf-8",
      });
      expect(mocks.runCommand.mock.calls).toEqual([pluginBuildCommand]);
      expect(mocks.loggerInfo).not.toHaveBeenCalledWith(successMessage);

      finishBuild();
      await expect(linting).resolves.toBeUndefined();

      expect(mocks.runCommand.mock.calls).toEqual([pluginBuildCommand, lintCommand]);
      expect(mocks.loggerWarn).not.toHaveBeenCalled();
      expect(mocks.loggerInfo).toHaveBeenCalledWith(successMessage);
    });

    test("warns and skips linting when the plugin build fails", async () => {
      const error = new Error("plugin build failed");
      mocks.runCommand.mockRejectedValueOnce(error);

      await expect(lintFix(packageDirectory)).resolves.toBeUndefined();

      expect(mocks.runCommand.mock.calls).toEqual([pluginBuildCommand]);
      expect(mocks.loggerWarn).toHaveBeenCalledWith(
        `Failed to fix lint errors due to: ${error.stack}`,
      );
      expect(mocks.loggerInfo).not.toHaveBeenCalledWith(successMessage);
    });

    test.each([new Error("lint failed"), "lint failed"])(
      "warns without blocking generation when linting fails: %s",
      async (error) => {
        mocks.runCommand.mockResolvedValueOnce(undefined).mockRejectedValueOnce(error);

        await expect(lintFix(packageDirectory)).resolves.toBeUndefined();

        expect(mocks.runCommand.mock.calls).toEqual([pluginBuildCommand, lintCommand]);
        expect(mocks.loggerWarn).toHaveBeenCalledWith(
          `Failed to fix lint errors due to: ${error instanceof Error ? error.stack : error}`,
        );
        expect(mocks.loggerInfo).not.toHaveBeenCalledWith(successMessage);
      },
    );
  });

  test.each([
    { directories: ["test"] },
    { directories: ["samples-dev"] },
    { directories: ["test", "samples-dev"] },
  ])("includes existing fallback lint directories: $directories", async ({ directories }) => {
    mocks.readFileSync.mockReturnValue(JSON.stringify({ scripts: { "lint:fix": "echo skipped" } }));
    mocks.existsSync.mockImplementation((filePath) =>
      directories.some((directory) => filePath === path.join(packageDirectory, directory)),
    );

    await lintFix(packageDirectory);

    expect(mocks.runCommand.mock.calls).toEqual([
      pluginBuildCommand,
      [
        "pnpm",
        ["exec", "eslint", "src", ...directories, "--fix", "--fix-type", "[problem,suggestion]"],
        options,
        true,
        3600,
        true,
      ],
    ]);
    expect(mocks.loggerWarn).not.toHaveBeenCalled();
  });

  test("warns without running commands when the package manifest cannot be read", async () => {
    const error = new Error("unreadable package.json");
    mocks.readFileSync.mockImplementationOnce(() => {
      throw error;
    });

    await expect(lintFix(packageDirectory)).resolves.toBeUndefined();

    expect(mocks.runCommand).not.toHaveBeenCalled();
    expect(mocks.loggerWarn).toHaveBeenCalledWith(
      `Failed to fix lint errors due to: ${error.stack}`,
    );
    expect(mocks.loggerInfo).not.toHaveBeenCalledWith(successMessage);
  });
});

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
