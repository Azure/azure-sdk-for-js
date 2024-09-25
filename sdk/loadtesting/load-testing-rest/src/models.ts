// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationState, SimplePollerLike } from "@azure/core-lro";
import {
  LoadTestAdministrationGetTestFile200Response,
  LoadTestRunCreateOrUpdateTestRun200Response,
  LoadTestRunCreateOrUpdateTestRun201Response,
  LoadTestRunGetTestRun200Response,
  LoadTestAdministrationUploadTestFile201Response,
} from "../generated/responses";

/**
 * Describes a poller for NotificationHubJob types.
 */
export type FileUploadAndValidatePoller = SimplePollerLike<
  OperationState<LoadTestAdministrationGetTestFile200Response>,
  LoadTestAdministrationGetTestFile200Response
>;

export type TestRunCompletionPoller = SimplePollerLike<
  OperationState<LoadTestRunGetTestRun200Response>,
  LoadTestRunGetTestRun200Response
>;

export type TestRunCreateOrUpdateSuccessResponse =
  | LoadTestRunCreateOrUpdateTestRun200Response
  | LoadTestRunCreateOrUpdateTestRun201Response;

export type TestUploadFileSuccessResponse = LoadTestAdministrationUploadTestFile201Response;

export interface PolledOperationOptions {
  /**
   * Time delay between poll requests, in milliseconds.
   */
  updateIntervalInMs?: number;
}
