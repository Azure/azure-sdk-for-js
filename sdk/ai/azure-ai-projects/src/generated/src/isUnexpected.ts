// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AgentsCreateAgent200Response,
  AgentsCreateAgentDefaultResponse,
  AgentsListAgents200Response,
  AgentsListAgentsDefaultResponse,
  AgentsGetAgent200Response,
  AgentsGetAgentDefaultResponse,
  AgentsUpdateAgent200Response,
  AgentsUpdateAgentDefaultResponse,
  AgentsDeleteAgent200Response,
  AgentsDeleteAgentDefaultResponse,
  AgentsCreateThread200Response,
  AgentsCreateThreadDefaultResponse,
  AgentsGetThread200Response,
  AgentsGetThreadDefaultResponse,
  AgentsUpdateThread200Response,
  AgentsUpdateThreadDefaultResponse,
  AgentsDeleteThread200Response,
  AgentsDeleteThreadDefaultResponse,
  AgentsCreateMessage200Response,
  AgentsCreateMessageDefaultResponse,
  AgentsListMessages200Response,
  AgentsListMessagesDefaultResponse,
  AgentsGetMessage200Response,
  AgentsGetMessageDefaultResponse,
  AgentsUpdateMessage200Response,
  AgentsUpdateMessageDefaultResponse,
  AgentsCreateRun200Response,
  AgentsCreateRunDefaultResponse,
  AgentsListRuns200Response,
  AgentsListRunsDefaultResponse,
  AgentsGetRun200Response,
  AgentsGetRunDefaultResponse,
  AgentsUpdateRun200Response,
  AgentsUpdateRunDefaultResponse,
  AgentsSubmitToolOutputsToRun200Response,
  AgentsSubmitToolOutputsToRunDefaultResponse,
  AgentsCancelRun200Response,
  AgentsCancelRunDefaultResponse,
  AgentsCreateThreadAndRun200Response,
  AgentsCreateThreadAndRunDefaultResponse,
  AgentsGetRunStep200Response,
  AgentsGetRunStepDefaultResponse,
  AgentsListRunSteps200Response,
  AgentsListRunStepsDefaultResponse,
  AgentsListFiles200Response,
  AgentsListFilesDefaultResponse,
  AgentsUploadFile200Response,
  AgentsUploadFileDefaultResponse,
  AgentsDeleteFile200Response,
  AgentsDeleteFileDefaultResponse,
  AgentsGetFile200Response,
  AgentsGetFileDefaultResponse,
  AgentsGetFileContent200Response,
  AgentsGetFileContentDefaultResponse,
  AgentsListVectorStores200Response,
  AgentsListVectorStoresDefaultResponse,
  AgentsCreateVectorStore200Response,
  AgentsCreateVectorStoreDefaultResponse,
  AgentsGetVectorStore200Response,
  AgentsGetVectorStoreDefaultResponse,
  AgentsModifyVectorStore200Response,
  AgentsModifyVectorStoreDefaultResponse,
  AgentsDeleteVectorStore200Response,
  AgentsDeleteVectorStoreDefaultResponse,
  AgentsListVectorStoreFiles200Response,
  AgentsListVectorStoreFilesDefaultResponse,
  AgentsCreateVectorStoreFile200Response,
  AgentsCreateVectorStoreFileDefaultResponse,
  AgentsGetVectorStoreFile200Response,
  AgentsGetVectorStoreFileDefaultResponse,
  AgentsDeleteVectorStoreFile200Response,
  AgentsDeleteVectorStoreFileDefaultResponse,
  AgentsCreateVectorStoreFileBatch200Response,
  AgentsCreateVectorStoreFileBatchDefaultResponse,
  AgentsGetVectorStoreFileBatch200Response,
  AgentsGetVectorStoreFileBatchDefaultResponse,
  AgentsCancelVectorStoreFileBatch200Response,
  AgentsCancelVectorStoreFileBatchDefaultResponse,
  AgentsListVectorStoreFileBatchFiles200Response,
  AgentsListVectorStoreFileBatchFilesDefaultResponse,
  ConnectionsList200Response,
  ConnectionsListDefaultResponse,
  ConnectionsGet200Response,
  ConnectionsGetDefaultResponse,
  ConnectionsListSecrets200Response,
  ConnectionsListSecretsDefaultResponse,
  EvaluationsGet200Response,
  EvaluationsGetDefaultResponse,
  EvaluationsUpdate200Response,
  EvaluationsUpdateDefaultResponse,
  EvaluationsList200Response,
  EvaluationsListDefaultResponse,
  EvaluationsGetSchedule200Response,
  EvaluationsGetScheduleDefaultResponse,
  EvaluationsCreateOrReplaceSchedule200Response,
  EvaluationsCreateOrReplaceSchedule201Response,
  EvaluationsCreateOrReplaceScheduleDefaultResponse,
  EvaluationsDeleteSchedule204Response,
  EvaluationsDeleteScheduleDefaultResponse,
  EvaluationsListSchedule200Response,
  EvaluationsListScheduleDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "POST /assistants": ["200"],
  "GET /assistants": ["200"],
  "GET /assistants/{assistantId}": ["200"],
  "POST /assistants/{assistantId}": ["200"],
  "DELETE /assistants/{assistantId}": ["200"],
  "POST /threads": ["200"],
  "GET /threads/{threadId}": ["200"],
  "POST /threads/{threadId}": ["200"],
  "DELETE /threads/{threadId}": ["200"],
  "POST /threads/{threadId}/messages": ["200"],
  "GET /threads/{threadId}/messages": ["200"],
  "GET /threads/{threadId}/messages/{messageId}": ["200"],
  "POST /threads/{threadId}/messages/{messageId}": ["200"],
  "POST /threads/{threadId}/runs": ["200"],
  "GET /threads/{threadId}/runs": ["200"],
  "GET /threads/{threadId}/runs/{runId}": ["200"],
  "POST /threads/{threadId}/runs/{runId}": ["200"],
  "POST /threads/{threadId}/runs/{runId}/submit_tool_outputs": ["200"],
  "POST /threads/{threadId}/runs/{runId}/cancel": ["200"],
  "POST /threads/runs": ["200"],
  "GET /threads/{threadId}/runs/{runId}/steps/{stepId}": ["200"],
  "GET /threads/{threadId}/runs/{runId}/steps": ["200"],
  "GET /files": ["200"],
  "POST /files": ["200"],
  "DELETE /files/{fileId}": ["200"],
  "GET /files/{fileId}": ["200"],
  "GET /files/{fileId}/content": ["200"],
  "GET /vector_stores": ["200"],
  "POST /vector_stores": ["200"],
  "GET /vector_stores/{vectorStoreId}": ["200"],
  "POST /vector_stores/{vectorStoreId}": ["200"],
  "DELETE /vector_stores/{vectorStoreId}": ["200"],
  "GET /vector_stores/{vectorStoreId}/files": ["200"],
  "POST /vector_stores/{vectorStoreId}/files": ["200"],
  "GET /vector_stores/{vectorStoreId}/files/{fileId}": ["200"],
  "DELETE /vector_stores/{vectorStoreId}/files/{fileId}": ["200"],
  "POST /vector_stores/{vectorStoreId}/file_batches": ["200"],
  "GET /vector_stores/{vectorStoreId}/file_batches/{batchId}": ["200"],
  "POST /vector_stores/{vectorStoreId}/file_batches/{batchId}/cancel": ["200"],
  "GET /vector_stores/{vectorStoreId}/file_batches/{batchId}/files": ["200"],
  "GET /connections": ["200"],
  "GET /connections/{connectionName}": ["200"],
  "POST /connections/{connectionName}/listsecrets": ["200"],
  "GET /evaluations/runs/{id}": ["200"],
  "PATCH /evaluations/runs/{id}": ["200"],
  "POST /evaluations/runs:run": ["201"],
  "GET /evaluations/runs": ["200"],
  "GET /evaluations/schedules/{name}": ["200"],
  "PUT /evaluations/schedules/{name}": ["200", "201"],
  "DELETE /evaluations/schedules/{name}": ["204"],
  "GET /evaluations/schedules": ["200"],
};

export function isUnexpected(
  response: AgentsCreateAgent200Response | AgentsCreateAgentDefaultResponse,
): response is AgentsCreateAgentDefaultResponse;
export function isUnexpected(
  response: AgentsListAgents200Response | AgentsListAgentsDefaultResponse,
): response is AgentsListAgentsDefaultResponse;
export function isUnexpected(
  response: AgentsGetAgent200Response | AgentsGetAgentDefaultResponse,
): response is AgentsGetAgentDefaultResponse;
export function isUnexpected(
  response: AgentsUpdateAgent200Response | AgentsUpdateAgentDefaultResponse,
): response is AgentsUpdateAgentDefaultResponse;
export function isUnexpected(
  response: AgentsDeleteAgent200Response | AgentsDeleteAgentDefaultResponse,
): response is AgentsDeleteAgentDefaultResponse;
export function isUnexpected(
  response: AgentsCreateThread200Response | AgentsCreateThreadDefaultResponse,
): response is AgentsCreateThreadDefaultResponse;
export function isUnexpected(
  response: AgentsGetThread200Response | AgentsGetThreadDefaultResponse,
): response is AgentsGetThreadDefaultResponse;
export function isUnexpected(
  response: AgentsUpdateThread200Response | AgentsUpdateThreadDefaultResponse,
): response is AgentsUpdateThreadDefaultResponse;
export function isUnexpected(
  response: AgentsDeleteThread200Response | AgentsDeleteThreadDefaultResponse,
): response is AgentsDeleteThreadDefaultResponse;
export function isUnexpected(
  response: AgentsCreateMessage200Response | AgentsCreateMessageDefaultResponse,
): response is AgentsCreateMessageDefaultResponse;
export function isUnexpected(
  response: AgentsListMessages200Response | AgentsListMessagesDefaultResponse,
): response is AgentsListMessagesDefaultResponse;
export function isUnexpected(
  response: AgentsGetMessage200Response | AgentsGetMessageDefaultResponse,
): response is AgentsGetMessageDefaultResponse;
export function isUnexpected(
  response: AgentsUpdateMessage200Response | AgentsUpdateMessageDefaultResponse,
): response is AgentsUpdateMessageDefaultResponse;
export function isUnexpected(
  response: AgentsCreateRun200Response | AgentsCreateRunDefaultResponse,
): response is AgentsCreateRunDefaultResponse;
export function isUnexpected(
  response: AgentsListRuns200Response | AgentsListRunsDefaultResponse,
): response is AgentsListRunsDefaultResponse;
export function isUnexpected(
  response: AgentsGetRun200Response | AgentsGetRunDefaultResponse,
): response is AgentsGetRunDefaultResponse;
export function isUnexpected(
  response: AgentsUpdateRun200Response | AgentsUpdateRunDefaultResponse,
): response is AgentsUpdateRunDefaultResponse;
export function isUnexpected(
  response:
    | AgentsSubmitToolOutputsToRun200Response
    | AgentsSubmitToolOutputsToRunDefaultResponse,
): response is AgentsSubmitToolOutputsToRunDefaultResponse;
export function isUnexpected(
  response: AgentsCancelRun200Response | AgentsCancelRunDefaultResponse,
): response is AgentsCancelRunDefaultResponse;
export function isUnexpected(
  response:
    | AgentsCreateThreadAndRun200Response
    | AgentsCreateThreadAndRunDefaultResponse,
): response is AgentsCreateThreadAndRunDefaultResponse;
export function isUnexpected(
  response: AgentsGetRunStep200Response | AgentsGetRunStepDefaultResponse,
): response is AgentsGetRunStepDefaultResponse;
export function isUnexpected(
  response: AgentsListRunSteps200Response | AgentsListRunStepsDefaultResponse,
): response is AgentsListRunStepsDefaultResponse;
export function isUnexpected(
  response: AgentsListFiles200Response | AgentsListFilesDefaultResponse,
): response is AgentsListFilesDefaultResponse;
export function isUnexpected(
  response: AgentsUploadFile200Response | AgentsUploadFileDefaultResponse,
): response is AgentsUploadFileDefaultResponse;
export function isUnexpected(
  response: AgentsDeleteFile200Response | AgentsDeleteFileDefaultResponse,
): response is AgentsDeleteFileDefaultResponse;
export function isUnexpected(
  response: AgentsGetFile200Response | AgentsGetFileDefaultResponse,
): response is AgentsGetFileDefaultResponse;
export function isUnexpected(
  response:
    | AgentsGetFileContent200Response
    | AgentsGetFileContentDefaultResponse,
): response is AgentsGetFileContentDefaultResponse;
export function isUnexpected(
  response:
    | AgentsListVectorStores200Response
    | AgentsListVectorStoresDefaultResponse,
): response is AgentsListVectorStoresDefaultResponse;
export function isUnexpected(
  response:
    | AgentsCreateVectorStore200Response
    | AgentsCreateVectorStoreDefaultResponse,
): response is AgentsCreateVectorStoreDefaultResponse;
export function isUnexpected(
  response:
    | AgentsGetVectorStore200Response
    | AgentsGetVectorStoreDefaultResponse,
): response is AgentsGetVectorStoreDefaultResponse;
export function isUnexpected(
  response:
    | AgentsModifyVectorStore200Response
    | AgentsModifyVectorStoreDefaultResponse,
): response is AgentsModifyVectorStoreDefaultResponse;
export function isUnexpected(
  response:
    | AgentsDeleteVectorStore200Response
    | AgentsDeleteVectorStoreDefaultResponse,
): response is AgentsDeleteVectorStoreDefaultResponse;
export function isUnexpected(
  response:
    | AgentsListVectorStoreFiles200Response
    | AgentsListVectorStoreFilesDefaultResponse,
): response is AgentsListVectorStoreFilesDefaultResponse;
export function isUnexpected(
  response:
    | AgentsCreateVectorStoreFile200Response
    | AgentsCreateVectorStoreFileDefaultResponse,
): response is AgentsCreateVectorStoreFileDefaultResponse;
export function isUnexpected(
  response:
    | AgentsGetVectorStoreFile200Response
    | AgentsGetVectorStoreFileDefaultResponse,
): response is AgentsGetVectorStoreFileDefaultResponse;
export function isUnexpected(
  response:
    | AgentsDeleteVectorStoreFile200Response
    | AgentsDeleteVectorStoreFileDefaultResponse,
): response is AgentsDeleteVectorStoreFileDefaultResponse;
export function isUnexpected(
  response:
    | AgentsCreateVectorStoreFileBatch200Response
    | AgentsCreateVectorStoreFileBatchDefaultResponse,
): response is AgentsCreateVectorStoreFileBatchDefaultResponse;
export function isUnexpected(
  response:
    | AgentsGetVectorStoreFileBatch200Response
    | AgentsGetVectorStoreFileBatchDefaultResponse,
): response is AgentsGetVectorStoreFileBatchDefaultResponse;
export function isUnexpected(
  response:
    | AgentsCancelVectorStoreFileBatch200Response
    | AgentsCancelVectorStoreFileBatchDefaultResponse,
): response is AgentsCancelVectorStoreFileBatchDefaultResponse;
export function isUnexpected(
  response:
    | AgentsListVectorStoreFileBatchFiles200Response
    | AgentsListVectorStoreFileBatchFilesDefaultResponse,
): response is AgentsListVectorStoreFileBatchFilesDefaultResponse;
export function isUnexpected(
  response: ConnectionsList200Response | ConnectionsListDefaultResponse,
): response is ConnectionsListDefaultResponse;
export function isUnexpected(
  response: ConnectionsGet200Response | ConnectionsGetDefaultResponse,
): response is ConnectionsGetDefaultResponse;
export function isUnexpected(
  response:
    | ConnectionsListSecrets200Response
    | ConnectionsListSecretsDefaultResponse,
): response is ConnectionsListSecretsDefaultResponse;
export function isUnexpected(
  response: EvaluationsGet200Response | EvaluationsGetDefaultResponse,
): response is EvaluationsGetDefaultResponse;
export function isUnexpected(
  response: EvaluationsUpdate200Response | EvaluationsUpdateDefaultResponse,
): response is EvaluationsUpdateDefaultResponse;
export function isUnexpected(
  response: EvaluationsList200Response | EvaluationsListDefaultResponse,
): response is EvaluationsListDefaultResponse;
export function isUnexpected(
  response:
    | EvaluationsGetSchedule200Response
    | EvaluationsGetScheduleDefaultResponse,
): response is EvaluationsGetScheduleDefaultResponse;
export function isUnexpected(
  response:
    | EvaluationsCreateOrReplaceSchedule200Response
    | EvaluationsCreateOrReplaceSchedule201Response
    | EvaluationsCreateOrReplaceScheduleDefaultResponse,
): response is EvaluationsCreateOrReplaceScheduleDefaultResponse;
export function isUnexpected(
  response:
    | EvaluationsDeleteSchedule204Response
    | EvaluationsDeleteScheduleDefaultResponse,
): response is EvaluationsDeleteScheduleDefaultResponse;
export function isUnexpected(
  response:
    | EvaluationsListSchedule200Response
    | EvaluationsListScheduleDefaultResponse,
): response is EvaluationsListScheduleDefaultResponse;
export function isUnexpected(
  response:
    | AgentsCreateAgent200Response
    | AgentsCreateAgentDefaultResponse
    | AgentsListAgents200Response
    | AgentsListAgentsDefaultResponse
    | AgentsGetAgent200Response
    | AgentsGetAgentDefaultResponse
    | AgentsUpdateAgent200Response
    | AgentsUpdateAgentDefaultResponse
    | AgentsDeleteAgent200Response
    | AgentsDeleteAgentDefaultResponse
    | AgentsCreateThread200Response
    | AgentsCreateThreadDefaultResponse
    | AgentsGetThread200Response
    | AgentsGetThreadDefaultResponse
    | AgentsUpdateThread200Response
    | AgentsUpdateThreadDefaultResponse
    | AgentsDeleteThread200Response
    | AgentsDeleteThreadDefaultResponse
    | AgentsCreateMessage200Response
    | AgentsCreateMessageDefaultResponse
    | AgentsListMessages200Response
    | AgentsListMessagesDefaultResponse
    | AgentsGetMessage200Response
    | AgentsGetMessageDefaultResponse
    | AgentsUpdateMessage200Response
    | AgentsUpdateMessageDefaultResponse
    | AgentsCreateRun200Response
    | AgentsCreateRunDefaultResponse
    | AgentsListRuns200Response
    | AgentsListRunsDefaultResponse
    | AgentsGetRun200Response
    | AgentsGetRunDefaultResponse
    | AgentsUpdateRun200Response
    | AgentsUpdateRunDefaultResponse
    | AgentsSubmitToolOutputsToRun200Response
    | AgentsSubmitToolOutputsToRunDefaultResponse
    | AgentsCancelRun200Response
    | AgentsCancelRunDefaultResponse
    | AgentsCreateThreadAndRun200Response
    | AgentsCreateThreadAndRunDefaultResponse
    | AgentsGetRunStep200Response
    | AgentsGetRunStepDefaultResponse
    | AgentsListRunSteps200Response
    | AgentsListRunStepsDefaultResponse
    | AgentsListFiles200Response
    | AgentsListFilesDefaultResponse
    | AgentsUploadFile200Response
    | AgentsUploadFileDefaultResponse
    | AgentsDeleteFile200Response
    | AgentsDeleteFileDefaultResponse
    | AgentsGetFile200Response
    | AgentsGetFileDefaultResponse
    | AgentsGetFileContent200Response
    | AgentsGetFileContentDefaultResponse
    | AgentsListVectorStores200Response
    | AgentsListVectorStoresDefaultResponse
    | AgentsCreateVectorStore200Response
    | AgentsCreateVectorStoreDefaultResponse
    | AgentsGetVectorStore200Response
    | AgentsGetVectorStoreDefaultResponse
    | AgentsModifyVectorStore200Response
    | AgentsModifyVectorStoreDefaultResponse
    | AgentsDeleteVectorStore200Response
    | AgentsDeleteVectorStoreDefaultResponse
    | AgentsListVectorStoreFiles200Response
    | AgentsListVectorStoreFilesDefaultResponse
    | AgentsCreateVectorStoreFile200Response
    | AgentsCreateVectorStoreFileDefaultResponse
    | AgentsGetVectorStoreFile200Response
    | AgentsGetVectorStoreFileDefaultResponse
    | AgentsDeleteVectorStoreFile200Response
    | AgentsDeleteVectorStoreFileDefaultResponse
    | AgentsCreateVectorStoreFileBatch200Response
    | AgentsCreateVectorStoreFileBatchDefaultResponse
    | AgentsGetVectorStoreFileBatch200Response
    | AgentsGetVectorStoreFileBatchDefaultResponse
    | AgentsCancelVectorStoreFileBatch200Response
    | AgentsCancelVectorStoreFileBatchDefaultResponse
    | AgentsListVectorStoreFileBatchFiles200Response
    | AgentsListVectorStoreFileBatchFilesDefaultResponse
    | ConnectionsList200Response
    | ConnectionsListDefaultResponse
    | ConnectionsGet200Response
    | ConnectionsGetDefaultResponse
    | ConnectionsListSecrets200Response
    | ConnectionsListSecretsDefaultResponse
    | EvaluationsGet200Response
    | EvaluationsGetDefaultResponse
    | EvaluationsUpdate200Response
    | EvaluationsUpdateDefaultResponse
    | EvaluationsList200Response
    | EvaluationsListDefaultResponse
    | EvaluationsGetSchedule200Response
    | EvaluationsGetScheduleDefaultResponse
    | EvaluationsCreateOrReplaceSchedule200Response
    | EvaluationsCreateOrReplaceSchedule201Response
    | EvaluationsCreateOrReplaceScheduleDefaultResponse
    | EvaluationsDeleteSchedule204Response
    | EvaluationsDeleteScheduleDefaultResponse
    | EvaluationsListSchedule200Response
    | EvaluationsListScheduleDefaultResponse,
): response is
  | AgentsCreateAgentDefaultResponse
  | AgentsListAgentsDefaultResponse
  | AgentsGetAgentDefaultResponse
  | AgentsUpdateAgentDefaultResponse
  | AgentsDeleteAgentDefaultResponse
  | AgentsCreateThreadDefaultResponse
  | AgentsGetThreadDefaultResponse
  | AgentsUpdateThreadDefaultResponse
  | AgentsDeleteThreadDefaultResponse
  | AgentsCreateMessageDefaultResponse
  | AgentsListMessagesDefaultResponse
  | AgentsGetMessageDefaultResponse
  | AgentsUpdateMessageDefaultResponse
  | AgentsCreateRunDefaultResponse
  | AgentsListRunsDefaultResponse
  | AgentsGetRunDefaultResponse
  | AgentsUpdateRunDefaultResponse
  | AgentsSubmitToolOutputsToRunDefaultResponse
  | AgentsCancelRunDefaultResponse
  | AgentsCreateThreadAndRunDefaultResponse
  | AgentsGetRunStepDefaultResponse
  | AgentsListRunStepsDefaultResponse
  | AgentsListFilesDefaultResponse
  | AgentsUploadFileDefaultResponse
  | AgentsDeleteFileDefaultResponse
  | AgentsGetFileDefaultResponse
  | AgentsGetFileContentDefaultResponse
  | AgentsListVectorStoresDefaultResponse
  | AgentsCreateVectorStoreDefaultResponse
  | AgentsGetVectorStoreDefaultResponse
  | AgentsModifyVectorStoreDefaultResponse
  | AgentsDeleteVectorStoreDefaultResponse
  | AgentsListVectorStoreFilesDefaultResponse
  | AgentsCreateVectorStoreFileDefaultResponse
  | AgentsGetVectorStoreFileDefaultResponse
  | AgentsDeleteVectorStoreFileDefaultResponse
  | AgentsCreateVectorStoreFileBatchDefaultResponse
  | AgentsGetVectorStoreFileBatchDefaultResponse
  | AgentsCancelVectorStoreFileBatchDefaultResponse
  | AgentsListVectorStoreFileBatchFilesDefaultResponse
  | ConnectionsListDefaultResponse
  | ConnectionsGetDefaultResponse
  | ConnectionsListSecretsDefaultResponse
  | EvaluationsGetDefaultResponse
  | EvaluationsUpdateDefaultResponse
  | EvaluationsListDefaultResponse
  | EvaluationsGetScheduleDefaultResponse
  | EvaluationsCreateOrReplaceScheduleDefaultResponse
  | EvaluationsDeleteScheduleDefaultResponse
  | EvaluationsListScheduleDefaultResponse {
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
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`,
        ).test(pathParts[j] || "");

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
