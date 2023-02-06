// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListWorkflows200Response,
  ListWorkflowsDefaultResponse,
  GetWorkflow200Response,
  GetWorkflowDefaultResponse,
  CreateOrReplaceWorkflow200Response,
  CreateOrReplaceWorkflowDefaultResponse,
  DeleteWorkflow204Response,
  DeleteWorkflowDefaultResponse,
  SubmitUserRequests200Response,
  SubmitUserRequestsDefaultResponse,
  ListWorkflowRuns200Response,
  ListWorkflowRunsDefaultResponse,
  GetWorkflowRun200Response,
  GetWorkflowRunDefaultResponse,
  CancelWorkflowRun200Response,
  CancelWorkflowRunDefaultResponse,
  ListWorkflowTasks200Response,
  ListWorkflowTasksDefaultResponse,
  GetWorkflowTask200Response,
  GetWorkflowTaskDefaultResponse,
  ApproveApprovalTask200Response,
  ApproveApprovalTaskDefaultResponse,
  RejectApprovalTask200Response,
  RejectApprovalTaskDefaultResponse,
  ReassignWorkflowTask200Response,
  ReassignWorkflowTaskDefaultResponse,
  UpdateTaskRequest200Response,
  UpdateTaskRequestDefaultResponse,
  ClaimDsarTaskRequest200Response,
  ClaimDsarTaskRequestDefaultResponse,
  ReleaseDsarTaskRequest200Response,
  ReleaseDsarTaskRequestDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /workflows": ["200"],
  "GET /workflows/{workflowId}": ["200"],
  "PUT /workflows/{workflowId}": ["200"],
  "DELETE /workflows/{workflowId}": ["204"],
  "POST /userrequests": ["200"],
  "GET /workflowruns": ["200"],
  "GET /workflowruns/{workflowRunId}": ["200"],
  "POST /workflowruns/{workflowRunId}/cancel": ["200"],
  "GET /workflowtasks": ["200"],
  "GET /workflowtasks/{taskId}": ["200"],
  "POST /workflowtasks/{taskId}/approve-approval": ["200"],
  "POST /workflowtasks/{taskId}/reject-approval": ["200"],
  "POST /workflowtasks/{taskId}/reassign": ["200"],
  "POST /workflowtasks/{taskId}/change-task-status": ["200"],
  "POST /workflowtasks/{taskId}/claim-task": ["200"],
  "POST /workflowtasks/{taskId}/release-task": ["200"]
};

export function isUnexpected(
  response: ListWorkflows200Response | ListWorkflowsDefaultResponse
): response is ListWorkflowsDefaultResponse;
export function isUnexpected(
  response: GetWorkflow200Response | GetWorkflowDefaultResponse
): response is GetWorkflowDefaultResponse;
export function isUnexpected(
  response:
    | CreateOrReplaceWorkflow200Response
    | CreateOrReplaceWorkflowDefaultResponse
): response is CreateOrReplaceWorkflowDefaultResponse;
export function isUnexpected(
  response: DeleteWorkflow204Response | DeleteWorkflowDefaultResponse
): response is DeleteWorkflowDefaultResponse;
export function isUnexpected(
  response: SubmitUserRequests200Response | SubmitUserRequestsDefaultResponse
): response is SubmitUserRequestsDefaultResponse;
export function isUnexpected(
  response: ListWorkflowRuns200Response | ListWorkflowRunsDefaultResponse
): response is ListWorkflowRunsDefaultResponse;
export function isUnexpected(
  response: GetWorkflowRun200Response | GetWorkflowRunDefaultResponse
): response is GetWorkflowRunDefaultResponse;
export function isUnexpected(
  response: CancelWorkflowRun200Response | CancelWorkflowRunDefaultResponse
): response is CancelWorkflowRunDefaultResponse;
export function isUnexpected(
  response: ListWorkflowTasks200Response | ListWorkflowTasksDefaultResponse
): response is ListWorkflowTasksDefaultResponse;
export function isUnexpected(
  response: GetWorkflowTask200Response | GetWorkflowTaskDefaultResponse
): response is GetWorkflowTaskDefaultResponse;
export function isUnexpected(
  response: ApproveApprovalTask200Response | ApproveApprovalTaskDefaultResponse
): response is ApproveApprovalTaskDefaultResponse;
export function isUnexpected(
  response: RejectApprovalTask200Response | RejectApprovalTaskDefaultResponse
): response is RejectApprovalTaskDefaultResponse;
export function isUnexpected(
  response:
    | ReassignWorkflowTask200Response
    | ReassignWorkflowTaskDefaultResponse
): response is ReassignWorkflowTaskDefaultResponse;
export function isUnexpected(
  response: UpdateTaskRequest200Response | UpdateTaskRequestDefaultResponse
): response is UpdateTaskRequestDefaultResponse;
export function isUnexpected(
  response:
    | ClaimDsarTaskRequest200Response
    | ClaimDsarTaskRequestDefaultResponse
): response is ClaimDsarTaskRequestDefaultResponse;
export function isUnexpected(
  response:
    | ReleaseDsarTaskRequest200Response
    | ReleaseDsarTaskRequestDefaultResponse
): response is ReleaseDsarTaskRequestDefaultResponse;
export function isUnexpected(
  response:
    | ListWorkflows200Response
    | ListWorkflowsDefaultResponse
    | GetWorkflow200Response
    | GetWorkflowDefaultResponse
    | CreateOrReplaceWorkflow200Response
    | CreateOrReplaceWorkflowDefaultResponse
    | DeleteWorkflow204Response
    | DeleteWorkflowDefaultResponse
    | SubmitUserRequests200Response
    | SubmitUserRequestsDefaultResponse
    | ListWorkflowRuns200Response
    | ListWorkflowRunsDefaultResponse
    | GetWorkflowRun200Response
    | GetWorkflowRunDefaultResponse
    | CancelWorkflowRun200Response
    | CancelWorkflowRunDefaultResponse
    | ListWorkflowTasks200Response
    | ListWorkflowTasksDefaultResponse
    | GetWorkflowTask200Response
    | GetWorkflowTaskDefaultResponse
    | ApproveApprovalTask200Response
    | ApproveApprovalTaskDefaultResponse
    | RejectApprovalTask200Response
    | RejectApprovalTaskDefaultResponse
    | ReassignWorkflowTask200Response
    | ReassignWorkflowTaskDefaultResponse
    | UpdateTaskRequest200Response
    | UpdateTaskRequestDefaultResponse
    | ClaimDsarTaskRequest200Response
    | ClaimDsarTaskRequestDefaultResponse
    | ReleaseDsarTaskRequest200Response
    | ReleaseDsarTaskRequestDefaultResponse
): response is
  | ListWorkflowsDefaultResponse
  | GetWorkflowDefaultResponse
  | CreateOrReplaceWorkflowDefaultResponse
  | DeleteWorkflowDefaultResponse
  | SubmitUserRequestsDefaultResponse
  | ListWorkflowRunsDefaultResponse
  | GetWorkflowRunDefaultResponse
  | CancelWorkflowRunDefaultResponse
  | ListWorkflowTasksDefaultResponse
  | GetWorkflowTaskDefaultResponse
  | ApproveApprovalTaskDefaultResponse
  | RejectApprovalTaskDefaultResponse
  | ReassignWorkflowTaskDefaultResponse
  | UpdateTaskRequestDefaultResponse
  | ClaimDsarTaskRequestDefaultResponse
  | ReleaseDsarTaskRequestDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

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

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i]?.startsWith("{") &&
          candidateParts[i]?.endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
