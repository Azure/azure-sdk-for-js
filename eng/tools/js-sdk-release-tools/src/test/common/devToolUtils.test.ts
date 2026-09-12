import { beforeEach, describe, expect, test, vi } from "vitest";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

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

describe("resetToGeneratedOutput", () => {
  let dir: string;

  beforeEach(async () => {
    mocks.loggerInfo.mockReset();
    dir = await mkdtemp(join(tmpdir(), "reset-generated-"));
  });

  test("replaces src with a clean copy of generated, dropping customizations", async () => {
    await mkdir(join(dir, "generated", "api"), { recursive: true });
    await writeFile(join(dir, "generated", "index.ts"), "export const generated = true;");
    await writeFile(join(dir, "generated", "api", "operations.ts"), "export const op = 1;");
    await mkdir(join(dir, "src"), { recursive: true });
    await writeFile(join(dir, "src", "index.ts"), "export const customized = true;");
    // customization-only file that is not present in generated
    await writeFile(join(dir, "src", "handwritten.ts"), "export const custom = 1;");

    const { resetToGeneratedOutput } = await import("../../common/devToolUtils.js");
    await expect(resetToGeneratedOutput(dir)).resolves.toBe(true);

    // src now mirrors generated exactly
    expect(await readFile(join(dir, "src", "index.ts"), "utf-8")).toBe(
      "export const generated = true;",
    );
    expect(existsSync(join(dir, "src", "api", "operations.ts"))).toBe(true);
    // the customization-only file is gone (wholesale reset)
    expect(existsSync(join(dir, "src", "handwritten.ts"))).toBe(false);

    await rm(dir, { force: true, recursive: true });
  });

  test("is a no-op for packages without a generated directory", async () => {
    await mkdir(join(dir, "src"), { recursive: true });
    await writeFile(join(dir, "src", "index.ts"), "export const customized = true;");

    const { resetToGeneratedOutput } = await import("../../common/devToolUtils.js");
    await expect(resetToGeneratedOutput(dir)).resolves.toBe(false);

    // src is untouched
    expect(await readFile(join(dir, "src", "index.ts"), "utf-8")).toBe(
      "export const customized = true;",
    );

    await rm(dir, { force: true, recursive: true });
  });
});
