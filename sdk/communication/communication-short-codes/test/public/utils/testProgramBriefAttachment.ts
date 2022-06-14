// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { ProgramBriefAttachment } from "../../../src";
import { RestError } from "@azure/core-rest-pipeline";

export function getTestProgramBriefAttachment(): ProgramBriefAttachment {
  const testProgramBriefAttachment: ProgramBriefAttachment = {
    id: "00000000-0000-0000-0000-000000000000",
    fileType: "png",
    type: "callToAction",
    fileName: "testFriendlyName",
  };

  return testProgramBriefAttachment;
}

export async function assertProgramBriefAttachmentApiReachable(
  spec: () => Promise<any>,
  context: string
): Promise<void> {
  try {
    await spec();
  } catch (error) {
    if (error instanceof RestError) {
      if (error.response?.bodyAsText && error.response.bodyAsText.length > 0) {
        return;
      } else {
        console.error(
          `Failed to call a Program Brief Attachment API. It looks like the API for '${context}' is not reachable.`
        );
      }
    }

    throw error;
  }
}

export async function assertProgramBriefAttachmentPageableApiReachable<T>(
  spec: () => PagedAsyncIterableIterator<T>,
  context: string
): Promise<void> {
  await assertProgramBriefAttachmentApiReachable(async () => {
    const page = spec();
    await page.next();
  }, context);
}
