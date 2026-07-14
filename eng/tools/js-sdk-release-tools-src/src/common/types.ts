export enum SDKType {
  HighLevelClient = 'HighLevelClient',
  RestLevelClient = 'RestLevelClient',
  ModularClient = 'ModularClient',
}

export enum ApiVersionType {
  None = 'None',
  Stable = 'Stable',
  Preview = 'Preview',
}

export enum RunMode {
  Release = 'release',
  Local = 'local',
  SpecPullRequest = 'spec-pull-request',
  Batch = 'batch',
}

export interface ChangelogResult {
  content: string;
  hasBreakingChange: boolean;
  breakingChangeItems: string[];
}

export interface InstallInstructionsResult {
  full: string;
}

// TODO: investigate the inconsistency to https://github.com/Azure/azure-rest-api-specs/blob/main/documentation/sdkautomation/GenerateOutputSchema.json
// the PackageResult here is stricter by making some optional field to required, due to we always want the package result contains specific fields
export interface PackageResult {
  language: 'JavaScript';
  packageName: string;
  version: string;
  path: string[];
  changelog: ChangelogResult;
  artifacts: string[];
  apiViewArtifact: string;
  result: 'succeeded' | 'failed' | 'warning';
  packageFolder: string;
  typespecProject?: string[];
  readmeMd?: string[];
  installInstructions?: InstallInstructionsResult;
}

export interface GenerationOutputInfo {
  packages: PackageResult[];
}

export type VersionPolicyName = 'management' | 'client';
export type EmitterName = '@azure-tools/typespec-ts' | '';

export interface ModularClientPackageOptions {
  sdkRepoRoot: string;
  specRepoRoot: string;
  typeSpecDirectory: string;
  gitCommitId: string;
  skip: boolean;
  repoUrl: string;
  versionPolicyName: VersionPolicyName;
  local: boolean;
  apiVersion: string | undefined;
  sdkReleaseType: string | undefined;
  runMode: RunMode;
}

export interface NpmPackageInfo {
  name: string;
  version: string;
}

export enum ModularSDKType {
  ManagementPlane = 'ManagementPlane',
  DataPlane = 'DataPlane',
}
