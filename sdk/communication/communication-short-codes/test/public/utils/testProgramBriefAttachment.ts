// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgramBriefAttachment, ShortCodesClient } from "../../../src";
import { v4 as uuid } from "uuid";

export function getTestProgramBriefAttachment(): ProgramBriefAttachment {
  const attachmentId = uuid();

  const testProgramBriefAttachment: ProgramBriefAttachment = {
    id: attachmentId,
    fileType: "png",
    type: "callToAction",
    fileName: "testFriendlyName",
    fileContentBase64:
      "iVBORw0KGgoAAAANSUhEUgAAAAYAAAAHCAIAAACk8qu6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAALEoAACxKAXd6dE0AAAAjSURBVBhXY/iPAXALrVixorW1FcKGCgH5DAxQNklmIcD//wCoTHalyfy2/AAAAABJRU5ErkJggg==",
  };

  return testProgramBriefAttachment;
}

export async function doesProgramBriefContainAnyAttachment(
  client: ShortCodesClient,
  programBriefId: string,
): Promise<boolean> {
  const attachments = await getProgramBriefAttachments(client, programBriefId, (_) => true);
  return attachments.length > 0;
}

export async function getProgramBriefAttachmentsWithId(
  client: ShortCodesClient,
  programBriefId: string,
  attachmentIds: string[],
): Promise<ProgramBriefAttachment[]> {
  return getProgramBriefAttachments(client, programBriefId, (attachment) =>
    attachmentIds.includes(attachment.id),
  );
}

export async function getProgramBriefAttachmentsWithIdByPage(
  client: ShortCodesClient,
  programBriefId: string,
  attachmentIds: string[],
): Promise<ProgramBriefAttachment[]> {
  return getProgramBriefAttachments(
    client,
    programBriefId,
    (attachment) => attachmentIds.includes(attachment.id),
    true,
  );
}

async function getProgramBriefAttachments(
  client: ShortCodesClient,
  programBriefId: string,
  predicate: (attachment: ProgramBriefAttachment) => boolean,
  byPage?: boolean,
): Promise<ProgramBriefAttachment[]> {
  const attachments: ProgramBriefAttachment[] = [];
  if (byPage) {
    const attachmentPages = client
      .listUSProgramBriefAttachments(programBriefId, { top: 1 })
      .byPage();
    for await (const page of attachmentPages) {
      // loop over each item in the page
      for (const attachment of page) {
        if (predicate(attachment)) {
          attachments.push(attachment);
        }
      }
    }
  } else {
    for await (const attachment of client.listUSProgramBriefAttachments(programBriefId)) {
      if (predicate(attachment)) {
        attachments.push(attachment);
      }
    }
  }
  return attachments;
}
