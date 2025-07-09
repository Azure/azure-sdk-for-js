// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureLoadTestingClient } from "./clientDefinitions.js";
import { getFileValidationPoller } from "./getFileValidationPoller.js";
import { getTestRunCompletionPoller } from "./getTestRunCompletionPoller.js";
import { getTestProfileRunCompletionPoller } from "./getTestProfileRunCompletionPoller.js";
import type {
  FileUploadAndValidatePoller,
  TestUploadFileSuccessResponse,
  TestRunCompletionPoller,
  TestRunCreateOrUpdateSuccessResponse,
  TestProfileRunCreateOrUpdateSuccessResponse,
  TestProfileRunCompletionPoller,
  PolledOperationOptions,
} from "./models.js";

export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestUploadFileSuccessResponse,
  polledOperationOptions?: PolledOperationOptions,
): Promise<FileUploadAndValidatePoller>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestRunCreateOrUpdateSuccessResponse,
  polledOperationOptions?: PolledOperationOptions,
): Promise<TestRunCompletionPoller>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestProfileRunCreateOrUpdateSuccessResponse,
  polledOperationOptions?: PolledOperationOptions,
): Promise<TestProfileRunCompletionPoller>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse:
    | TestRunCreateOrUpdateSuccessResponse
    | TestUploadFileSuccessResponse
    | TestProfileRunCreateOrUpdateSuccessResponse,
  polledOperationOptions: PolledOperationOptions = {},
): Promise<TestRunCompletionPoller | FileUploadAndValidatePoller | TestProfileRunCompletionPoller> {
  if (isFileUpload(initialResponse)) {
    return getFileValidationPoller(client, initialResponse, polledOperationOptions);
  } else if (isTestRunCreation(initialResponse)) {
    return getTestRunCompletionPoller(client, initialResponse, polledOperationOptions);
  } else if (isTestProfileRunCreation(initialResponse)) {
    return getTestProfileRunCompletionPoller(client, initialResponse, polledOperationOptions);
  }

  throw new Error("The Operation is not a long running operation.");
}

function isFileUpload(response: any): response is TestUploadFileSuccessResponse {
  return response.request.url.includes("/files/");
}

function isTestRunCreation(response: any): response is TestRunCreateOrUpdateSuccessResponse {
  return response.request.url.includes("/test-runs/");
}

function isTestProfileRunCreation(
  response: any,
): response is TestProfileRunCreateOrUpdateSuccessResponse {
  return response.request.url.includes("/test-profile-runs/");
}
