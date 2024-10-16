// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ShardInfo } from "./shard";

export class TestRun {
  testRunId!: string;
  displayName!: string;
  creatorId!: string;
  creatorName?: string;
  startTime!: string;
  ciConfig?: CIConfig;
  testRunConfig?: TestRunConfig;
  cloudReportingEnabled: string = "true"; // Default value set to 'true'
}

export type CIConfig = {
  ciProviderName: string;
  branch: string;
  author: string;
  commitId: string;
  revisionUrl: string;
};

export type TestRunConfig = {
  workers: number;
  pwVersion: string;
  timeout: number;
  shards: ShardInfo;
  retries?: number;
  repeatEach?: number;
  testFramework: TestFramework;
  testType: string;
  testSdkLanguage: string;
  reporterPackageVersion: string;
};

export type TestFramework = {
  name: string;
  version: string;
  runnerName: string;
};
