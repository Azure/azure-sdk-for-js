// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import * as path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { format } from "../../util/prettier";
import { resolveProject, resolveRoot, METADATA_KEY, ProjectInfo } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { run } from "../../util/run";
import { hasPowerShell } from "../../util/pwsh";
import { leafCommand } from "../../framework/command";
import { makeCommandInfo } from "../../framework/command";
import { prerelease, inc } from "semver";

const log = createPrinter("increment-version");

const validTypes = ["major", "minor", "patch"];
type ValidTypes = "major" | "minor" | "patch";

export const commandInfo = makeCommandInfo("increment-version", "increment a package version", {
  directory: {
    shortName: "d",
    kind: "string",
    description: "Base dir, default is process.cwd()",
    default: process.cwd(),
  },
  "dry-run": {
    kind: "boolean",
    description: "print what changes will be made without performing them",
  },
  type: {
    kind: "string",
    default: "patch",
    description: "type of version increment (major, minor, or patch)",
  },
});

/**
 * Increments the given semantic version string according to the specified type.
 * If the version is a prerelease, increments the prerelease version regardless of the type.
 *
 * @param currentVersion - The current version string (must be a valid semver).
 * @param type - The type of version increment.
 * @returns The incremented version string or null if the version isn't valid
 */
function incrementVersion(currentVersion: string, type: ValidTypes = "patch"): string | null {
  const isPrerelease = prerelease(currentVersion);
  let newVersion: string | null;
  if (isPrerelease) {
    log.info(
      `Package is in prerelease state. Ignoring version increment type '${type}' and using 'prerelease' instead.`,
    );
    newVersion = inc(currentVersion, "prerelease");
  } else {
    newVersion = inc(currentVersion, type);
  }

  return newVersion;
}

function isValidType(type: string): type is ValidTypes {
  return validTypes.includes(type);
}

// This regex is taken from https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
const semverRegex = `(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?`;

function buildSemverRegex(prefix: string) {
  return new RegExp(`(${prefix}.*?)(${semverRegex.toString()})`, "g");
}

async function updatePackageConstants(
  packagePath: string,
  packageJson: PackageJson,
  newVersion: string,
) {
  // No constant metadata, skip
  if (!packageJson[METADATA_KEY]?.constantPaths) {
    return;
  }

  for (const constantFileSpec of packageJson[METADATA_KEY].constantPaths) {
    const targetPath = path.join(packagePath, constantFileSpec.path);
    log.info(`Updating version in ${targetPath}`);
    const fileContents = await readFile(targetPath, { encoding: "utf8" });

    const versionExpression = buildSemverRegex(constantFileSpec.prefix);
    const updatedContents = fileContents.replace(versionExpression, `$1${newVersion}`);

    if (updatedContents == fileContents) {
      continue;
    }

    await writeFile(targetPath, updatedContents);
  }
}

async function updateChangelog(project: ProjectInfo, newVersion: string) {
  if (!(await hasPowerShell())) {
    log.error(
      "PowerShell is required to update the changelog. Ensure it is installed and available on your PATH.",
    );
    throw new Error("PowerShell is not installed");
  }

  const targetPackagePath = project.path;
  const packageName = project.name;
  const service = path.basename(path.dirname(targetPackagePath));
  const changelogPath = path.join(targetPackagePath, "CHANGELOG.md");
  const repoRoot = await resolveRoot(targetPackagePath);
  const updateChangelogPath = path.resolve(
    path.join(repoRoot, "eng/common/scripts/Update-ChangeLog.ps1"),
  );
  const args = [
    "pwsh",
    updateChangelogPath,
    "--Version",
    newVersion,
    "--ServiceDirectory",
    service,
    "--PackageName",
    packageName,
    "--Unreleased:$true",
    "--ReplaceLatestEntryTitle:$false",
    "--ChangelogPath:" + changelogPath,
  ];

  log.info(`Running pwsh script ${updateChangelogPath}`);
  const result = await run(args, {
    cwd: project.path,
    captureExitCode: true,
    captureOutput: true,
  });
  if (result.exitCode !== 0) {
    throw new Error(`Powershell exited with code: ${result.exitCode}, output: ${result.output}`);
  } else {
    log.info(`Command output ${result.output}`);
  }
}

export default leafCommand(commandInfo, async (options) => {
  if (!isValidType(options.type)) {
    log.error(`Unknown type: ${options.type}`);
    return false;
  }

  const pkg = await resolveProject(options.directory);
  log.info(`Incrementing version of package ${pkg.name} by ${options.type}`);

  const oldVersion = pkg.packageJson.version;
  const newVersion = incrementVersion(oldVersion, options.type);
  if (newVersion === null) {
    log.error(`Couldn't calculate new version from ${oldVersion}`);
    return false;
  }
  log.info(`${pkg.name}: ${oldVersion} -> ${newVersion}`);

  if (options["dry-run"]) {
    log.success("Dry run only, no changes");
    return true;
  }

  const updatedPackageJson = {
    ...pkg.packageJson,
    version: newVersion,
  };
  const newPackageJsonContent = await format(
    JSON.stringify(updatedPackageJson, null, 2),
    "json-stringify",
  );
  log.info("Updating package.json...");
  await writeFile(path.join(pkg.path, "package.json"), newPackageJsonContent);
  log.info("Updating package constants...");
  await updatePackageConstants(pkg.path, pkg.packageJson, newVersion);
  log.info("Updating CHANGELOG.md...");
  await updateChangelog(pkg, newVersion);

  log.success("Version successfully updated!");
  return true;
});
