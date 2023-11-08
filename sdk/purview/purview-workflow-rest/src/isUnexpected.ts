// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  WorkflowsList200Response,
  WorkflowsListDefaultResponse,
  WorkflowGet200Response,
  WorkflowGetDefaultResponse,
  WorkflowCreateOrReplace200Response,
  WorkflowCreateOrReplaceDefaultResponse,
  WorkflowDelete204Response,
  WorkflowDeleteDefaultResponse,
  WorkflowValidate200Response,
  WorkflowValidateDefaultResponse,
  UserRequestsSubmit200Response,
  UserRequestsSubmitDefaultResponse,
  WorkflowRunsList200Response,
  WorkflowRunsListDefaultResponse,
  WorkflowRunGet200Response,
  WorkflowRunGetDefaultResponse,
  WorkflowRunCancel200Response,
  WorkflowRunCancelDefaultResponse,
  WorkflowTasksList200Response,
  WorkflowTasksListDefaultResponse,
  WorkflowTaskGet200Response,
  WorkflowTaskGetDefaultResponse,
  WorkflowTaskReassign200Response,
  WorkflowTaskReassignDefaultResponse,
  ApprovalApprove200Response,
  ApprovalApproveDefaultResponse,
  ApprovalReject200Response,
  ApprovalRejectDefaultResponse,
  TaskStatusUpdate200Response,
  TaskStatusUpdateDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /workflows": ["200"],
  "GET /workflows/{workflowId}": ["200"],
  "PUT /workflows/{workflowId}": ["200"],
  "DELETE /workflows/{workflowId}": ["204"],
  "POST /workflows/{workflowId}/validate": ["200"],
  "POST /userrequests": ["200"],
  "GET /workflowruns": ["200"],
  "GET /workflowruns/{workflowRunId}": ["200"],
  "POST /workflowruns/{workflowRunId}/cancel": ["200"],
  "GET /workflowtasks": ["200"],
  "GET /workflowtasks/{taskId}": ["200"],
  "POST /workflowtasks/{taskId}/reassign": ["200"],
  "POST /workflowtasks/{taskId}/approve-approval": ["200"],
  "POST /workflowtasks/{taskId}/reject-approval": ["200"],
  "POST /workflowtasks/{taskId}/change-task-status": ["200"],
};

export function isUnexpected(
  response: WorkflowsList200Response | WorkflowsListDefaultResponse
): response is WorkflowsListDefaultResponse;
export function isUnexpected(
  response: WorkflowGet200Response | WorkflowGetDefaultResponse
): response is WorkflowGetDefaultResponse;
export function isUnexpected(
  response: WorkflowCreateOrReplace200Response | WorkflowCreateOrReplaceDefaultResponse
): response is WorkflowCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: WorkflowDelete204Response | WorkflowDeleteDefaultResponse
): response is WorkflowDeleteDefaultResponse;
export function isUnexpected(
  response: WorkflowValidate200Response | WorkflowValidateDefaultResponse
): response is WorkflowValidateDefaultResponse;
export function isUnexpected(
  response: UserRequestsSubmit200Response | UserRequestsSubmitDefaultResponse
): response is UserRequestsSubmitDefaultResponse;
export function isUnexpected(
  response: WorkflowRunsList200Response | WorkflowRunsListDefaultResponse
): response is WorkflowRunsListDefaultResponse;
export function isUnexpected(
  response: WorkflowRunGet200Response | WorkflowRunGetDefaultResponse
): response is WorkflowRunGetDefaultResponse;
export function isUnexpected(
  response: WorkflowRunCancel200Response | WorkflowRunCancelDefaultResponse
): response is WorkflowRunCancelDefaultResponse;
export function isUnexpected(
  response: WorkflowTasksList200Response | WorkflowTasksListDefaultResponse
): response is WorkflowTasksListDefaultResponse;
export function isUnexpected(
  response: WorkflowTaskGet200Response | WorkflowTaskGetDefaultResponse
): response is WorkflowTaskGetDefaultResponse;
export function isUnexpected(
  response: WorkflowTaskReassign200Response | WorkflowTaskReassignDefaultResponse
): response is WorkflowTaskReassignDefaultResponse;
export function isUnexpected(
  response: ApprovalApprove200Response | ApprovalApproveDefaultResponse
): response is ApprovalApproveDefaultResponse;
export function isUnexpected(
  response: ApprovalReject200Response | ApprovalRejectDefaultResponse
): response is ApprovalRejectDefaultResponse;
export function isUnexpected(
  response: TaskStatusUpdate200Response | TaskStatusUpdateDefaultResponse
): response is TaskStatusUpdateDefaultResponse;
export function isUnexpected(
  response:
    | WorkflowsList200Response
    | WorkflowsListDefaultResponse
    | WorkflowGet200Response
    | WorkflowGetDefaultResponse
    | WorkflowCreateOrReplace200Response
    | WorkflowCreateOrReplaceDefaultResponse
    | WorkflowDelete204Response
    | WorkflowDeleteDefaultResponse
    | WorkflowValidate200Response
    | WorkflowValidateDefaultResponse
    | UserRequestsSubmit200Response
    | UserRequestsSubmitDefaultResponse
    | WorkflowRunsList200Response
    | WorkflowRunsListDefaultResponse
    | WorkflowRunGet200Response
    | WorkflowRunGetDefaultResponse
    | WorkflowRunCancel200Response
    | WorkflowRunCancelDefaultResponse
    | WorkflowTasksList200Response
    | WorkflowTasksListDefaultResponse
    | WorkflowTaskGet200Response
    | WorkflowTaskGetDefaultResponse
    | WorkflowTaskReassign200Response
    | WorkflowTaskReassignDefaultResponse
    | ApprovalApprove200Response
    | ApprovalApproveDefaultResponse
    | ApprovalReject200Response
    | ApprovalRejectDefaultResponse
    | TaskStatusUpdate200Response
    | TaskStatusUpdateDefaultResponse
): response is
  | WorkflowsListDefaultResponse
  | WorkflowGetDefaultResponse
  | WorkflowCreateOrReplaceDefaultResponse
  | WorkflowDeleteDefaultResponse
  | WorkflowValidateDefaultResponse
  | UserRequestsSubmitDefaultResponse
  | WorkflowRunsListDefaultResponse
  | WorkflowRunGetDefaultResponse
  | WorkflowRunCancelDefaultResponse
  | WorkflowTasksListDefaultResponse
  | WorkflowTaskGetDefaultResponse
  | WorkflowTaskReassignDefaultResponse
  | ApprovalApproveDefaultResponse
  | ApprovalRejectDefaultResponse
  | TaskStatusUpdateDefaultResponse {
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
          pathParts[j] || ""
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
