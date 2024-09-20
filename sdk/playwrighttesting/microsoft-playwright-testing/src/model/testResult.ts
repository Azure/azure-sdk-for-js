// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawTestStep } from "../common/types";

export class TestResult {
  testId!: string;
  testExecutionId!: string;
  testCombinationId!: string;
  runId!: string;
  shardId!: string;
  accountId!: string;
  suiteId!: string;
  testTitle!: string;
  suiteTitle!: string;
  fileName!: string;
  lineNumber!: number;
  retry!: number;
  status!: string;
  tags!: string[];
  annotations!: string[];
  webTestConfig!: WebTestConfig;
  resultsSummary!: TestResultsSummary;
  artifactsPath!: string[];
}

export type WebTestConfig = {
  jobName: string;
  projectName: string;
  browserType: string;
  os: string;
};

export type TestResultsSummary = {
  status: string;
  duration: number;
  startTime: string;
  attachmentsMetadata: string;
};

export type RawTestResult = {
  steps?: RawTestStep[];
  errors?: string;
  stdErr?: string;
  stdOut?: string;
};
