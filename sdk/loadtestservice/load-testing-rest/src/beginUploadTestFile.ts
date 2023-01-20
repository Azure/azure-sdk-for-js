// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FileUploadAndValidatePoller } from "./models";
import { AzureLoadTestingClient } from "./clientDefinitions";
import { isUnexpected } from "./isUnexpected";
import { getFileValidatePoller } from "./getFileValidatePoller";
import { TestUploadFileParameters } from "./parameters";

/**
 * Uploads a file and creates a poller to poll for validation.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function beginUploadTestFile(
  client: AzureLoadTestingClient,
  testId: string,
  fileName: string,
  uploadParams: TestUploadFileParameters
): Promise<FileUploadAndValidatePoller> {
  const fileUploadResult = await client
    .path("/tests/{testId}/files/{fileName}", testId, fileName)
    .put(uploadParams);

  if (isUnexpected(fileUploadResult)) {
    throw fileUploadResult.body.error;
  }

  return getFileValidatePoller(client, fileUploadResult, testId);
}
