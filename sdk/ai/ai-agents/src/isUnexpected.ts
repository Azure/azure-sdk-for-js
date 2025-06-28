// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CreateAgent200Response,
  CreateAgentDefaultResponse,
  GetAgent200Response,
  GetAgentDefaultResponse,
  UpdateAgent200Response,
  UpdateAgentDefaultResponse,
  DeleteAgent200Response,
  DeleteAgentDefaultResponse,
  CreateThreadAndRun200Response,
  CreateThreadAndRunDefaultResponse,
  CreateThread200Response,
  CreateThreadDefaultResponse,
  GetThread200Response,
  GetThreadDefaultResponse,
  UpdateThread200Response,
  UpdateThreadDefaultResponse,
  DeleteThread200Response,
  DeleteThreadDefaultResponse,
  CreateMessage200Response,
  CreateMessageDefaultResponse,
  GetMessage200Response,
  GetMessageDefaultResponse,
  UpdateMessage200Response,
  UpdateMessageDefaultResponse,
  CreateRun200Response,
  CreateRunDefaultResponse,
  GetRun200Response,
  GetRunDefaultResponse,
  UpdateRun200Response,
  UpdateRunDefaultResponse,
  SubmitToolOutputsToRun200Response,
  SubmitToolOutputsToRunDefaultResponse,
  CancelRun200Response,
  CancelRunDefaultResponse,
  GetRunStep200Response,
  GetRunStepDefaultResponse,
  ListFiles200Response,
  ListFilesDefaultResponse,
  UploadFile200Response,
  UploadFileDefaultResponse,
  DeleteFile200Response,
  DeleteFileDefaultResponse,
  GetFile200Response,
  GetFileDefaultResponse,
  GetFileContent200Response,
  GetFileContentDefaultResponse,
  CreateVectorStore200Response,
  CreateVectorStoreDefaultResponse,
  GetVectorStore200Response,
  GetVectorStoreDefaultResponse,
  ModifyVectorStore200Response,
  ModifyVectorStoreDefaultResponse,
  DeleteVectorStore200Response,
  DeleteVectorStoreDefaultResponse,
  CreateVectorStoreFile200Response,
  CreateVectorStoreFileDefaultResponse,
  GetVectorStoreFile200Response,
  GetVectorStoreFileDefaultResponse,
  DeleteVectorStoreFile200Response,
  DeleteVectorStoreFileDefaultResponse,
  CreateVectorStoreFileBatch200Response,
  CreateVectorStoreFileBatchDefaultResponse,
  GetVectorStoreFileBatch200Response,
  GetVectorStoreFileBatchDefaultResponse,
  CancelVectorStoreFileBatch200Response,
  CancelVectorStoreFileBatchDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "POST /assistants": ["200"],
  "GET /assistants": ["200"],
  "GET /assistants/{assistantId}": ["200"],
  "POST /assistants/{assistantId}": ["200"],
  "DELETE /assistants/{assistantId}": ["200"],
  "POST /threads/runs": ["200"],
  "POST /threads": ["200"],
  "GET /threads": ["200"],
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
};

export function isUnexpected(
  response: CreateAgent200Response | CreateAgentDefaultResponse,
): response is CreateAgentDefaultResponse;
export function isUnexpected(
  response: GetAgent200Response | GetAgentDefaultResponse,
): response is GetAgentDefaultResponse;
export function isUnexpected(
  response: UpdateAgent200Response | UpdateAgentDefaultResponse,
): response is UpdateAgentDefaultResponse;
export function isUnexpected(
  response: DeleteAgent200Response | DeleteAgentDefaultResponse,
): response is DeleteAgentDefaultResponse;
export function isUnexpected(
  response: CreateThreadAndRun200Response | CreateThreadAndRunDefaultResponse,
): response is CreateThreadAndRunDefaultResponse;
export function isUnexpected(
  response: CreateThread200Response | CreateThreadDefaultResponse,
): response is CreateThreadDefaultResponse;
export function isUnexpected(
  response: GetThread200Response | GetThreadDefaultResponse,
): response is GetThreadDefaultResponse;
export function isUnexpected(
  response: UpdateThread200Response | UpdateThreadDefaultResponse,
): response is UpdateThreadDefaultResponse;
export function isUnexpected(
  response: DeleteThread200Response | DeleteThreadDefaultResponse,
): response is DeleteThreadDefaultResponse;
export function isUnexpected(
  response: CreateMessage200Response | CreateMessageDefaultResponse,
): response is CreateMessageDefaultResponse;
export function isUnexpected(
  response: GetMessage200Response | GetMessageDefaultResponse,
): response is GetMessageDefaultResponse;
export function isUnexpected(
  response: UpdateMessage200Response | UpdateMessageDefaultResponse,
): response is UpdateMessageDefaultResponse;
export function isUnexpected(
  response: CreateRun200Response | CreateRunDefaultResponse,
): response is CreateRunDefaultResponse;
export function isUnexpected(
  response: GetRun200Response | GetRunDefaultResponse,
): response is GetRunDefaultResponse;
export function isUnexpected(
  response: UpdateRun200Response | UpdateRunDefaultResponse,
): response is UpdateRunDefaultResponse;
export function isUnexpected(
  response:
    | SubmitToolOutputsToRun200Response
    | SubmitToolOutputsToRunDefaultResponse,
): response is SubmitToolOutputsToRunDefaultResponse;
export function isUnexpected(
  response: CancelRun200Response | CancelRunDefaultResponse,
): response is CancelRunDefaultResponse;
export function isUnexpected(
  response: GetRunStep200Response | GetRunStepDefaultResponse,
): response is GetRunStepDefaultResponse;
export function isUnexpected(
  response: ListFiles200Response | ListFilesDefaultResponse,
): response is ListFilesDefaultResponse;
export function isUnexpected(
  response: UploadFile200Response | UploadFileDefaultResponse,
): response is UploadFileDefaultResponse;
export function isUnexpected(
  response: DeleteFile200Response | DeleteFileDefaultResponse,
): response is DeleteFileDefaultResponse;
export function isUnexpected(
  response: GetFile200Response | GetFileDefaultResponse,
): response is GetFileDefaultResponse;
export function isUnexpected(
  response: GetFileContent200Response | GetFileContentDefaultResponse,
): response is GetFileContentDefaultResponse;
export function isUnexpected(
  response: CreateVectorStore200Response | CreateVectorStoreDefaultResponse,
): response is CreateVectorStoreDefaultResponse;
export function isUnexpected(
  response: GetVectorStore200Response | GetVectorStoreDefaultResponse,
): response is GetVectorStoreDefaultResponse;
export function isUnexpected(
  response: ModifyVectorStore200Response | ModifyVectorStoreDefaultResponse,
): response is ModifyVectorStoreDefaultResponse;
export function isUnexpected(
  response: DeleteVectorStore200Response | DeleteVectorStoreDefaultResponse,
): response is DeleteVectorStoreDefaultResponse;
export function isUnexpected(
  response:
    | CreateVectorStoreFile200Response
    | CreateVectorStoreFileDefaultResponse,
): response is CreateVectorStoreFileDefaultResponse;
export function isUnexpected(
  response: GetVectorStoreFile200Response | GetVectorStoreFileDefaultResponse,
): response is GetVectorStoreFileDefaultResponse;
export function isUnexpected(
  response:
    | DeleteVectorStoreFile200Response
    | DeleteVectorStoreFileDefaultResponse,
): response is DeleteVectorStoreFileDefaultResponse;
export function isUnexpected(
  response:
    | CreateVectorStoreFileBatch200Response
    | CreateVectorStoreFileBatchDefaultResponse,
): response is CreateVectorStoreFileBatchDefaultResponse;
export function isUnexpected(
  response:
    | GetVectorStoreFileBatch200Response
    | GetVectorStoreFileBatchDefaultResponse,
): response is GetVectorStoreFileBatchDefaultResponse;
export function isUnexpected(
  response:
    | CancelVectorStoreFileBatch200Response
    | CancelVectorStoreFileBatchDefaultResponse,
): response is CancelVectorStoreFileBatchDefaultResponse;
export function isUnexpected(
  response:
    | CreateAgent200Response
    | CreateAgentDefaultResponse
    | GetAgent200Response
    | GetAgentDefaultResponse
    | UpdateAgent200Response
    | UpdateAgentDefaultResponse
    | DeleteAgent200Response
    | DeleteAgentDefaultResponse
    | CreateThreadAndRun200Response
    | CreateThreadAndRunDefaultResponse
    | CreateThread200Response
    | CreateThreadDefaultResponse
    | GetThread200Response
    | GetThreadDefaultResponse
    | UpdateThread200Response
    | UpdateThreadDefaultResponse
    | DeleteThread200Response
    | DeleteThreadDefaultResponse
    | CreateMessage200Response
    | CreateMessageDefaultResponse
    | GetMessage200Response
    | GetMessageDefaultResponse
    | UpdateMessage200Response
    | UpdateMessageDefaultResponse
    | CreateRun200Response
    | CreateRunDefaultResponse
    | GetRun200Response
    | GetRunDefaultResponse
    | UpdateRun200Response
    | UpdateRunDefaultResponse
    | SubmitToolOutputsToRun200Response
    | SubmitToolOutputsToRunDefaultResponse
    | CancelRun200Response
    | CancelRunDefaultResponse
    | GetRunStep200Response
    | GetRunStepDefaultResponse
    | ListFiles200Response
    | ListFilesDefaultResponse
    | UploadFile200Response
    | UploadFileDefaultResponse
    | DeleteFile200Response
    | DeleteFileDefaultResponse
    | GetFile200Response
    | GetFileDefaultResponse
    | GetFileContent200Response
    | GetFileContentDefaultResponse
    | CreateVectorStore200Response
    | CreateVectorStoreDefaultResponse
    | GetVectorStore200Response
    | GetVectorStoreDefaultResponse
    | ModifyVectorStore200Response
    | ModifyVectorStoreDefaultResponse
    | DeleteVectorStore200Response
    | DeleteVectorStoreDefaultResponse
    | CreateVectorStoreFile200Response
    | CreateVectorStoreFileDefaultResponse
    | GetVectorStoreFile200Response
    | GetVectorStoreFileDefaultResponse
    | DeleteVectorStoreFile200Response
    | DeleteVectorStoreFileDefaultResponse
    | CreateVectorStoreFileBatch200Response
    | CreateVectorStoreFileBatchDefaultResponse
    | GetVectorStoreFileBatch200Response
    | GetVectorStoreFileBatchDefaultResponse
    | CancelVectorStoreFileBatch200Response
    | CancelVectorStoreFileBatchDefaultResponse,
): response is
  | CreateAgentDefaultResponse
  | GetAgentDefaultResponse
  | UpdateAgentDefaultResponse
  | DeleteAgentDefaultResponse
  | CreateThreadAndRunDefaultResponse
  | CreateThreadDefaultResponse
  | GetThreadDefaultResponse
  | UpdateThreadDefaultResponse
  | DeleteThreadDefaultResponse
  | CreateMessageDefaultResponse
  | GetMessageDefaultResponse
  | UpdateMessageDefaultResponse
  | CreateRunDefaultResponse
  | GetRunDefaultResponse
  | UpdateRunDefaultResponse
  | SubmitToolOutputsToRunDefaultResponse
  | CancelRunDefaultResponse
  | GetRunStepDefaultResponse
  | ListFilesDefaultResponse
  | UploadFileDefaultResponse
  | DeleteFileDefaultResponse
  | GetFileDefaultResponse
  | GetFileContentDefaultResponse
  | CreateVectorStoreDefaultResponse
  | GetVectorStoreDefaultResponse
  | ModifyVectorStoreDefaultResponse
  | DeleteVectorStoreDefaultResponse
  | CreateVectorStoreFileDefaultResponse
  | GetVectorStoreFileDefaultResponse
  | DeleteVectorStoreFileDefaultResponse
  | CreateVectorStoreFileBatchDefaultResponse
  | GetVectorStoreFileBatchDefaultResponse
  | CancelVectorStoreFileBatchDefaultResponse {
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
