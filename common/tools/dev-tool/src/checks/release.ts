import path from "path";
import os from "node:os";
import type { Check } from "../framework/check.ts";
import { assert, scriptCheck } from "../framework/check.ts";
import { run } from "../util/run.ts";
import fs from "fs/promises";

interface PackResult {
  filename: string;
}

function isPackResult(value: unknown): value is PackResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "filename" in value &&
    typeof value.filename === "string" &&
    value.filename.length > 0
  );
}

export function parsePnpmPackResult(packOutput: string): PackResult {
  const parsed: unknown = JSON.parse(packOutput);
  const result = Array.isArray(parsed) ? parsed[0] : parsed;
  assert(isPackResult(result), "pnpm pack did not return a package filename.", packOutput);
  return result;
}

export const installable: Check = {
  hasFix: false,
  description: "Checks if the package is installable",
  tags: ["release"],
  severity: "warning",
  async check({ project }) {
    const { output: packOutput } = await run(["pnpm", "pack", "--json"], {
      allowWindowsBatchFiles: true,
      cwd: project.path,
      captureOutput: true,
    });
    const { filename } = parsePnpmPackResult(packOutput);
    const packPath = path.join(project.path, filename);
    const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "dev-tool-check-"));

    try {
      await fs.writeFile(path.join(tmpDir, "package.json"), "{}");
      await fs.copyFile(packPath, path.join(tmpDir, "package.tgz"));

      const { exitCode, output } = await run(["pnpm", "add", "./package.tgz"], {
        allowWindowsBatchFiles: true,
        cwd: tmpDir,
        captureOutput: true,
        captureExitCode: true,
      });
      assert(
        exitCode === 0,
        "The package could not be installed. Are all its dependencies released to npm?",
        output,
      );
    } finally {
      await fs.rm(packPath, { force: true });
      await fs.rm(tmpDir, { recursive: true, force: true });
    }
  },
};

export const areTheTypesWrong = scriptCheck({
  tags: ["release"],
  description: "are the types wrong must not display any errors",
  checkCommand: ["attw", "--pack", "."],
});
