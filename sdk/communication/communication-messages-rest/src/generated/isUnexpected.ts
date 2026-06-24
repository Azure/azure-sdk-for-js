// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StreamOperationsGetMedia200Response,
  StreamOperationsGetMediaDefaultResponse,
  ReadReceiptsOperationsSend202Response,
  ReadReceiptsOperationsSendDefaultResponse,
  NotificationMessagesOperationsSend202Response,
  NotificationMessagesOperationsSendDefaultResponse,
  TemplateOperationsListTemplates200Response,
  TemplateOperationsListTemplatesDefaultResponse,
  ConversationThreadOperationsAddParticipants207Response,
  ConversationThreadOperationsAddParticipantsDefaultResponse,
  ConversationThreadOperationsRemoveParticipants207Response,
  ConversationThreadOperationsRemoveParticipantsDefaultResponse,
  ConversationThreadOperationsListConversations200Response,
  ConversationThreadOperationsListConversationsDefaultResponse,
  ConversationAdministrationOperationsCreateConversation201Response,
  ConversationAdministrationOperationsCreateConversationDefaultResponse,
  ConversationThreadOperationsListMessages200Response,
  ConversationThreadOperationsListMessagesDefaultResponse,
  ConversationThreadOperationsSendMessage200Response,
  ConversationThreadOperationsSendMessageDefaultResponse,
  ConversationThreadOperationsAnalyzeConversation200Response,
  ConversationThreadOperationsAnalyzeConversationDefaultResponse,
  ConversationAdministrationOperationsGetConversation200Response,
  ConversationAdministrationOperationsGetConversationDefaultResponse,
  ConversationAdministrationOperationsDeleteConversation204Response,
  ConversationAdministrationOperationsDeleteConversationDefaultResponse,
  ConversationAdministrationOperationsTerminateConversation200Response,
  ConversationAdministrationOperationsTerminateConversationDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /messages/streams/{id}": ["200"],
  "POST /messages/readreceipts:send": ["202"],
  "POST /messages/notifications:send": ["202"],
  "GET /messages/channels/{channelId}/templates": ["200"],
  "POST /messages/conversations/{conversationId}/participants:add": ["207"],
  "POST /messages/conversations/{conversationId}/participants:remove": ["207"],
  "GET /messages/conversations": ["200"],
  "POST /messages/conversations": ["201"],
  "GET /messages/conversations/{conversationId}/messages": ["200"],
  "POST /messages/conversations/{conversationId}/messages:send": ["200"],
  "POST /messages/conversations/{conversationId}:analyze": ["200"],
  "GET /messages/conversations/{conversationId}": ["200"],
  "DELETE /messages/conversations/{conversationId}": ["204"],
  "POST /messages/conversations/{conversationId}:terminate": ["200"],
};

export function isUnexpected(
  response: StreamOperationsGetMedia200Response | StreamOperationsGetMediaDefaultResponse,
): response is StreamOperationsGetMediaDefaultResponse;
export function isUnexpected(
  response: ReadReceiptsOperationsSend202Response | ReadReceiptsOperationsSendDefaultResponse,
): response is ReadReceiptsOperationsSendDefaultResponse;
export function isUnexpected(
  response:
    | NotificationMessagesOperationsSend202Response
    | NotificationMessagesOperationsSendDefaultResponse,
): response is NotificationMessagesOperationsSendDefaultResponse;
export function isUnexpected(
  response:
    | TemplateOperationsListTemplates200Response
    | TemplateOperationsListTemplatesDefaultResponse,
): response is TemplateOperationsListTemplatesDefaultResponse;
export function isUnexpected(
  response:
    | ConversationThreadOperationsAddParticipants207Response
    | ConversationThreadOperationsAddParticipantsDefaultResponse,
): response is ConversationThreadOperationsAddParticipantsDefaultResponse;
export function isUnexpected(
  response:
    | ConversationThreadOperationsRemoveParticipants207Response
    | ConversationThreadOperationsRemoveParticipantsDefaultResponse,
): response is ConversationThreadOperationsRemoveParticipantsDefaultResponse;
export function isUnexpected(
  response:
    | ConversationThreadOperationsListConversations200Response
    | ConversationThreadOperationsListConversationsDefaultResponse,
): response is ConversationThreadOperationsListConversationsDefaultResponse;
export function isUnexpected(
  response:
    | ConversationAdministrationOperationsCreateConversation201Response
    | ConversationAdministrationOperationsCreateConversationDefaultResponse,
): response is ConversationAdministrationOperationsCreateConversationDefaultResponse;
export function isUnexpected(
  response:
    | ConversationThreadOperationsListMessages200Response
    | ConversationThreadOperationsListMessagesDefaultResponse,
): response is ConversationThreadOperationsListMessagesDefaultResponse;
export function isUnexpected(
  response:
    | ConversationThreadOperationsSendMessage200Response
    | ConversationThreadOperationsSendMessageDefaultResponse,
): response is ConversationThreadOperationsSendMessageDefaultResponse;
export function isUnexpected(
  response:
    | ConversationThreadOperationsAnalyzeConversation200Response
    | ConversationThreadOperationsAnalyzeConversationDefaultResponse,
): response is ConversationThreadOperationsAnalyzeConversationDefaultResponse;
export function isUnexpected(
  response:
    | ConversationAdministrationOperationsGetConversation200Response
    | ConversationAdministrationOperationsGetConversationDefaultResponse,
): response is ConversationAdministrationOperationsGetConversationDefaultResponse;
export function isUnexpected(
  response:
    | ConversationAdministrationOperationsDeleteConversation204Response
    | ConversationAdministrationOperationsDeleteConversationDefaultResponse,
): response is ConversationAdministrationOperationsDeleteConversationDefaultResponse;
export function isUnexpected(
  response:
    | ConversationAdministrationOperationsTerminateConversation200Response
    | ConversationAdministrationOperationsTerminateConversationDefaultResponse,
): response is ConversationAdministrationOperationsTerminateConversationDefaultResponse;
export function isUnexpected(
  response:
    | StreamOperationsGetMedia200Response
    | StreamOperationsGetMediaDefaultResponse
    | ReadReceiptsOperationsSend202Response
    | ReadReceiptsOperationsSendDefaultResponse
    | NotificationMessagesOperationsSend202Response
    | NotificationMessagesOperationsSendDefaultResponse
    | TemplateOperationsListTemplates200Response
    | TemplateOperationsListTemplatesDefaultResponse
    | ConversationThreadOperationsAddParticipants207Response
    | ConversationThreadOperationsAddParticipantsDefaultResponse
    | ConversationThreadOperationsRemoveParticipants207Response
    | ConversationThreadOperationsRemoveParticipantsDefaultResponse
    | ConversationThreadOperationsListConversations200Response
    | ConversationThreadOperationsListConversationsDefaultResponse
    | ConversationAdministrationOperationsCreateConversation201Response
    | ConversationAdministrationOperationsCreateConversationDefaultResponse
    | ConversationThreadOperationsListMessages200Response
    | ConversationThreadOperationsListMessagesDefaultResponse
    | ConversationThreadOperationsSendMessage200Response
    | ConversationThreadOperationsSendMessageDefaultResponse
    | ConversationThreadOperationsAnalyzeConversation200Response
    | ConversationThreadOperationsAnalyzeConversationDefaultResponse
    | ConversationAdministrationOperationsGetConversation200Response
    | ConversationAdministrationOperationsGetConversationDefaultResponse
    | ConversationAdministrationOperationsDeleteConversation204Response
    | ConversationAdministrationOperationsDeleteConversationDefaultResponse
    | ConversationAdministrationOperationsTerminateConversation200Response
    | ConversationAdministrationOperationsTerminateConversationDefaultResponse,
): response is
  | StreamOperationsGetMediaDefaultResponse
  | ReadReceiptsOperationsSendDefaultResponse
  | NotificationMessagesOperationsSendDefaultResponse
  | TemplateOperationsListTemplatesDefaultResponse
  | ConversationThreadOperationsAddParticipantsDefaultResponse
  | ConversationThreadOperationsRemoveParticipantsDefaultResponse
  | ConversationThreadOperationsListConversationsDefaultResponse
  | ConversationAdministrationOperationsCreateConversationDefaultResponse
  | ConversationThreadOperationsListMessagesDefaultResponse
  | ConversationThreadOperationsSendMessageDefaultResponse
  | ConversationThreadOperationsAnalyzeConversationDefaultResponse
  | ConversationAdministrationOperationsGetConversationDefaultResponse
  | ConversationAdministrationOperationsDeleteConversationDefaultResponse
  | ConversationAdministrationOperationsTerminateConversationDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
