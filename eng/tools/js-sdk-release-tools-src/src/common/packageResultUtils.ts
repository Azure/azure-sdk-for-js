import { ChangelogResult, NpmPackageInfo, PackageResult } from './types.js';

import { ChangelogResult as Changelog } from '../changelog/v2/ChangelogGenerator.js';

export function initPackageResult(): PackageResult {
  const breakingChangeItems = [];
  const hasBreakingChange = false;
  const content = '';
  const changelogInfo: ChangelogResult = { content, hasBreakingChange, breakingChangeItems };
  const packageInfo: PackageResult = {
    // pipeline framework limit, it cannot handle result with empty string
    packageName: 'default',
    version: '',
    language: 'JavaScript',
    path: ['rush.json', 'common/config/rush/pnpm-lock.yaml'],
    apiViewArtifact: '',
    packageFolder: '',
    typespecProject: [],
    artifacts: [],
    changelog: changelogInfo,
    result: 'failed',
  };
  return packageInfo;
}

export function updateChangelogResult(packageResult: PackageResult, changelog: Changelog | undefined): void {
  packageResult.changelog.breakingChangeItems = changelog?.breakingChangeItems ?? [];
  packageResult.changelog.content = changelog?.content ?? '';
  packageResult.changelog.hasBreakingChange = changelog?.hasBreakingChange ?? false;
}

// TODO: need a instruction
export function updateInstructionResult(packageResult: PackageResult, instruction: string): void {}

export function updateNpmPackageResult(
  packageResult: PackageResult,
  npmPackageInfo: NpmPackageInfo,
  relativeTypeSpecDirectoryToSpecRoot: string,
  relativeGeneratedPackageDirectoryToSdkRoot: string
): void {
  packageResult.packageName = npmPackageInfo.name;
  packageResult.version = npmPackageInfo.version;
  packageResult.typespecProject = [relativeTypeSpecDirectoryToSpecRoot];
  packageResult.packageFolder = relativeGeneratedPackageDirectoryToSdkRoot;
  packageResult.path.push(relativeGeneratedPackageDirectoryToSdkRoot);
}
