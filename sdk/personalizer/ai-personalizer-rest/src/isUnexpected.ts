// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EvaluationsCreate201Response,
  EvaluationsCreatedefaultResponse,
  EvaluationsGet200Response,
  EvaluationsGetdefaultResponse,
  EventsActivate204Response,
  EventsActivatedefaultResponse,
  EventsReward204Response,
  EventsRewarddefaultResponse,
  LogGetProperties200Response,
  LogGetPropertiesdefaultResponse,
  LogInteractions204Response,
  LogInteractionsdefaultResponse,
  LogObservations204Response,
  LogObservationsdefaultResponse,
  ModelGet200Response,
  ModelGetdefaultResponse,
  ModelImport204Response,
  ModelImportdefaultResponse,
  ModelReset204Response,
  ModelResetdefaultResponse,
  MultiSlotEventsActivate204Response,
  MultiSlotEventsActivatedefaultResponse,
  MultiSlotEventsReward204Response,
  MultiSlotEventsRewarddefaultResponse,
  MultiSlotRank201Response,
  MultiSlotRankdefaultResponse,
  PolicyUpdate200Response,
  PolicyUpdatedefaultResponse,
  Rank201Response,
  RankdefaultResponse,
  ServiceConfigurationApplyFromEvaluation204Response,
  ServiceConfigurationApplyFromEvaluationdefaultResponse,
  ServiceConfigurationUpdate200Response,
  ServiceConfigurationUpdatedefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /configurations/service": ["200"],
  "PUT /configurations/service": ["200"],
  "POST /configurations/applyFromEvaluation": ["204"],
  "GET /configurations/policy": ["200"],
  "PUT /configurations/policy": ["200"],
  "DELETE /configurations/policy": ["200"],
  "GET /evaluations/{evaluationId}": ["200"],
  "DELETE /evaluations/{evaluationId}": ["204"],
  "GET /evaluations": ["200"],
  "POST /evaluations": ["201"],
  "POST /events/{eventId}/reward": ["204"],
  "POST /events/{eventId}/activate": ["204"],
  "POST /logs/interactions": ["204"],
  "POST /logs/observations": ["204"],
  "DELETE /logs": ["204"],
  "GET /logs/properties": ["200"],
  "GET /model": ["200"],
  "PUT /model": ["204"],
  "DELETE /model": ["204"],
  "GET /model/properties": ["200"],
  "POST /multislot/events/{eventId}/reward": ["204"],
  "POST /multislot/events/{eventId}/activate": ["204"],
  "POST /multislot/rank": ["201"],
  "POST /rank": ["201"],
};

export function isUnexpected(
  response: ServiceConfigurationUpdate200Response | ServiceConfigurationUpdatedefaultResponse,
): response is ServiceConfigurationUpdatedefaultResponse;
export function isUnexpected(
  response:
    | ServiceConfigurationApplyFromEvaluation204Response
    | ServiceConfigurationApplyFromEvaluationdefaultResponse,
): response is ServiceConfigurationApplyFromEvaluationdefaultResponse;
export function isUnexpected(
  response: PolicyUpdate200Response | PolicyUpdatedefaultResponse,
): response is PolicyUpdatedefaultResponse;
export function isUnexpected(
  response: EvaluationsGet200Response | EvaluationsGetdefaultResponse,
): response is EvaluationsGetdefaultResponse;
export function isUnexpected(
  response: EvaluationsCreate201Response | EvaluationsCreatedefaultResponse,
): response is EvaluationsCreatedefaultResponse;
export function isUnexpected(
  response: EventsReward204Response | EventsRewarddefaultResponse,
): response is EventsRewarddefaultResponse;
export function isUnexpected(
  response: EventsActivate204Response | EventsActivatedefaultResponse,
): response is EventsActivatedefaultResponse;
export function isUnexpected(
  response: LogInteractions204Response | LogInteractionsdefaultResponse,
): response is LogInteractionsdefaultResponse;
export function isUnexpected(
  response: LogObservations204Response | LogObservationsdefaultResponse,
): response is LogObservationsdefaultResponse;
export function isUnexpected(
  response: LogGetProperties200Response | LogGetPropertiesdefaultResponse,
): response is LogGetPropertiesdefaultResponse;
export function isUnexpected(
  response: ModelGet200Response | ModelGetdefaultResponse,
): response is ModelGetdefaultResponse;
export function isUnexpected(
  response: ModelImport204Response | ModelImportdefaultResponse,
): response is ModelImportdefaultResponse;
export function isUnexpected(
  response: ModelReset204Response | ModelResetdefaultResponse,
): response is ModelResetdefaultResponse;
export function isUnexpected(
  response: MultiSlotEventsReward204Response | MultiSlotEventsRewarddefaultResponse,
): response is MultiSlotEventsRewarddefaultResponse;
export function isUnexpected(
  response: MultiSlotEventsActivate204Response | MultiSlotEventsActivatedefaultResponse,
): response is MultiSlotEventsActivatedefaultResponse;
export function isUnexpected(
  response: MultiSlotRank201Response | MultiSlotRankdefaultResponse,
): response is MultiSlotRankdefaultResponse;
export function isUnexpected(
  response: Rank201Response | RankdefaultResponse,
): response is RankdefaultResponse;
export function isUnexpected(
  response:
    | ServiceConfigurationUpdate200Response
    | ServiceConfigurationUpdatedefaultResponse
    | ServiceConfigurationApplyFromEvaluation204Response
    | ServiceConfigurationApplyFromEvaluationdefaultResponse
    | PolicyUpdate200Response
    | PolicyUpdatedefaultResponse
    | EvaluationsGet200Response
    | EvaluationsGetdefaultResponse
    | EvaluationsCreate201Response
    | EvaluationsCreatedefaultResponse
    | EventsReward204Response
    | EventsRewarddefaultResponse
    | EventsActivate204Response
    | EventsActivatedefaultResponse
    | LogInteractions204Response
    | LogInteractionsdefaultResponse
    | LogObservations204Response
    | LogObservationsdefaultResponse
    | LogGetProperties200Response
    | LogGetPropertiesdefaultResponse
    | ModelGet200Response
    | ModelGetdefaultResponse
    | ModelImport204Response
    | ModelImportdefaultResponse
    | ModelReset204Response
    | ModelResetdefaultResponse
    | MultiSlotEventsReward204Response
    | MultiSlotEventsRewarddefaultResponse
    | MultiSlotEventsActivate204Response
    | MultiSlotEventsActivatedefaultResponse
    | MultiSlotRank201Response
    | MultiSlotRankdefaultResponse
    | Rank201Response
    | RankdefaultResponse,
): response is
  | ServiceConfigurationUpdatedefaultResponse
  | ServiceConfigurationApplyFromEvaluationdefaultResponse
  | PolicyUpdatedefaultResponse
  | EvaluationsGetdefaultResponse
  | EvaluationsCreatedefaultResponse
  | EventsRewarddefaultResponse
  | EventsActivatedefaultResponse
  | LogInteractionsdefaultResponse
  | LogObservationsdefaultResponse
  | LogGetPropertiesdefaultResponse
  | ModelGetdefaultResponse
  | ModelImportdefaultResponse
  | ModelResetdefaultResponse
  | MultiSlotEventsRewarddefaultResponse
  | MultiSlotEventsActivatedefaultResponse
  | MultiSlotRankdefaultResponse
  | RankdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  const urlpathname = url.pathname.replace("/personalizer/v1.1-preview.3", "");
  let pathDetails = responseMap[`${method} ${urlpathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i].startsWith("{") && candidateParts[i].endsWith("}")) {
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
