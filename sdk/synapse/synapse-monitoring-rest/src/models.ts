// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export interface SparkJobListViewResponse {
  nJobs?: number;
  sparkJobs?: Array<SparkJob>;
}

export interface SparkJob {
  state?: string;
  name?: string;
  submitter?: string;
  compute?: string;
  sparkApplicationId?: string;
  livyId?: string;
  timing?: Array<string>;
  sparkJobDefinition?: string;
  pipeline?: Array<SparkJob>;
  jobType?: string;
  submitTime?: Date;
  endTime?: Date;
  queuedDuration?: string;
  runningDuration?: string;
  totalDuration?: string;
}

export interface SqlQueryStringDataModel {
  query?: string;
}
