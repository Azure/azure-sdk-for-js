// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export type AzureDevOpsBuildResult =
  "canceled" | "failed" | "none" | "partiallySucceeded" | "succeeded";

export type DevopsBuildStatus = AzureDevOpsBuildResult | "UNKNOWN";

export type AzureDevOpsTaskResult =
  "abandoned" | "canceled" | "failed" | "skipped" | "succeeded" | "succeededWithIssues";

export type DevopsTaskStatus = AzureDevOpsTaskResult | "UNKNOWN";

export interface AzureDevOpsListResponse<T> {
  count: number;
  value: T[];
}

export interface AzureDevOpsPipelineDefinition {
  id: number;
  name: string;
}

export interface AzureDevOpsBuild {
  id: number;
  buildNumber: string;
  result?: AzureDevOpsBuildResult;
  _links: {
    web: {
      href: string;
    };
  };
}

export interface AzureDevOpsTimelineRecord {
  name?: string;
  result?: AzureDevOpsTaskResult;
  resultCode?: string;
  log?: {
    url: string;
  };
}

export interface AzureDevOpsTimeline {
  records?: AzureDevOpsTimelineRecord[];
}

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

export type PipelineTaskKind =
  "build" | "ci" | "docs" | "lint" | "samples" | "tests" | "weeklyTests";

export type PipelineResult = {
  id?: number;
  buildNumber?: string;
  link?: string;
  result?: DevopsBuildStatus;
} & Partial<Record<PipelineTaskKind, CheckStatus>>;

export type WeeklyTestPipelineResult = PipelineResult;

export type TestsPipelineResult = PipelineResult;

export type CiPipelineResult = PipelineResult;

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

export type PipelineResultsUnion = PipelineResult;
