// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLoadTestingClient } from "./clientDefinitions";
import { getFileValidationPoller } from "./getFileValidationPoller";
import { getTestRunCompletionPoller } from "./getTestRunCompletionPoller";
import {
  FileUploadAndValidatePoller,
  TestUploadFileSuccessResponse,
  TestRunCompletionPoller,
  TestRunCreateOrUpdateSuccessResponse,
} from "./models";

export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestUploadFileSuccessResponse
): Promise<FileUploadAndValidatePoller | undefined>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestRunCreateOrUpdateSuccessResponse
): Promise<TestRunCompletionPoller | undefined>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestRunCreateOrUpdateSuccessResponse | TestUploadFileSuccessResponse
): Promise<TestRunCompletionPoller | FileUploadAndValidatePoller | undefined> {
  if (isFileUpload(initialResponse)) {
    return getFileValidationPoller(client, initialResponse);
  } else if (isTestRunCreation(initialResponse)) {
    return getTestRunCompletionPoller(client, initialResponse);
  }
  return undefined;
}

function isFileUpload(response: any): response is TestUploadFileSuccessResponse {
  return response.request.url.includes("/files/");
}

function isTestRunCreation(response: any): response is TestRunCreateOrUpdateSuccessResponse {
  return response.request.url.includes("/test-runs/");
}
