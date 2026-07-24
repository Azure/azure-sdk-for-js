// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type DevopsBuildStatus =
  | "abandoned"
  | "canceled"
  | "failed"
  | "skipped"
  | "succeeded"
  | "succeededWithIssues"
  | "UNKNOWN";

export type DevopsTaskStatus =
  | "succeeded"
  | "failed"
  | "canceled"
  | "none"
  | "partiallySucceeded"
  | "UNKNOWN";

export type PackageStatusCode = "NEEDS_ACTION" | "BLOCKED" | "GOOD";

export type CheckStatusCode = "PASS" | "FAIL" | "WARNING" | "DISABLED" | "UNKNOWN";

export interface Status {
  status: CheckStatusCode;
  link?: string;
}

export interface CheckStatus {
  status: DevopsTaskStatus;
  log?: string;
}

export interface WeeklyTestPipelineResult {
  id: number;
  buildNumber?: string;
  link: string;
  result?: DevopsBuildStatus;
  lint?: CheckStatus;
  weeklyTests?: CheckStatus;
}

export interface TestsPipelineResult {
  id: number;
  buildNumber?: string;
  link: string;
  result?: DevopsBuildStatus;
  tests?: CheckStatus;
  samples?: CheckStatus;
}

export interface CiPipelineResult {
  id: number;
  buildNumber?: string;
  link: string;
  result?: DevopsBuildStatus;
  ci?: CheckStatus;
  lint?: CheckStatus;
}

export interface PipelineResults {
  weeklyTests?: WeeklyTestPipelineResult;
  tests?: TestsPipelineResult;
  ci?: CiPipelineResult;
}

export interface IssueDetails {
  num: number;
  link: string;
}

export interface SlaStatus {
  question: IssueDetails;
  // `open > 30 days`
  bug: IssueDetails;
  // `open > 90 days`
}

export interface PackageInfo {
  projectPath: string;
  serviceDir: string;
  packageDir: string;
}

export type Packages = Record<string, PackageInfo>;

export interface PackageStatus extends PackageInfo {
  status: PackageStatusCode;
  path: string;
  label?: string;
  sla?: SlaStatus;
  customerIssues?: IssueDetails;
  sdkOwned: boolean;
  // docs: Status; // TODO: add this back
  lint: Status;
  tests: Status;
  samples: Status;
  ci: Status;
}

export type PackagesWithStatus = Record<string, PackageStatus>;

export type PipelineResultsUnion =
  | CiPipelineResult
  | TestsPipelineResult
  | WeeklyTestPipelineResult;
