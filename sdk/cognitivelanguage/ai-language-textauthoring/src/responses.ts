// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeaders } from "@azure/core-rest-pipeline";
import { HttpResponse } from "@azure-rest/core-client";
import {
  ProjectsMetadataOutput,
  ErrorResponseOutput,
  ProjectMetadataOutput,
  ProjectDeploymentsOutput,
  ProjectDeploymentOutput,
  DeploymentJobStateOutput,
  ExportProjectJobStateOutput,
  ImportProjectJobStateOutput,
  ProjectTrainedModelsOutput,
  ProjectTrainedModelOutput,
  EvaluationResultsOutput,
  EvaluationSummaryOutput,
  LoadSnapshotJobStateOutput,
  AssignedDeploymentResourcesOutput,
  DeploymentResourcesJobStateOutput,
  TrainingJobsOutput,
  TrainingJobStateOutput,
  ProjectDeletionJobStateOutput,
  AssignedResourceDeploymentsMetadataOutput,
  SupportedLanguagesOutput,
  TrainingConfigVersionsOutput,
} from "./outputModels";

/** Lists the existing projects. */
export interface TextAnalysisAuthoringListProjects200Response extends HttpResponse {
  status: "200";
  body: ProjectsMetadataOutput;
}

/** Lists the existing projects. */
export interface TextAnalysisAuthoringListProjectsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Creates a new project or updates an existing one. */
export interface TextAnalysisAuthoringCreateProject200Response extends HttpResponse {
  status: "200";
  body: ProjectMetadataOutput;
}

/** Creates a new project or updates an existing one. */
export interface TextAnalysisAuthoringCreateProject201Response extends HttpResponse {
  status: "201";
  body: ProjectMetadataOutput;
}

/** Creates a new project or updates an existing one. */
export interface TextAnalysisAuthoringCreateProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the details of a project. */
export interface TextAnalysisAuthoringGetProject200Response extends HttpResponse {
  status: "200";
  body: ProjectMetadataOutput;
}

/** Gets the details of a project. */
export interface TextAnalysisAuthoringGetProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringDeleteProject202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Deletes a project. */
export interface TextAnalysisAuthoringDeleteProject202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringDeleteProject202Headers;
}

/** Deletes a project. */
export interface TextAnalysisAuthoringDeleteProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringExport202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Triggers a job to export a project's data. */
export interface TextAnalysisAuthoringExport202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringExport202Headers;
}

/** Triggers a job to export a project's data. */
export interface TextAnalysisAuthoringExportDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringImport202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Triggers a job to import a project. If a project with the same name already exists, the data of that project is replaced. */
export interface TextAnalysisAuthoringImport202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringImport202Headers;
}

/** Triggers a job to import a project. If a project with the same name already exists, the data of that project is replaced. */
export interface TextAnalysisAuthoringImportDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringTrain202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Triggers a training job for a project. */
export interface TextAnalysisAuthoringTrain202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringTrain202Headers;
}

/** Triggers a training job for a project. */
export interface TextAnalysisAuthoringTrainDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the deployments belonging to a project. */
export interface TextAnalysisAuthoringListDeployments200Response extends HttpResponse {
  status: "200";
  body: ProjectDeploymentsOutput;
}

/** Lists the deployments belonging to a project. */
export interface TextAnalysisAuthoringListDeploymentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringSwapDeployments202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Swaps two existing deployments with each other. */
export interface TextAnalysisAuthoringSwapDeployments202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringSwapDeployments202Headers;
}

/** Swaps two existing deployments with each other. */
export interface TextAnalysisAuthoringSwapDeploymentsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the details of a deployment. */
export interface TextAnalysisAuthoringGetDeployment200Response extends HttpResponse {
  status: "200";
  body: ProjectDeploymentOutput;
}

/** Gets the details of a deployment. */
export interface TextAnalysisAuthoringGetDeploymentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringDeployProject202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Creates a new deployment or replaces an existing one. */
export interface TextAnalysisAuthoringDeployProject202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringDeployProject202Headers;
}

/** Creates a new deployment or replaces an existing one. */
export interface TextAnalysisAuthoringDeployProjectDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringDeleteDeployment202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Deletes a project deployment. */
export interface TextAnalysisAuthoringDeleteDeployment202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringDeleteDeployment202Headers;
}

/** Deletes a project deployment. */
export interface TextAnalysisAuthoringDeleteDeploymentDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringDeleteDeploymentFromResources202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Deletes a project deployment from the specified assigned resources. */
export interface TextAnalysisAuthoringDeleteDeploymentFromResources202Response
  extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringDeleteDeploymentFromResources202Headers;
}

/** Deletes a project deployment from the specified assigned resources. */
export interface TextAnalysisAuthoringDeleteDeploymentFromResourcesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of an existing delete deployment from specific resources job. */
export interface TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentJobStateOutput;
}

/** Gets the status of an existing delete deployment from specific resources job. */
export interface TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of an existing deployment job. */
export interface TextAnalysisAuthoringGetDeploymentStatus200Response extends HttpResponse {
  status: "200";
  body: DeploymentJobStateOutput;
}

/** Gets the status of an existing deployment job. */
export interface TextAnalysisAuthoringGetDeploymentStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of an existing swap deployment job. */
export interface TextAnalysisAuthoringGetSwapDeploymentsStatus200Response extends HttpResponse {
  status: "200";
  body: DeploymentJobStateOutput;
}

/** Gets the status of an existing swap deployment job. */
export interface TextAnalysisAuthoringGetSwapDeploymentsStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of an export job. Once job completes, returns the project metadata, and assets. */
export interface TextAnalysisAuthoringGetExportStatus200Response extends HttpResponse {
  status: "200";
  body: ExportProjectJobStateOutput;
}

/** Gets the status of an export job. Once job completes, returns the project metadata, and assets. */
export interface TextAnalysisAuthoringGetExportStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status for an import. */
export interface TextAnalysisAuthoringGetImportStatus200Response extends HttpResponse {
  status: "200";
  body: ImportProjectJobStateOutput;
}

/** Gets the status for an import. */
export interface TextAnalysisAuthoringGetImportStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the trained models belonging to a project. */
export interface TextAnalysisAuthoringListTrainedModels200Response extends HttpResponse {
  status: "200";
  body: ProjectTrainedModelsOutput;
}

/** Lists the trained models belonging to a project. */
export interface TextAnalysisAuthoringListTrainedModelsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the details of a trained model. */
export interface TextAnalysisAuthoringGetTrainedModel200Response extends HttpResponse {
  status: "200";
  body: ProjectTrainedModelOutput;
}

/** Gets the details of a trained model. */
export interface TextAnalysisAuthoringGetTrainedModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Deletes an existing trained model. */
export interface TextAnalysisAuthoringDeleteTrainedModel204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes an existing trained model. */
export interface TextAnalysisAuthoringDeleteTrainedModelDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringLoadSnapshot202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Restores the snapshot of this trained model to be the current working directory of the project. */
export interface TextAnalysisAuthoringLoadSnapshot202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringLoadSnapshot202Headers;
}

/** Restores the snapshot of this trained model to be the current working directory of the project. */
export interface TextAnalysisAuthoringLoadSnapshotDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the detailed results of the evaluation for a trained model. This includes the raw inference results for the data included in the evaluation process. */
export interface TextAnalysisAuthoringGetModelEvaluationResults200Response extends HttpResponse {
  status: "200";
  body: EvaluationResultsOutput;
}

/** Gets the detailed results of the evaluation for a trained model. This includes the raw inference results for the data included in the evaluation process. */
export interface TextAnalysisAuthoringGetModelEvaluationResultsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the evaluation summary of a trained model. The summary includes high level performance measurements of the model e.g., F1, Precision, Recall, etc. */
export interface TextAnalysisAuthoringGetModelEvaluationSummary200Response extends HttpResponse {
  status: "200";
  body: EvaluationSummaryOutput;
}

/** Gets the evaluation summary of a trained model. The summary includes high level performance measurements of the model e.g., F1, Precision, Recall, etc. */
export interface TextAnalysisAuthoringGetModelEvaluationSummaryDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status for loading a snapshot. */
export interface TextAnalysisAuthoringGetLoadSnapshotStatus200Response extends HttpResponse {
  status: "200";
  body: LoadSnapshotJobStateOutput;
}

/** Gets the status for loading a snapshot. */
export interface TextAnalysisAuthoringGetLoadSnapshotStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the deployments resources assigned to the project. */
export interface TextAnalysisAuthoringListDeploymentResources200Response extends HttpResponse {
  status: "200";
  body: AssignedDeploymentResourcesOutput;
}

/** Lists the deployments resources assigned to the project. */
export interface TextAnalysisAuthoringListDeploymentResourcesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringAssignDeploymentResources202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Assign new Azure resources to a project to allow deploying new deployments to them. This API is available only via AAD authentication and not supported via subscription key authentication. For more details about AAD authentication, check here: https://learn.microsoft.com/en-us/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-azure-active-directory */
export interface TextAnalysisAuthoringAssignDeploymentResources202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringAssignDeploymentResources202Headers;
}

/** Assign new Azure resources to a project to allow deploying new deployments to them. This API is available only via AAD authentication and not supported via subscription key authentication. For more details about AAD authentication, check here: https://learn.microsoft.com/en-us/azure/cognitive-services/authentication?tabs=powershell#authenticate-with-azure-active-directory */
export interface TextAnalysisAuthoringAssignDeploymentResourcesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringUnassignDeploymentResources202Headers {
  /** The location of the status API for monitoring the created job. */
  "operation-location"?: string;
}

/** Unassign resources from a project. This disallows deploying new deployments to these resources, and deletes existing deployments assigned to them. */
export interface TextAnalysisAuthoringUnassignDeploymentResources202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringUnassignDeploymentResources202Headers;
}

/** Unassign resources from a project. This disallows deploying new deployments to these resources, and deletes existing deployments assigned to them. */
export interface TextAnalysisAuthoringUnassignDeploymentResourcesDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of an existing assign deployment resources job. */
export interface TextAnalysisAuthoringGetAssignDeploymentResourcesStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentResourcesJobStateOutput;
}

/** Gets the status of an existing assign deployment resources job. */
export interface TextAnalysisAuthoringGetAssignDeploymentResourcesStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status of an existing unassign deployment resources job. */
export interface TextAnalysisAuthoringGetUnassignDeploymentResourcesStatus200Response
  extends HttpResponse {
  status: "200";
  body: DeploymentResourcesJobStateOutput;
}

/** Gets the status of an existing unassign deployment resources job. */
export interface TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the non-expired training jobs created for a project. */
export interface TextAnalysisAuthoringListTrainingJobs200Response extends HttpResponse {
  status: "200";
  body: TrainingJobsOutput;
}

/** Lists the non-expired training jobs created for a project. */
export interface TextAnalysisAuthoringListTrainingJobsDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status for a training job. */
export interface TextAnalysisAuthoringGetTrainingStatus200Response extends HttpResponse {
  status: "200";
  body: TrainingJobStateOutput;
}

/** Gets the status for a training job. */
export interface TextAnalysisAuthoringGetTrainingStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

export interface TextAnalysisAuthoringCancelTrainingJob202Headers {
  /** The location of the status API for monitoring the job cancellation. */
  "operation-location"?: string;
}

/** Triggers a cancellation for a running training job. */
export interface TextAnalysisAuthoringCancelTrainingJob202Response extends HttpResponse {
  status: "202";
  body: Record<string, unknown>;
  headers: RawHttpHeaders & TextAnalysisAuthoringCancelTrainingJob202Headers;
}

/** Triggers a cancellation for a running training job. */
export interface TextAnalysisAuthoringCancelTrainingJobDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Gets the status for a project deletion job. */
export interface TextAnalysisAuthoringGetProjectDeletionStatus200Response extends HttpResponse {
  status: "200";
  body: ProjectDeletionJobStateOutput;
}

/** Gets the status for a project deletion job. */
export interface TextAnalysisAuthoringGetProjectDeletionStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the deployments to which an Azure resource is assigned. This doesn't return deployments belonging to projects owned by this resource. It only returns deployments belonging to projects owned by other resources. */
export interface TextAnalysisAuthoringListAssignedResourceDeployments200Response
  extends HttpResponse {
  status: "200";
  body: AssignedResourceDeploymentsMetadataOutput;
}

/** Lists the deployments to which an Azure resource is assigned. This doesn't return deployments belonging to projects owned by this resource. It only returns deployments belonging to projects owned by other resources. */
export interface TextAnalysisAuthoringListAssignedResourceDeploymentsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the supported languages. */
export interface TextAnalysisAuthoringGetSupportedLanguages200Response extends HttpResponse {
  status: "200";
  body: SupportedLanguagesOutput;
}

/** Lists the supported languages. */
export interface TextAnalysisAuthoringGetSupportedLanguagesDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}

/** Lists the support training config version for a given project type. */
export interface TextAnalysisAuthoringListTrainingConfigVersions200Response extends HttpResponse {
  status: "200";
  body: TrainingConfigVersionsOutput;
}

/** Lists the support training config version for a given project type. */
export interface TextAnalysisAuthoringListTrainingConfigVersionsDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseOutput;
}
