#!/usr/bin/env node

import commandLineArgs from "command-line-args";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { dirname, isAbsolute, join, resolve } from "path";
import {
  generateChangelogAndBumpVersion,
  UpdateMode,
} from "./common/changelog/automaticGenerateChangeLogAndBumpVersion.js";
import { logger } from "./utils/logger.js";

/**
 * Walk up from the package path to locate the SDK repository root (the folder
 * containing `.git`). Falls back to the current working directory.
 */
function findSdkRepoRoot(startPath: string): string {
  let current = resolve(startPath);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (existsSync(join(current, ".git"))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return process.cwd();
}

/**
 * Report-only mode: compare the
 * package against its latest GA release and write the SDK change report as JSON
 * without modifying CHANGELOG.md or bumping the package version. The report follows
 * the `Component 1: SDK change Analyzer` output defined in the SDK breaking change
 * detect spec.
 */
const writeSdkChangesReport = async (packageFolderPath: string, reportFile: string) => {
  const absolutePackagePath = isAbsolute(packageFolderPath)
    ? packageFolderPath
    : resolve(packageFolderPath);
  const sdkRepoPath = findSdkRepoRoot(absolutePackagePath);

  const changelog = await generateChangelogAndBumpVersion(
    absolutePackagePath,
    { apiVersion: undefined, sdkReleaseType: undefined },
    UpdateMode.ChangelogOnly,
    sdkRepoPath,
    true,
  );

  const report = {
    changes: changelog?.content ?? "",
    hasBreakingChange: changelog?.hasBreakingChange ?? false,
  };
  const json = JSON.stringify(report, null, 2);

  const outputPath = resolve(reportFile);
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  writeFileSync(outputPath, json, { encoding: "utf-8" });
  logger.info(`SDK changes report written to: ${outputPath}`);

  // Also emit to stdout for local/manual usage.
  process.stdout.write(json + "\n");
};

const changelogToolCli = async (
  packageFolderPath: string | undefined,
  apiVersion?: string,
  sdkReleaseType?: string,
  reportFile?: string,
) => {
  if (!packageFolderPath) {
    logger.error(`Invalid package path '${packageFolderPath}'.`);
    return;
  }

  // When --report-file is provided, run in report-only mode: compute the SDK
  // changes and write a JSON report without modifying CHANGELOG.md or the version.
  if (reportFile !== undefined) {
    if (typeof reportFile !== "string" || !reportFile.trim()) {
      logger.error(`Invalid report file path '${reportFile}'.`);
      process.exit(1);
    }
    await writeSdkChangesReport(packageFolderPath, reportFile.trim());
    return;
  }

  await generateChangelogAndBumpVersion(packageFolderPath, {
    apiVersion,
    sdkReleaseType,
  });
};

const optionDefinitions = [
  { name: "packagePath", type: String, defaultOption: true },
  { name: "apiVersion", type: String },
  { name: "sdkReleaseType", type: String },
  { name: "report-file", type: String },
];
const options = commandLineArgs(optionDefinitions);

changelogToolCli(
  options.packagePath,
  options.apiVersion,
  options.sdkReleaseType,
  options["report-file"],
);
