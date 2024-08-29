// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TextAnalysisAuthoringListProjects200Response,
  TextAnalysisAuthoringListProjectsDefaultResponse,
  TextAnalysisAuthoringCreateProject200Response,
  TextAnalysisAuthoringCreateProject201Response,
  TextAnalysisAuthoringCreateProjectDefaultResponse,
  TextAnalysisAuthoringGetProject200Response,
  TextAnalysisAuthoringGetProjectDefaultResponse,
  TextAnalysisAuthoringDeleteProject202Response,
  TextAnalysisAuthoringDeleteProjectDefaultResponse,
  TextAnalysisAuthoringExport202Response,
  TextAnalysisAuthoringExportDefaultResponse,
  TextAnalysisAuthoringImport202Response,
  TextAnalysisAuthoringImportDefaultResponse,
  TextAnalysisAuthoringTrain202Response,
  TextAnalysisAuthoringTrainDefaultResponse,
  TextAnalysisAuthoringListDeployments200Response,
  TextAnalysisAuthoringListDeploymentsDefaultResponse,
  TextAnalysisAuthoringSwapDeployments202Response,
  TextAnalysisAuthoringSwapDeploymentsDefaultResponse,
  TextAnalysisAuthoringGetDeployment200Response,
  TextAnalysisAuthoringGetDeploymentDefaultResponse,
  TextAnalysisAuthoringDeployProject202Response,
  TextAnalysisAuthoringDeployProjectDefaultResponse,
  TextAnalysisAuthoringDeleteDeployment202Response,
  TextAnalysisAuthoringDeleteDeploymentDefaultResponse,
  TextAnalysisAuthoringDeleteDeploymentFromResources202Response,
  TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse,
  TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatus200Response,
  TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse,
  TextAnalysisAuthoringGetDeploymentStatus200Response,
  TextAnalysisAuthoringGetDeploymentStatusDefaultResponse,
  TextAnalysisAuthoringGetSwapDeploymentsStatus200Response,
  TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse,
  TextAnalysisAuthoringGetExportStatus200Response,
  TextAnalysisAuthoringGetExportStatusDefaultResponse,
  TextAnalysisAuthoringGetImportStatus200Response,
  TextAnalysisAuthoringGetImportStatusDefaultResponse,
  TextAnalysisAuthoringListTrainedModels200Response,
  TextAnalysisAuthoringListTrainedModelsDefaultResponse,
  TextAnalysisAuthoringGetTrainedModel200Response,
  TextAnalysisAuthoringGetTrainedModelDefaultResponse,
  TextAnalysisAuthoringDeleteTrainedModel204Response,
  TextAnalysisAuthoringDeleteTrainedModelDefaultResponse,
  TextAnalysisAuthoringLoadSnapshot202Response,
  TextAnalysisAuthoringLoadSnapshotDefaultResponse,
  TextAnalysisAuthoringGetModelEvaluationResults200Response,
  TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse,
  TextAnalysisAuthoringGetModelEvaluationSummary200Response,
  TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse,
  TextAnalysisAuthoringGetLoadSnapshotStatus200Response,
  TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse,
  TextAnalysisAuthoringListDeploymentResources200Response,
  TextAnalysisAuthoringListDeploymentResourcesDefaultResponse,
  TextAnalysisAuthoringAssignDeploymentResources202Response,
  TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse,
  TextAnalysisAuthoringUnassignDeploymentResources202Response,
  TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse,
  TextAnalysisAuthoringGetAssignDeploymentResourcesStatus200Response,
  TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse,
  TextAnalysisAuthoringGetUnassignDeploymentResourcesStatus200Response,
  TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse,
  TextAnalysisAuthoringListTrainingJobs200Response,
  TextAnalysisAuthoringListTrainingJobsDefaultResponse,
  TextAnalysisAuthoringGetTrainingStatus200Response,
  TextAnalysisAuthoringGetTrainingStatusDefaultResponse,
  TextAnalysisAuthoringCancelTrainingJob202Response,
  TextAnalysisAuthoringCancelTrainingJobDefaultResponse,
  TextAnalysisAuthoringGetProjectDeletionStatus200Response,
  TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse,
  TextAnalysisAuthoringListAssignedResourceDeployments200Response,
  TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse,
  TextAnalysisAuthoringGetSupportedLanguages200Response,
  TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse,
  TextAnalysisAuthoringListTrainingConfigVersions200Response,
  TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /authoring/analyze-text/projects": ["200"],
  "PATCH /authoring/analyze-text/projects/{projectName}": ["200", "201"],
  "GET /authoring/analyze-text/projects/{projectName}": ["200"],
  "DELETE /authoring/analyze-text/projects/{projectName}": ["202"],
  "POST /authoring/analyze-text/projects/{projectName}/:export": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/:export": ["202"],
  "POST /authoring/analyze-text/projects/{projectName}/:import": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/:import": ["202"],
  "POST /authoring/analyze-text/projects/{projectName}/:train": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/:train": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/deployments": ["200"],
  "POST /authoring/analyze-text/projects/{projectName}/deployments/:swap": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/deployments/:swap": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}": ["200"],
  "PUT /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}": ["202"],
  "DELETE /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}": ["202"],
  "POST /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/:delete-from-resources":
    ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/:delete-from-resources":
    ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/delete-from-resources/jobs/{jobId}":
    ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/jobs/{jobId}": [
    "200",
  ],
  "GET /authoring/analyze-text/projects/{projectName}/deployments/swap/jobs/{jobId}": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/export/jobs/{jobId}": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/import/jobs/{jobId}": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/models": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}": ["200"],
  "DELETE /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}": ["204"],
  "POST /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/:load-snapshot": [
    "202",
  ],
  "GET /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/:load-snapshot": [
    "202",
  ],
  "GET /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/evaluation/result":
    ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/evaluation/summary-result":
    ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/load-snapshot/jobs/{jobId}":
    ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/resources": ["200"],
  "POST /authoring/analyze-text/projects/{projectName}/resources/:assign": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/resources/:assign": ["202"],
  "POST /authoring/analyze-text/projects/{projectName}/resources/:unassign": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/resources/:unassign": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/resources/assign/jobs/{jobId}": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/resources/unassign/jobs/{jobId}": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/train/jobs": ["200"],
  "GET /authoring/analyze-text/projects/{projectName}/train/jobs/{jobId}": ["200"],
  "POST /authoring/analyze-text/projects/{projectName}/train/jobs/{jobId}/:cancel": ["202"],
  "GET /authoring/analyze-text/projects/{projectName}/train/jobs/{jobId}/:cancel": ["202"],
  "GET /authoring/analyze-text/projects/global/deletion-jobs/{jobId}": ["200"],
  "GET /authoring/analyze-text/projects/global/deployments/resources": ["200"],
  "GET /authoring/analyze-text/projects/global/languages": ["200"],
  "GET /authoring/analyze-text/projects/global/training-config-versions": ["200"],
};

export function isUnexpected(
  response:
    | TextAnalysisAuthoringListProjects200Response
    | TextAnalysisAuthoringListProjectsDefaultResponse,
): response is TextAnalysisAuthoringListProjectsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringCreateProject200Response
    | TextAnalysisAuthoringCreateProject201Response
    | TextAnalysisAuthoringCreateProjectDefaultResponse,
): response is TextAnalysisAuthoringCreateProjectDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetProject200Response
    | TextAnalysisAuthoringGetProjectDefaultResponse,
): response is TextAnalysisAuthoringGetProjectDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringDeleteProject202Response
    | TextAnalysisAuthoringDeleteProjectDefaultResponse,
): response is TextAnalysisAuthoringDeleteProjectDefaultResponse;
export function isUnexpected(
  response: TextAnalysisAuthoringExport202Response | TextAnalysisAuthoringExportDefaultResponse,
): response is TextAnalysisAuthoringExportDefaultResponse;
export function isUnexpected(
  response: TextAnalysisAuthoringImport202Response | TextAnalysisAuthoringImportDefaultResponse,
): response is TextAnalysisAuthoringImportDefaultResponse;
export function isUnexpected(
  response: TextAnalysisAuthoringTrain202Response | TextAnalysisAuthoringTrainDefaultResponse,
): response is TextAnalysisAuthoringTrainDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListDeployments200Response
    | TextAnalysisAuthoringListDeploymentsDefaultResponse,
): response is TextAnalysisAuthoringListDeploymentsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringSwapDeployments202Response
    | TextAnalysisAuthoringSwapDeploymentsDefaultResponse,
): response is TextAnalysisAuthoringSwapDeploymentsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetDeployment200Response
    | TextAnalysisAuthoringGetDeploymentDefaultResponse,
): response is TextAnalysisAuthoringGetDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringDeployProject202Response
    | TextAnalysisAuthoringDeployProjectDefaultResponse,
): response is TextAnalysisAuthoringDeployProjectDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringDeleteDeployment202Response
    | TextAnalysisAuthoringDeleteDeploymentDefaultResponse,
): response is TextAnalysisAuthoringDeleteDeploymentDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringDeleteDeploymentFromResources202Response
    | TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse,
): response is TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatus200Response
    | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse,
): response is TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetDeploymentStatus200Response
    | TextAnalysisAuthoringGetDeploymentStatusDefaultResponse,
): response is TextAnalysisAuthoringGetDeploymentStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetSwapDeploymentsStatus200Response
    | TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse,
): response is TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetExportStatus200Response
    | TextAnalysisAuthoringGetExportStatusDefaultResponse,
): response is TextAnalysisAuthoringGetExportStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetImportStatus200Response
    | TextAnalysisAuthoringGetImportStatusDefaultResponse,
): response is TextAnalysisAuthoringGetImportStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListTrainedModels200Response
    | TextAnalysisAuthoringListTrainedModelsDefaultResponse,
): response is TextAnalysisAuthoringListTrainedModelsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetTrainedModel200Response
    | TextAnalysisAuthoringGetTrainedModelDefaultResponse,
): response is TextAnalysisAuthoringGetTrainedModelDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringDeleteTrainedModel204Response
    | TextAnalysisAuthoringDeleteTrainedModelDefaultResponse,
): response is TextAnalysisAuthoringDeleteTrainedModelDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringLoadSnapshot202Response
    | TextAnalysisAuthoringLoadSnapshotDefaultResponse,
): response is TextAnalysisAuthoringLoadSnapshotDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetModelEvaluationResults200Response
    | TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse,
): response is TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetModelEvaluationSummary200Response
    | TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse,
): response is TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetLoadSnapshotStatus200Response
    | TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse,
): response is TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListDeploymentResources200Response
    | TextAnalysisAuthoringListDeploymentResourcesDefaultResponse,
): response is TextAnalysisAuthoringListDeploymentResourcesDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringAssignDeploymentResources202Response
    | TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse,
): response is TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringUnassignDeploymentResources202Response
    | TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse,
): response is TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetAssignDeploymentResourcesStatus200Response
    | TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse,
): response is TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatus200Response
    | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse,
): response is TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListTrainingJobs200Response
    | TextAnalysisAuthoringListTrainingJobsDefaultResponse,
): response is TextAnalysisAuthoringListTrainingJobsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetTrainingStatus200Response
    | TextAnalysisAuthoringGetTrainingStatusDefaultResponse,
): response is TextAnalysisAuthoringGetTrainingStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringCancelTrainingJob202Response
    | TextAnalysisAuthoringCancelTrainingJobDefaultResponse,
): response is TextAnalysisAuthoringCancelTrainingJobDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetProjectDeletionStatus200Response
    | TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse,
): response is TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListAssignedResourceDeployments200Response
    | TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse,
): response is TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringGetSupportedLanguages200Response
    | TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse,
): response is TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListTrainingConfigVersions200Response
    | TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse,
): response is TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse;
export function isUnexpected(
  response:
    | TextAnalysisAuthoringListProjects200Response
    | TextAnalysisAuthoringListProjectsDefaultResponse
    | TextAnalysisAuthoringCreateProject200Response
    | TextAnalysisAuthoringCreateProject201Response
    | TextAnalysisAuthoringCreateProjectDefaultResponse
    | TextAnalysisAuthoringGetProject200Response
    | TextAnalysisAuthoringGetProjectDefaultResponse
    | TextAnalysisAuthoringDeleteProject202Response
    | TextAnalysisAuthoringDeleteProjectDefaultResponse
    | TextAnalysisAuthoringExport202Response
    | TextAnalysisAuthoringExportDefaultResponse
    | TextAnalysisAuthoringImport202Response
    | TextAnalysisAuthoringImportDefaultResponse
    | TextAnalysisAuthoringTrain202Response
    | TextAnalysisAuthoringTrainDefaultResponse
    | TextAnalysisAuthoringListDeployments200Response
    | TextAnalysisAuthoringListDeploymentsDefaultResponse
    | TextAnalysisAuthoringSwapDeployments202Response
    | TextAnalysisAuthoringSwapDeploymentsDefaultResponse
    | TextAnalysisAuthoringGetDeployment200Response
    | TextAnalysisAuthoringGetDeploymentDefaultResponse
    | TextAnalysisAuthoringDeployProject202Response
    | TextAnalysisAuthoringDeployProjectDefaultResponse
    | TextAnalysisAuthoringDeleteDeployment202Response
    | TextAnalysisAuthoringDeleteDeploymentDefaultResponse
    | TextAnalysisAuthoringDeleteDeploymentFromResources202Response
    | TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse
    | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatus200Response
    | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse
    | TextAnalysisAuthoringGetDeploymentStatus200Response
    | TextAnalysisAuthoringGetDeploymentStatusDefaultResponse
    | TextAnalysisAuthoringGetSwapDeploymentsStatus200Response
    | TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse
    | TextAnalysisAuthoringGetExportStatus200Response
    | TextAnalysisAuthoringGetExportStatusDefaultResponse
    | TextAnalysisAuthoringGetImportStatus200Response
    | TextAnalysisAuthoringGetImportStatusDefaultResponse
    | TextAnalysisAuthoringListTrainedModels200Response
    | TextAnalysisAuthoringListTrainedModelsDefaultResponse
    | TextAnalysisAuthoringGetTrainedModel200Response
    | TextAnalysisAuthoringGetTrainedModelDefaultResponse
    | TextAnalysisAuthoringDeleteTrainedModel204Response
    | TextAnalysisAuthoringDeleteTrainedModelDefaultResponse
    | TextAnalysisAuthoringLoadSnapshot202Response
    | TextAnalysisAuthoringLoadSnapshotDefaultResponse
    | TextAnalysisAuthoringGetModelEvaluationResults200Response
    | TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse
    | TextAnalysisAuthoringGetModelEvaluationSummary200Response
    | TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse
    | TextAnalysisAuthoringGetLoadSnapshotStatus200Response
    | TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse
    | TextAnalysisAuthoringListDeploymentResources200Response
    | TextAnalysisAuthoringListDeploymentResourcesDefaultResponse
    | TextAnalysisAuthoringAssignDeploymentResources202Response
    | TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse
    | TextAnalysisAuthoringUnassignDeploymentResources202Response
    | TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse
    | TextAnalysisAuthoringGetAssignDeploymentResourcesStatus200Response
    | TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse
    | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatus200Response
    | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse
    | TextAnalysisAuthoringListTrainingJobs200Response
    | TextAnalysisAuthoringListTrainingJobsDefaultResponse
    | TextAnalysisAuthoringGetTrainingStatus200Response
    | TextAnalysisAuthoringGetTrainingStatusDefaultResponse
    | TextAnalysisAuthoringCancelTrainingJob202Response
    | TextAnalysisAuthoringCancelTrainingJobDefaultResponse
    | TextAnalysisAuthoringGetProjectDeletionStatus200Response
    | TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse
    | TextAnalysisAuthoringListAssignedResourceDeployments200Response
    | TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse
    | TextAnalysisAuthoringGetSupportedLanguages200Response
    | TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse
    | TextAnalysisAuthoringListTrainingConfigVersions200Response
    | TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse,
): response is
  | TextAnalysisAuthoringListProjectsDefaultResponse
  | TextAnalysisAuthoringCreateProjectDefaultResponse
  | TextAnalysisAuthoringGetProjectDefaultResponse
  | TextAnalysisAuthoringDeleteProjectDefaultResponse
  | TextAnalysisAuthoringExportDefaultResponse
  | TextAnalysisAuthoringImportDefaultResponse
  | TextAnalysisAuthoringTrainDefaultResponse
  | TextAnalysisAuthoringListDeploymentsDefaultResponse
  | TextAnalysisAuthoringSwapDeploymentsDefaultResponse
  | TextAnalysisAuthoringGetDeploymentDefaultResponse
  | TextAnalysisAuthoringDeployProjectDefaultResponse
  | TextAnalysisAuthoringDeleteDeploymentDefaultResponse
  | TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse
  | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse
  | TextAnalysisAuthoringGetDeploymentStatusDefaultResponse
  | TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse
  | TextAnalysisAuthoringGetExportStatusDefaultResponse
  | TextAnalysisAuthoringGetImportStatusDefaultResponse
  | TextAnalysisAuthoringListTrainedModelsDefaultResponse
  | TextAnalysisAuthoringGetTrainedModelDefaultResponse
  | TextAnalysisAuthoringDeleteTrainedModelDefaultResponse
  | TextAnalysisAuthoringLoadSnapshotDefaultResponse
  | TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse
  | TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse
  | TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse
  | TextAnalysisAuthoringListDeploymentResourcesDefaultResponse
  | TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse
  | TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse
  | TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse
  | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse
  | TextAnalysisAuthoringListTrainingJobsDefaultResponse
  | TextAnalysisAuthoringGetTrainingStatusDefaultResponse
  | TextAnalysisAuthoringCancelTrainingJobDefaultResponse
  | TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse
  | TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse
  | TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse
  | TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse {
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
    if (candidateParts.length === pathParts.length && hasParametrizedPath(key)) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.endsWith("}")) {
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
