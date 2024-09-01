// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TestRunConfig } from "./testRun";

export class Shard {
  shardId!: string;
  summary!: TestRunSummary;
  workers?: number;
  uploadCompleted!: boolean;
}

export class TestRunSummary {
  status?: string;
  startTime!: string;
  endTime?: string;
  totalTime?: number;
  errorMessages?: string[];
  uploadMetadata?: UploadMetadata;
}

export type TestRunResultsSummary = {
  numTotalTests?: number;
  numFailedTests?: number;
  numSkippedTests?: number;
  numPassedTests?: number;
  numFlakyTests?: number;
  status?: TestResultStatus;
};

export enum TestResultStatus {
  PASSED = "passed",
  FAILED = "failed",
  TIMEDOUT = "timedout",
  INTERRUPTED = "interrupted",
}

export enum TestRunStatus {
  RUNNING = "RUNNING",
  CLIENT_COMPLETE = "CLIENT_COMPLETE",
}

export type UploadMetadata = {
  numTestResults: number;
  numTotalAttachments: number;
  sizeTotalAttachments: number;
};

export type ShardInfo = {
  total: number;
};
