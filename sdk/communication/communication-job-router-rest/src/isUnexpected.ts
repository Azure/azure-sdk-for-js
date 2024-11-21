// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  UpsertClassificationPolicy200Response,
  UpsertClassificationPolicy201Response,
  UpsertClassificationPolicyDefaultResponse,
  GetClassificationPolicy200Response,
  GetClassificationPolicyDefaultResponse,
  DeleteClassificationPolicy204Response,
  DeleteClassificationPolicyDefaultResponse,
  ListClassificationPolicies200Response,
  ListClassificationPoliciesDefaultResponse,
  UpsertDistributionPolicy200Response,
  UpsertDistributionPolicy201Response,
  UpsertDistributionPolicyDefaultResponse,
  GetDistributionPolicy200Response,
  GetDistributionPolicyDefaultResponse,
  DeleteDistributionPolicy204Response,
  DeleteDistributionPolicyDefaultResponse,
  ListDistributionPolicies200Response,
  ListDistributionPoliciesDefaultResponse,
  UpsertExceptionPolicy200Response,
  UpsertExceptionPolicy201Response,
  UpsertExceptionPolicyDefaultResponse,
  GetExceptionPolicy200Response,
  GetExceptionPolicyDefaultResponse,
  DeleteExceptionPolicy204Response,
  DeleteExceptionPolicyDefaultResponse,
  ListExceptionPolicies200Response,
  ListExceptionPoliciesDefaultResponse,
  UpsertQueue200Response,
  UpsertQueue201Response,
  UpsertQueueDefaultResponse,
  GetQueue200Response,
  GetQueueDefaultResponse,
  DeleteQueue204Response,
  DeleteQueueDefaultResponse,
  ListQueues200Response,
  ListQueuesDefaultResponse,
  UpsertJob200Response,
  UpsertJob201Response,
  UpsertJobDefaultResponse,
  GetJob200Response,
  GetJobDefaultResponse,
  DeleteJob204Response,
  DeleteJobDefaultResponse,
  Reclassify200Response,
  ReclassifyDefaultResponse,
  Cancel200Response,
  CancelDefaultResponse,
  Complete200Response,
  CompleteDefaultResponse,
  Close200Response,
  CloseDefaultResponse,
  ListJobs200Response,
  ListJobsDefaultResponse,
  GetInQueuePosition200Response,
  GetInQueuePositionDefaultResponse,
  Unassign200Response,
  UnassignDefaultResponse,
  Accept200Response,
  AcceptDefaultResponse,
  Decline200Response,
  DeclineDefaultResponse,
  GetQueueStatistics200Response,
  GetQueueStatisticsDefaultResponse,
  UpsertWorker200Response,
  UpsertWorker201Response,
  UpsertWorkerDefaultResponse,
  GetWorker200Response,
  GetWorkerDefaultResponse,
  DeleteWorker204Response,
  DeleteWorkerDefaultResponse,
  ListWorkers200Response,
  ListWorkersDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "PATCH /routing/classificationPolicies/{classificationPolicyId}": ["200", "201"],
  "GET /routing/classificationPolicies/{classificationPolicyId}": ["200"],
  "DELETE /routing/classificationPolicies/{classificationPolicyId}": ["204"],
  "GET /routing/classificationPolicies": ["200"],
  "PATCH /routing/distributionPolicies/{distributionPolicyId}": ["200", "201"],
  "GET /routing/distributionPolicies/{distributionPolicyId}": ["200"],
  "DELETE /routing/distributionPolicies/{distributionPolicyId}": ["204"],
  "GET /routing/distributionPolicies": ["200"],
  "PATCH /routing/exceptionPolicies/{exceptionPolicyId}": ["200", "201"],
  "GET /routing/exceptionPolicies/{exceptionPolicyId}": ["200"],
  "DELETE /routing/exceptionPolicies/{exceptionPolicyId}": ["204"],
  "GET /routing/exceptionPolicies": ["200"],
  "PATCH /routing/queues/{queueId}": ["200", "201"],
  "GET /routing/queues/{queueId}": ["200"],
  "DELETE /routing/queues/{queueId}": ["204"],
  "GET /routing/queues": ["200"],
  "PATCH /routing/jobs/{jobId}": ["200", "201"],
  "GET /routing/jobs/{jobId}": ["200"],
  "DELETE /routing/jobs/{jobId}": ["204"],
  "POST /routing/jobs/{jobId}:reclassify": ["200"],
  "POST /routing/jobs/{jobId}:cancel": ["200"],
  "POST /routing/jobs/{jobId}/assignments/{assignmentId}:complete": ["200"],
  "POST /routing/jobs/{jobId}/assignments/{assignmentId}:close": ["200"],
  "GET /routing/jobs": ["200"],
  "GET /routing/jobs/{jobId}/position": ["200"],
  "POST /routing/jobs/{jobId}/assignments/{assignmentId}:unassign": ["200"],
  "POST /routing/workers/{workerId}/offers/{offerId}:accept": ["200"],
  "POST /routing/workers/{workerId}/offers/{offerId}:decline": ["200"],
  "GET /routing/queues/{queueId}/statistics": ["200"],
  "PATCH /routing/workers/{workerId}": ["200", "201"],
  "GET /routing/workers/{workerId}": ["200"],
  "DELETE /routing/workers/{workerId}": ["204"],
  "GET /routing/workers": ["200"],
};

export function isUnexpected(
  response:
    | UpsertClassificationPolicy200Response
    | UpsertClassificationPolicy201Response
    | UpsertClassificationPolicyDefaultResponse,
): response is UpsertClassificationPolicyDefaultResponse;
export function isUnexpected(
  response: GetClassificationPolicy200Response | GetClassificationPolicyDefaultResponse,
): response is GetClassificationPolicyDefaultResponse;
export function isUnexpected(
  response: DeleteClassificationPolicy204Response | DeleteClassificationPolicyDefaultResponse,
): response is DeleteClassificationPolicyDefaultResponse;
export function isUnexpected(
  response: ListClassificationPolicies200Response | ListClassificationPoliciesDefaultResponse,
): response is ListClassificationPoliciesDefaultResponse;
export function isUnexpected(
  response:
    | UpsertDistributionPolicy200Response
    | UpsertDistributionPolicy201Response
    | UpsertDistributionPolicyDefaultResponse,
): response is UpsertDistributionPolicyDefaultResponse;
export function isUnexpected(
  response: GetDistributionPolicy200Response | GetDistributionPolicyDefaultResponse,
): response is GetDistributionPolicyDefaultResponse;
export function isUnexpected(
  response: DeleteDistributionPolicy204Response | DeleteDistributionPolicyDefaultResponse,
): response is DeleteDistributionPolicyDefaultResponse;
export function isUnexpected(
  response: ListDistributionPolicies200Response | ListDistributionPoliciesDefaultResponse,
): response is ListDistributionPoliciesDefaultResponse;
export function isUnexpected(
  response:
    | UpsertExceptionPolicy200Response
    | UpsertExceptionPolicy201Response
    | UpsertExceptionPolicyDefaultResponse,
): response is UpsertExceptionPolicyDefaultResponse;
export function isUnexpected(
  response: GetExceptionPolicy200Response | GetExceptionPolicyDefaultResponse,
): response is GetExceptionPolicyDefaultResponse;
export function isUnexpected(
  response: DeleteExceptionPolicy204Response | DeleteExceptionPolicyDefaultResponse,
): response is DeleteExceptionPolicyDefaultResponse;
export function isUnexpected(
  response: ListExceptionPolicies200Response | ListExceptionPoliciesDefaultResponse,
): response is ListExceptionPoliciesDefaultResponse;
export function isUnexpected(
  response: UpsertQueue200Response | UpsertQueue201Response | UpsertQueueDefaultResponse,
): response is UpsertQueueDefaultResponse;
export function isUnexpected(
  response: GetQueue200Response | GetQueueDefaultResponse,
): response is GetQueueDefaultResponse;
export function isUnexpected(
  response: DeleteQueue204Response | DeleteQueueDefaultResponse,
): response is DeleteQueueDefaultResponse;
export function isUnexpected(
  response: ListQueues200Response | ListQueuesDefaultResponse,
): response is ListQueuesDefaultResponse;
export function isUnexpected(
  response: UpsertJob200Response | UpsertJob201Response | UpsertJobDefaultResponse,
): response is UpsertJobDefaultResponse;
export function isUnexpected(
  response: GetJob200Response | GetJobDefaultResponse,
): response is GetJobDefaultResponse;
export function isUnexpected(
  response: DeleteJob204Response | DeleteJobDefaultResponse,
): response is DeleteJobDefaultResponse;
export function isUnexpected(
  response: Reclassify200Response | ReclassifyDefaultResponse,
): response is ReclassifyDefaultResponse;
export function isUnexpected(
  response: Cancel200Response | CancelDefaultResponse,
): response is CancelDefaultResponse;
export function isUnexpected(
  response: Complete200Response | CompleteDefaultResponse,
): response is CompleteDefaultResponse;
export function isUnexpected(
  response: Close200Response | CloseDefaultResponse,
): response is CloseDefaultResponse;
export function isUnexpected(
  response: ListJobs200Response | ListJobsDefaultResponse,
): response is ListJobsDefaultResponse;
export function isUnexpected(
  response: GetInQueuePosition200Response | GetInQueuePositionDefaultResponse,
): response is GetInQueuePositionDefaultResponse;
export function isUnexpected(
  response: Unassign200Response | UnassignDefaultResponse,
): response is UnassignDefaultResponse;
export function isUnexpected(
  response: Accept200Response | AcceptDefaultResponse,
): response is AcceptDefaultResponse;
export function isUnexpected(
  response: Decline200Response | DeclineDefaultResponse,
): response is DeclineDefaultResponse;
export function isUnexpected(
  response: GetQueueStatistics200Response | GetQueueStatisticsDefaultResponse,
): response is GetQueueStatisticsDefaultResponse;
export function isUnexpected(
  response: UpsertWorker200Response | UpsertWorker201Response | UpsertWorkerDefaultResponse,
): response is UpsertWorkerDefaultResponse;
export function isUnexpected(
  response: GetWorker200Response | GetWorkerDefaultResponse,
): response is GetWorkerDefaultResponse;
export function isUnexpected(
  response: DeleteWorker204Response | DeleteWorkerDefaultResponse,
): response is DeleteWorkerDefaultResponse;
export function isUnexpected(
  response: ListWorkers200Response | ListWorkersDefaultResponse,
): response is ListWorkersDefaultResponse;
export function isUnexpected(
  response:
    | UpsertClassificationPolicy200Response
    | UpsertClassificationPolicy201Response
    | UpsertClassificationPolicyDefaultResponse
    | GetClassificationPolicy200Response
    | GetClassificationPolicyDefaultResponse
    | DeleteClassificationPolicy204Response
    | DeleteClassificationPolicyDefaultResponse
    | ListClassificationPolicies200Response
    | ListClassificationPoliciesDefaultResponse
    | UpsertDistributionPolicy200Response
    | UpsertDistributionPolicy201Response
    | UpsertDistributionPolicyDefaultResponse
    | GetDistributionPolicy200Response
    | GetDistributionPolicyDefaultResponse
    | DeleteDistributionPolicy204Response
    | DeleteDistributionPolicyDefaultResponse
    | ListDistributionPolicies200Response
    | ListDistributionPoliciesDefaultResponse
    | UpsertExceptionPolicy200Response
    | UpsertExceptionPolicy201Response
    | UpsertExceptionPolicyDefaultResponse
    | GetExceptionPolicy200Response
    | GetExceptionPolicyDefaultResponse
    | DeleteExceptionPolicy204Response
    | DeleteExceptionPolicyDefaultResponse
    | ListExceptionPolicies200Response
    | ListExceptionPoliciesDefaultResponse
    | UpsertQueue200Response
    | UpsertQueue201Response
    | UpsertQueueDefaultResponse
    | GetQueue200Response
    | GetQueueDefaultResponse
    | DeleteQueue204Response
    | DeleteQueueDefaultResponse
    | ListQueues200Response
    | ListQueuesDefaultResponse
    | UpsertJob200Response
    | UpsertJob201Response
    | UpsertJobDefaultResponse
    | GetJob200Response
    | GetJobDefaultResponse
    | DeleteJob204Response
    | DeleteJobDefaultResponse
    | Reclassify200Response
    | ReclassifyDefaultResponse
    | Cancel200Response
    | CancelDefaultResponse
    | Complete200Response
    | CompleteDefaultResponse
    | Close200Response
    | CloseDefaultResponse
    | ListJobs200Response
    | ListJobsDefaultResponse
    | GetInQueuePosition200Response
    | GetInQueuePositionDefaultResponse
    | Unassign200Response
    | UnassignDefaultResponse
    | Accept200Response
    | AcceptDefaultResponse
    | Decline200Response
    | DeclineDefaultResponse
    | GetQueueStatistics200Response
    | GetQueueStatisticsDefaultResponse
    | UpsertWorker200Response
    | UpsertWorker201Response
    | UpsertWorkerDefaultResponse
    | GetWorker200Response
    | GetWorkerDefaultResponse
    | DeleteWorker204Response
    | DeleteWorkerDefaultResponse
    | ListWorkers200Response
    | ListWorkersDefaultResponse,
): response is
  | UpsertClassificationPolicyDefaultResponse
  | GetClassificationPolicyDefaultResponse
  | DeleteClassificationPolicyDefaultResponse
  | ListClassificationPoliciesDefaultResponse
  | UpsertDistributionPolicyDefaultResponse
  | GetDistributionPolicyDefaultResponse
  | DeleteDistributionPolicyDefaultResponse
  | ListDistributionPoliciesDefaultResponse
  | UpsertExceptionPolicyDefaultResponse
  | GetExceptionPolicyDefaultResponse
  | DeleteExceptionPolicyDefaultResponse
  | ListExceptionPoliciesDefaultResponse
  | UpsertQueueDefaultResponse
  | GetQueueDefaultResponse
  | DeleteQueueDefaultResponse
  | ListQueuesDefaultResponse
  | UpsertJobDefaultResponse
  | GetJobDefaultResponse
  | DeleteJobDefaultResponse
  | ReclassifyDefaultResponse
  | CancelDefaultResponse
  | CompleteDefaultResponse
  | CloseDefaultResponse
  | ListJobsDefaultResponse
  | GetInQueuePositionDefaultResponse
  | UnassignDefaultResponse
  | AcceptDefaultResponse
  | DeclineDefaultResponse
  | GetQueueStatisticsDefaultResponse
  | UpsertWorkerDefaultResponse
  | GetWorkerDefaultResponse
  | DeleteWorkerDefaultResponse
  | ListWorkersDefaultResponse {
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
