// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProgramBriefAttachment, ShortCodesClient } from "../../../src";
import { isPlaybackMode } from "@azure-tools/test-recorder";

const testAttachmentIds = [
  "31512719-290c-4f35-8514-f6290fdcfe58",
  "6b22484c-95b8-43ff-90e8-3371c536d69e",
  "9c77c9d2-33d7-48ee-8899-2e10573d3acb",
  "f27f98c7-da22-493b-9e06-5906ec76a0e6",
  "a666860c-dc49-4c74-be0d-ee67a7030c46",
  "3e15f517-5701-4504-8a68-b34edfe90ef9",
  "5168cbba-46f9-41c8-817c-3763de691fee",
  "70be3b60-0226-4f3d-984b-7b53359f44b7",
  "8ca29871-818d-4d2c-a810-1ca84476a8d1",
  "9e12599b-4493-4395-90b9-ad2cfd92ca5c",
  "1110ce8b-410c-465e-9380-eec0ac18d2f9",
  "8d31b288-4f3b-4b33-a7d5-aa3f00540326",
  "e7e171fb-e45b-4443-b103-fe207dfa4b9a",
  "c6369c22-9a33-4795-8fb3-b0a671112fd9",
  "f1a736af-9e7b-4a2e-a921-4b6de1f01550",
  "789ad94f-831a-4934-9708-afa187c4e4c8",
  "a40eb16c-bd88-42d6-80ff-2bf73d2862ba",
  "96ffe0e0-ebdf-4536-b96f-55f2ae550fcd",
  "9c3cc441-44d7-4508-bf84-d20e657054ca",
  "560c3341-66ee-4078-bf49-532ebd9e3bf1",
  "5172bec2-dd08-44d1-912f-073a9f68f3b3",
  "c3c2ed41-7c1c-48f2-9940-9f0240326e0b",
  "d4e85fae-bd2a-46c1-a361-a393ced34ecd",
  "5f6ace43-7dd5-499e-b8e7-c1c328e21009",
  "68de428f-444a-4926-a14d-ad51d47cce06",
  "49d70cfd-21ed-4e8a-9449-d7588df3ca48",
  "bf284e18-7a47-4673-b76b-d5df0f98b776",
  "82deea29-f718-4ddb-b005-7f0402c387a8",
  "3cb697f5-135b-4911-8e6b-d77319503b81",
  "a2c6bf1c-9b93-4ead-b0db-d36e1d3289cb",
];

export function getTestProgramBriefAttachment(): ProgramBriefAttachment {
  const randomTestId = testAttachmentIds[Math.floor(Math.random() * testAttachmentIds.length)];

  const testProgramBriefAttachment: ProgramBriefAttachment = {
    id: isPlaybackMode() ? "9d787bd6-07fc-4c7b-8e57-17f1fee41298" : randomTestId,
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
