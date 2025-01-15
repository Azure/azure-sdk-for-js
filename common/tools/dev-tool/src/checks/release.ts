import path from "path";
import { assert, Check, scriptCheck } from "../framework/check";
import { run } from "../util/run";
import fs from "fs/promises";
import { hasPowerShell } from "../util/pwsh";
import { resolveRoot } from "../util/resolveProject";

export const installable: Check = {
  hasFix: false,
  description: "Checks if the package is installable",
  tags: ["release"],
  severity: "warning",
  async check({ project }) {
    const { output: packFileName } = await run(`npm pack --quiet`, {
      cwd: project.path,
      captureOutput: true,
    });
    const packPath = path.join(project.path, packFileName.trim());
    const tmpDir = await fs.mkdtemp("dev-tool-check");
    await fs.writeFile(path.join(tmpDir, "package.json"), "{}");

    const { exitCode, output } = await run(["npm", "install", packPath], {
      cwd: tmpDir,
      captureOutput: true,
      captureExitCode: true,
    });
    await fs.rm(packPath);
    await fs.rm(tmpDir, { recursive: true, force: true });
    assert(
      exitCode === 0,
      "The package could not be installed. Are all its dependencies released to npm?",
      output,
    );
  },
};

export const areTheTypesWrong = scriptCheck({
  tags: ["release"],
  description: "are the types wrong must not display any errors",
  checkCommand: "dev-tool run vendored attw --pack .",
});

export const changelog: Check = {
  hasFix: false,
  tags: ["local"],
  description: "CHANGELOG validation must succeed (requires Powershell)",
  enable: hasPowerShell,
  async check({ project }) {
    const { output, exitCode } = await run(
      [
        "pwsh",
        "-Command",
        path.resolve(await resolveRoot(), "eng", "common", "scripts", "Verify-ChangeLog.ps1"),
        "-PackageName",
        project.packageJson.name,
        "-ForRelease",
        "$true",
      ],
      { captureExitCode: true, captureOutput: true },
    );
    assert(exitCode === 0, "CHANGELOG validation failed", output);
  },
};
