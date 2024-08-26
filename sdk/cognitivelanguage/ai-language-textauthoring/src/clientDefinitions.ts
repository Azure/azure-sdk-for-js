// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  TextAnalysisAuthoringListProjectsParameters,
  TextAnalysisAuthoringCreateProjectParameters,
  TextAnalysisAuthoringGetProjectParameters,
  TextAnalysisAuthoringDeleteProjectParameters,
  TextAnalysisAuthoringExportParameters,
  TextAnalysisAuthoringImportParameters,
  TextAnalysisAuthoringTrainParameters,
  TextAnalysisAuthoringListDeploymentsParameters,
  TextAnalysisAuthoringSwapDeploymentsParameters,
  TextAnalysisAuthoringGetDeploymentParameters,
  TextAnalysisAuthoringDeployProjectParameters,
  TextAnalysisAuthoringDeleteDeploymentParameters,
  TextAnalysisAuthoringDeleteDeploymentFromResourcesParameters,
  TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusParameters,
  TextAnalysisAuthoringGetDeploymentStatusParameters,
  TextAnalysisAuthoringGetSwapDeploymentsStatusParameters,
  TextAnalysisAuthoringGetExportStatusParameters,
  TextAnalysisAuthoringGetImportStatusParameters,
  TextAnalysisAuthoringListTrainedModelsParameters,
  TextAnalysisAuthoringGetTrainedModelParameters,
  TextAnalysisAuthoringDeleteTrainedModelParameters,
  TextAnalysisAuthoringLoadSnapshotParameters,
  TextAnalysisAuthoringGetModelEvaluationResultsParameters,
  TextAnalysisAuthoringGetModelEvaluationSummaryParameters,
  TextAnalysisAuthoringGetLoadSnapshotStatusParameters,
  TextAnalysisAuthoringListDeploymentResourcesParameters,
  TextAnalysisAuthoringAssignDeploymentResourcesParameters,
  TextAnalysisAuthoringUnassignDeploymentResourcesParameters,
  TextAnalysisAuthoringGetAssignDeploymentResourcesStatusParameters,
  TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusParameters,
  TextAnalysisAuthoringListTrainingJobsParameters,
  TextAnalysisAuthoringGetTrainingStatusParameters,
  TextAnalysisAuthoringCancelTrainingJobParameters,
  TextAnalysisAuthoringGetProjectDeletionStatusParameters,
  TextAnalysisAuthoringListAssignedResourceDeploymentsParameters,
  TextAnalysisAuthoringGetSupportedLanguagesParameters,
  TextAnalysisAuthoringListTrainingConfigVersionsParameters,
} from "./parameters";
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
import { Client, StreamableMethod } from "@azure-rest/core-client";

export interface ListProjects {
  /** Lists the existing projects. */
  get(
    options?: TextAnalysisAuthoringListProjectsParameters,
  ): StreamableMethod<
    TextAnalysisAuthoringListProjects200Response | TextAnalysisAuthoringListProjectsDefaultResponse
  >;
}

export interface CreateProject {
  /** Creates a new project or updates an existing one. */
  patch(
    options: TextAnalysisAuthoringCreateProjectParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringCreateProject200Response
    | TextAnalysisAuthoringCreateProject201Response
    | TextAnalysisAuthoringCreateProjectDefaultResponse
  >;
  /** Gets the details of a project. */
  get(
    options?: TextAnalysisAuthoringGetProjectParameters,
  ): StreamableMethod<
    TextAnalysisAuthoringGetProject200Response | TextAnalysisAuthoringGetProjectDefaultResponse
  >;
  /** Deletes a project. */
  delete(
    options?: TextAnalysisAuthoringDeleteProjectParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringDeleteProject202Response
    | TextAnalysisAuthoringDeleteProjectDefaultResponse
  >;
}

export interface Export {
  /** Triggers a job to export a project's data. */
  post(
    options: TextAnalysisAuthoringExportParameters,
  ): StreamableMethod<
    TextAnalysisAuthoringExport202Response | TextAnalysisAuthoringExportDefaultResponse
  >;
}

export interface Import {
  /** Triggers a job to import a project. If a project with the same name already exists, the data of that project is replaced. */
  post(
    options: TextAnalysisAuthoringImportParameters,
  ): StreamableMethod<
    TextAnalysisAuthoringImport202Response | TextAnalysisAuthoringImportDefaultResponse
  >;
}

export interface Train {
  /** Triggers a training job for a project. */
  post(
    options: TextAnalysisAuthoringTrainParameters,
  ): StreamableMethod<
    TextAnalysisAuthoringTrain202Response | TextAnalysisAuthoringTrainDefaultResponse
  >;
}

export interface ListDeployments {
  /** Lists the deployments belonging to a project. */
  get(
    options?: TextAnalysisAuthoringListDeploymentsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringListDeployments200Response
    | TextAnalysisAuthoringListDeploymentsDefaultResponse
  >;
}

export interface SwapDeployments {
  /** Swaps two existing deployments with each other. */
  post(
    options: TextAnalysisAuthoringSwapDeploymentsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringSwapDeployments202Response
    | TextAnalysisAuthoringSwapDeploymentsDefaultResponse
  >;
}

export interface GetDeployment {
  /** Gets the details of a deployment. */
  get(
    options?: TextAnalysisAuthoringGetDeploymentParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetDeployment200Response
    | TextAnalysisAuthoringGetDeploymentDefaultResponse
  >;
  /** Creates a new deployment or replaces an existing one. */
  put(
    options: TextAnalysisAuthoringDeployProjectParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringDeployProject202Response
    | TextAnalysisAuthoringDeployProjectDefaultResponse
  >;
  /** Deletes a project deployment. */
  delete(
    options?: TextAnalysisAuthoringDeleteDeploymentParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringDeleteDeployment202Response
    | TextAnalysisAuthoringDeleteDeploymentDefaultResponse
  >;
}

export interface DeleteDeploymentFromResources {
  /** Deletes a project deployment from the specified assigned resources. */
  post(
    options: TextAnalysisAuthoringDeleteDeploymentFromResourcesParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringDeleteDeploymentFromResources202Response
    | TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse
  >;
}

export interface GetDeploymentDeleteFromResourcesStatus {
  /** Gets the status of an existing delete deployment from specific resources job. */
  get(
    options?: TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatus200Response
    | TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse
  >;
}

export interface GetDeploymentStatus {
  /** Gets the status of an existing deployment job. */
  get(
    options?: TextAnalysisAuthoringGetDeploymentStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetDeploymentStatus200Response
    | TextAnalysisAuthoringGetDeploymentStatusDefaultResponse
  >;
}

export interface GetSwapDeploymentsStatus {
  /** Gets the status of an existing swap deployment job. */
  get(
    options?: TextAnalysisAuthoringGetSwapDeploymentsStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetSwapDeploymentsStatus200Response
    | TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse
  >;
}

export interface GetExportStatus {
  /** Gets the status of an export job. Once job completes, returns the project metadata, and assets. */
  get(
    options?: TextAnalysisAuthoringGetExportStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetExportStatus200Response
    | TextAnalysisAuthoringGetExportStatusDefaultResponse
  >;
}

export interface GetImportStatus {
  /** Gets the status for an import. */
  get(
    options?: TextAnalysisAuthoringGetImportStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetImportStatus200Response
    | TextAnalysisAuthoringGetImportStatusDefaultResponse
  >;
}

export interface ListTrainedModels {
  /** Lists the trained models belonging to a project. */
  get(
    options?: TextAnalysisAuthoringListTrainedModelsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringListTrainedModels200Response
    | TextAnalysisAuthoringListTrainedModelsDefaultResponse
  >;
}

export interface GetTrainedModel {
  /** Gets the details of a trained model. */
  get(
    options?: TextAnalysisAuthoringGetTrainedModelParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetTrainedModel200Response
    | TextAnalysisAuthoringGetTrainedModelDefaultResponse
  >;
  /** Deletes an existing trained model. */
  delete(
    options?: TextAnalysisAuthoringDeleteTrainedModelParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringDeleteTrainedModel204Response
    | TextAnalysisAuthoringDeleteTrainedModelDefaultResponse
  >;
}

export interface LoadSnapshot {
  /** Restores the snapshot of this trained model to be the current working directory of the project. */
  post(
    options?: TextAnalysisAuthoringLoadSnapshotParameters,
  ): StreamableMethod<
    TextAnalysisAuthoringLoadSnapshot202Response | TextAnalysisAuthoringLoadSnapshotDefaultResponse
  >;
}

export interface GetModelEvaluationResults {
  /** Gets the detailed results of the evaluation for a trained model. This includes the raw inference results for the data included in the evaluation process. */
  get(
    options: TextAnalysisAuthoringGetModelEvaluationResultsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetModelEvaluationResults200Response
    | TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse
  >;
}

export interface GetModelEvaluationSummary {
  /** Gets the evaluation summary of a trained model. The summary includes high level performance measurements of the model e.g., F1, Precision, Recall, etc. */
  get(
    options?: TextAnalysisAuthoringGetModelEvaluationSummaryParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetModelEvaluationSummary200Response
    | TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse
  >;
}

export interface GetLoadSnapshotStatus {
  /** Gets the status for loading a snapshot. */
  get(
    options?: TextAnalysisAuthoringGetLoadSnapshotStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetLoadSnapshotStatus200Response
    | TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse
  >;
}

export interface ListDeploymentResources {
  /** Lists the deployments resources assigned to the project. */
  get(
    options?: TextAnalysisAuthoringListDeploymentResourcesParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringListDeploymentResources200Response
    | TextAnalysisAuthoringListDeploymentResourcesDefaultResponse
  >;
}

export interface AssignDeploymentResources {
  /** Assign new Azure resources to a project to allow deploying new deployments to them. This API is available only via AAD authentication and not supported via subscription key authentication. For more details about AAD authentication, check here: https://learn.microsoft.com/en-us/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-azure-active-directory */
  post(
    options: TextAnalysisAuthoringAssignDeploymentResourcesParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringAssignDeploymentResources202Response
    | TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse
  >;
}

export interface UnassignDeploymentResources {
  /** Unassign resources from a project. This disallows deploying new deployments to these resources, and deletes existing deployments assigned to them. */
  post(
    options: TextAnalysisAuthoringUnassignDeploymentResourcesParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringUnassignDeploymentResources202Response
    | TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse
  >;
}

export interface GetAssignDeploymentResourcesStatus {
  /** Gets the status of an existing assign deployment resources job. */
  get(
    options?: TextAnalysisAuthoringGetAssignDeploymentResourcesStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetAssignDeploymentResourcesStatus200Response
    | TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse
  >;
}

export interface GetUnassignDeploymentResourcesStatus {
  /** Gets the status of an existing unassign deployment resources job. */
  get(
    options?: TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatus200Response
    | TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse
  >;
}

export interface ListTrainingJobs {
  /** Lists the non-expired training jobs created for a project. */
  get(
    options?: TextAnalysisAuthoringListTrainingJobsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringListTrainingJobs200Response
    | TextAnalysisAuthoringListTrainingJobsDefaultResponse
  >;
}

export interface GetTrainingStatus {
  /** Gets the status for a training job. */
  get(
    options?: TextAnalysisAuthoringGetTrainingStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetTrainingStatus200Response
    | TextAnalysisAuthoringGetTrainingStatusDefaultResponse
  >;
}

export interface CancelTrainingJob {
  /** Triggers a cancellation for a running training job. */
  post(
    options?: TextAnalysisAuthoringCancelTrainingJobParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringCancelTrainingJob202Response
    | TextAnalysisAuthoringCancelTrainingJobDefaultResponse
  >;
}

export interface GetProjectDeletionStatus {
  /** Gets the status for a project deletion job. */
  get(
    options?: TextAnalysisAuthoringGetProjectDeletionStatusParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetProjectDeletionStatus200Response
    | TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse
  >;
}

export interface ListAssignedResourceDeployments {
  /** Lists the deployments to which an Azure resource is assigned. This doesn't return deployments belonging to projects owned by this resource. It only returns deployments belonging to projects owned by other resources. */
  get(
    options?: TextAnalysisAuthoringListAssignedResourceDeploymentsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringListAssignedResourceDeployments200Response
    | TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse
  >;
}

export interface GetSupportedLanguages {
  /** Lists the supported languages. */
  get(
    options?: TextAnalysisAuthoringGetSupportedLanguagesParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringGetSupportedLanguages200Response
    | TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse
  >;
}

export interface ListTrainingConfigVersions {
  /** Lists the support training config version for a given project type. */
  get(
    options: TextAnalysisAuthoringListTrainingConfigVersionsParameters,
  ): StreamableMethod<
    | TextAnalysisAuthoringListTrainingConfigVersions200Response
    | TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/authoring/analyze-text/projects' has methods for the following verbs: get */
  (path: "/authoring/analyze-text/projects"): ListProjects;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}' has methods for the following verbs: patch, get, delete */
  (path: "/authoring/analyze-text/projects/{projectName}", projectName: string): CreateProject;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/:export' has methods for the following verbs: post */
  (path: "/authoring/analyze-text/projects/{projectName}/:export", projectName: string): Export;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/:import' has methods for the following verbs: post */
  (path: "/authoring/analyze-text/projects/{projectName}/:import", projectName: string): Import;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/:train' has methods for the following verbs: post */
  (path: "/authoring/analyze-text/projects/{projectName}/:train", projectName: string): Train;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments",
    projectName: string,
  ): ListDeployments;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments/:swap' has methods for the following verbs: post */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments/:swap",
    projectName: string,
  ): SwapDeployments;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments/\{deploymentName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}",
    projectName: string,
    deploymentName: string,
  ): GetDeployment;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments/\{deploymentName\}/:delete-from-resources' has methods for the following verbs: post */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/:delete-from-resources",
    projectName: string,
    deploymentName: string,
  ): DeleteDeploymentFromResources;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments/\{deploymentName\}/delete-from-resources/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/delete-from-resources/jobs/{jobId}",
    projectName: string,
    deploymentName: string,
    jobId: string,
  ): GetDeploymentDeleteFromResourcesStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments/\{deploymentName\}/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments/{deploymentName}/jobs/{jobId}",
    projectName: string,
    deploymentName: string,
    jobId: string,
  ): GetDeploymentStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/deployments/swap/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/deployments/swap/jobs/{jobId}",
    projectName: string,
    jobId: string,
  ): GetSwapDeploymentsStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/export/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/export/jobs/{jobId}",
    projectName: string,
    jobId: string,
  ): GetExportStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/import/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/import/jobs/{jobId}",
    projectName: string,
    jobId: string,
  ): GetImportStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/models' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/models",
    projectName: string,
  ): ListTrainedModels;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/models/\{trainedModelLabel\}' has methods for the following verbs: get, delete */
  (
    path: "/authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}",
    projectName: string,
    trainedModelLabel: string,
  ): GetTrainedModel;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/models/\{trainedModelLabel\}/:load-snapshot' has methods for the following verbs: post */
  (
    path: "/authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/:load-snapshot",
    projectName: string,
    trainedModelLabel: string,
  ): LoadSnapshot;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/models/\{trainedModelLabel\}/evaluation/result' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/evaluation/result",
    projectName: string,
    trainedModelLabel: string,
  ): GetModelEvaluationResults;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/models/\{trainedModelLabel\}/evaluation/summary-result' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/evaluation/summary-result",
    projectName: string,
    trainedModelLabel: string,
  ): GetModelEvaluationSummary;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/models/\{trainedModelLabel\}/load-snapshot/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/models/{trainedModelLabel}/load-snapshot/jobs/{jobId}",
    projectName: string,
    trainedModelLabel: string,
    jobId: string,
  ): GetLoadSnapshotStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/resources' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/resources",
    projectName: string,
  ): ListDeploymentResources;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/resources/:assign' has methods for the following verbs: post */
  (
    path: "/authoring/analyze-text/projects/{projectName}/resources/:assign",
    projectName: string,
  ): AssignDeploymentResources;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/resources/:unassign' has methods for the following verbs: post */
  (
    path: "/authoring/analyze-text/projects/{projectName}/resources/:unassign",
    projectName: string,
  ): UnassignDeploymentResources;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/resources/assign/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/resources/assign/jobs/{jobId}",
    projectName: string,
    jobId: string,
  ): GetAssignDeploymentResourcesStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/resources/unassign/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/resources/unassign/jobs/{jobId}",
    projectName: string,
    jobId: string,
  ): GetUnassignDeploymentResourcesStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/train/jobs' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/train/jobs",
    projectName: string,
  ): ListTrainingJobs;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/train/jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/{projectName}/train/jobs/{jobId}",
    projectName: string,
    jobId: string,
  ): GetTrainingStatus;
  /** Resource for '/authoring/analyze-text/projects/\{projectName\}/train/jobs/\{jobId\}/:cancel' has methods for the following verbs: post */
  (
    path: "/authoring/analyze-text/projects/{projectName}/train/jobs/{jobId}/:cancel",
    projectName: string,
    jobId: string,
  ): CancelTrainingJob;
  /** Resource for '/authoring/analyze-text/projects/global/deletion-jobs/\{jobId\}' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/global/deletion-jobs/{jobId}",
    jobId: string,
  ): GetProjectDeletionStatus;
  /** Resource for '/authoring/analyze-text/projects/global/deployments/resources' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/global/deployments/resources",
  ): ListAssignedResourceDeployments;
  /** Resource for '/authoring/analyze-text/projects/global/languages' has methods for the following verbs: get */
  (path: "/authoring/analyze-text/projects/global/languages"): GetSupportedLanguages;
  /** Resource for '/authoring/analyze-text/projects/global/training-config-versions' has methods for the following verbs: get */
  (
    path: "/authoring/analyze-text/projects/global/training-config-versions",
  ): ListTrainingConfigVersions;
}

export type TextAuthoringClient = Client & {
  path: Routes;
};
