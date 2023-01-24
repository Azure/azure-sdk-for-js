// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureLoadTestingClient } from "./clientDefinitions";
import { getFileValidationPoller } from "./getFileValidationPoller";
import { getTestRunCompletionPoller } from "./getTestRunCompletionPoller";
import {
  FileUploadAndValidatePoller,
  FileValidationResponse,
  TestRunCompletionPoller,
  TestRunCompletionResponse,
} from "./models";

export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse3: FileValidationResponse
): Promise<FileUploadAndValidatePoller | undefined>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse2: TestRunCompletionResponse
): Promise<TestRunCompletionPoller | undefined>;
export async function getLongRunningPoller(
  client: AzureLoadTestingClient,
  initialResponse: TestRunCompletionResponse | FileValidationResponse
): Promise<TestRunCompletionPoller | FileUploadAndValidatePoller | undefined> {
  if (isFileValidation(initialResponse)) {
    return getFileValidationPoller(client, initialResponse);
  } else if (isTestRunCompletion(initialResponse)) {
    return getTestRunCompletionPoller(client, initialResponse);
  }
  return undefined;
}

function isFileValidation(response: any): response is FileValidationResponse {
  return response.request.url.includes("files");
}

function isTestRunCompletion(response: any): response is TestRunCompletionResponse {
  return response.request.url.includes("test-runs");
}
