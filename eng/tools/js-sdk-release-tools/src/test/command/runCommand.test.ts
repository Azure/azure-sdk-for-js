import { describe, expect, test } from "vitest";
import { runCommand, runCommandOptions } from "../../common/utils.js";

describe("Run command", () => {
  test("Invalid command should throw error", async () => {
    await expect(runCommand("invalid-command", [], runCommandOptions, false)).rejects.toThrow();
  });
  test("Valid command should not throw error", async () => {
    const result = await runCommand("echo 123", [], runCommandOptions, false);
    expect(result.stdout.replaceAll("\r", "").replaceAll("\n", "")).toBe("123");
  });
  test("Inherit stdio should not throw error", async () => {
    await expect(
      runCommand("echo 123", [], { shell: true, stdio: "inherit" }, false),
    ).resolves.not.toThrow();
  });
});
