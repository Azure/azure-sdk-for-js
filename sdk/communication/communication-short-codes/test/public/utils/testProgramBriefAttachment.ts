// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProgramBriefAttachment, ShortCodesClient } from "../../../src";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { v1 as uuid } from "uuid";

export function getTestProgramBriefAttachment(): ProgramBriefAttachment {
  let attachmentId = uuid();

  if (isPlaybackMode()) {
    attachmentId = "9d787bd6-07fc-4c7b-8e57-17f1fee41298";
  }

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
  programBriefId: string
): Promise<boolean> {
  return doesProgramBriefContainAttachment(client, programBriefId, (_) => true);
}

export async function doesProgramBriefContainAttachment(
  client: ShortCodesClient,
  programBriefId: string,
  predicate: (attachment: ProgramBriefAttachment) => boolean
): Promise<boolean> {
  const attachment = await getProgramBriefAttachment(client, programBriefId, predicate);
  return !!attachment;
}

export async function getProgramBriefAttachmentWithId(
  client: ShortCodesClient,
  programBriefId: string,
  attachmentId: string
): Promise<null | ProgramBriefAttachment> {
  return getProgramBriefAttachment(
    client,
    programBriefId,
    (attachment) => attachment.id === attachmentId
  );
}

async function getProgramBriefAttachment(
  client: ShortCodesClient,
  programBriefId: string,
  predicate: (attachment: ProgramBriefAttachment) => boolean
): Promise<null | ProgramBriefAttachment> {
  for await (const attachment of client.listUSProgramBriefAttachments(programBriefId)) {
    if (predicate(attachment)) {
      return attachment;
    }
  }

  return null;
}
