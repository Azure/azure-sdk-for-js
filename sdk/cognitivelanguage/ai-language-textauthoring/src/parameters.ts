// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RawHttpHeadersInput } from "@azure/core-rest-pipeline";
import { RequestParameters } from "@azure-rest/core-client";
import {
  CreateProjectOptions,
  ExportedProject,
  TrainingJobOptions,
  SwapDeploymentsOptions,
  CreateDeploymentOptions,
  DeleteDeploymentOptions,
  AssignDeploymentResourcesOptions,
  UnassignDeploymentResourcesOptions,
} from "./models";

export interface TextAnalysisAuthoringListProjectsQueryParamProperties {
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListProjectsQueryParam {
  queryParameters?: TextAnalysisAuthoringListProjectsQueryParamProperties;
}

export type TextAnalysisAuthoringListProjectsParameters =
  TextAnalysisAuthoringListProjectsQueryParam & RequestParameters;

export interface TextAnalysisAuthoringCreateProjectBodyParam {
  /** The project parameters. */
  body: CreateProjectOptions;
}

export interface TextAnalysisAuthoringCreateProjectMediaTypesParam {
  /** Request content type */
  contentType?: "application/merge-patch+json";
}

export type TextAnalysisAuthoringCreateProjectParameters =
  TextAnalysisAuthoringCreateProjectMediaTypesParam &
    TextAnalysisAuthoringCreateProjectBodyParam &
    RequestParameters;
export type TextAnalysisAuthoringGetProjectParameters = RequestParameters;
export type TextAnalysisAuthoringDeleteProjectParameters = RequestParameters;

export interface TextAnalysisAuthoringExportQueryParamProperties {
  /** Specifies the method used to interpret string offsets. For additional information see https://aka.ms/text-analytics-offsets. */
  stringIndexType: "Utf16CodeUnit";
  /** Kind of asset to export. */
  assetKind?: string;
  /** Trained model label to export. If the trainedModelLabel is null, the default behavior is to export the current working copy. */
  trainedModelLabel?: string;
}

export interface TextAnalysisAuthoringExportQueryParam {
  queryParameters: TextAnalysisAuthoringExportQueryParamProperties;
}

export type TextAnalysisAuthoringExportParameters = TextAnalysisAuthoringExportQueryParam &
  RequestParameters;

export interface TextAnalysisAuthoringImportHeaders {
  /** The format of the project to import. The currently supported formats are json and aml formats. If not provided, the default is set to json. */
  format?: string;
}

export interface TextAnalysisAuthoringImportBodyParam {
  /** The project data to import. */
  body: ExportedProject;
}

export interface TextAnalysisAuthoringImportHeaderParam {
  headers?: RawHttpHeadersInput & TextAnalysisAuthoringImportHeaders;
}

export interface TextAnalysisAuthoringImportMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringImportParameters = TextAnalysisAuthoringImportHeaderParam &
  TextAnalysisAuthoringImportMediaTypesParam &
  TextAnalysisAuthoringImportBodyParam &
  RequestParameters;

export interface TextAnalysisAuthoringTrainBodyParam {
  /** The training input parameters. */
  body: TrainingJobOptions;
}

export interface TextAnalysisAuthoringTrainMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringTrainParameters = TextAnalysisAuthoringTrainMediaTypesParam &
  TextAnalysisAuthoringTrainBodyParam &
  RequestParameters;

export interface TextAnalysisAuthoringListDeploymentsQueryParamProperties {
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListDeploymentsQueryParam {
  queryParameters?: TextAnalysisAuthoringListDeploymentsQueryParamProperties;
}

export type TextAnalysisAuthoringListDeploymentsParameters =
  TextAnalysisAuthoringListDeploymentsQueryParam & RequestParameters;

export interface TextAnalysisAuthoringSwapDeploymentsBodyParam {
  /** The job object to swap two deployments. */
  body: SwapDeploymentsOptions;
}

export interface TextAnalysisAuthoringSwapDeploymentsMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringSwapDeploymentsParameters =
  TextAnalysisAuthoringSwapDeploymentsMediaTypesParam &
    TextAnalysisAuthoringSwapDeploymentsBodyParam &
    RequestParameters;
export type TextAnalysisAuthoringGetDeploymentParameters = RequestParameters;

export interface TextAnalysisAuthoringDeployProjectBodyParam {
  /** The new deployment info. */
  body: CreateDeploymentOptions;
}

export interface TextAnalysisAuthoringDeployProjectMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringDeployProjectParameters =
  TextAnalysisAuthoringDeployProjectMediaTypesParam &
    TextAnalysisAuthoringDeployProjectBodyParam &
    RequestParameters;
export type TextAnalysisAuthoringDeleteDeploymentParameters = RequestParameters;

export interface TextAnalysisAuthoringDeleteDeploymentFromResourcesBodyParam {
  /** The options for deleting the deployment. */
  body: DeleteDeploymentOptions;
}

export interface TextAnalysisAuthoringDeleteDeploymentFromResourcesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringDeleteDeploymentFromResourcesParameters =
  TextAnalysisAuthoringDeleteDeploymentFromResourcesMediaTypesParam &
    TextAnalysisAuthoringDeleteDeploymentFromResourcesBodyParam &
    RequestParameters;
export type TextAnalysisAuthoringGetDeploymentDeleteFromResourcesStatusParameters =
  RequestParameters;
export type TextAnalysisAuthoringGetDeploymentStatusParameters = RequestParameters;
export type TextAnalysisAuthoringGetSwapDeploymentsStatusParameters = RequestParameters;
export type TextAnalysisAuthoringGetExportStatusParameters = RequestParameters;
export type TextAnalysisAuthoringGetImportStatusParameters = RequestParameters;

export interface TextAnalysisAuthoringListTrainedModelsQueryParamProperties {
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListTrainedModelsQueryParam {
  queryParameters?: TextAnalysisAuthoringListTrainedModelsQueryParamProperties;
}

export type TextAnalysisAuthoringListTrainedModelsParameters =
  TextAnalysisAuthoringListTrainedModelsQueryParam & RequestParameters;
export type TextAnalysisAuthoringGetTrainedModelParameters = RequestParameters;
export type TextAnalysisAuthoringDeleteTrainedModelParameters = RequestParameters;
export type TextAnalysisAuthoringLoadSnapshotParameters = RequestParameters;

export interface TextAnalysisAuthoringGetModelEvaluationResultsQueryParamProperties {
  /** Specifies the method used to interpret string offsets. For additional information see https://aka.ms/text-analytics-offsets. */
  stringIndexType: "Utf16CodeUnit";
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringGetModelEvaluationResultsQueryParam {
  queryParameters: TextAnalysisAuthoringGetModelEvaluationResultsQueryParamProperties;
}

export type TextAnalysisAuthoringGetModelEvaluationResultsParameters =
  TextAnalysisAuthoringGetModelEvaluationResultsQueryParam & RequestParameters;
export type TextAnalysisAuthoringGetModelEvaluationSummaryParameters = RequestParameters;
export type TextAnalysisAuthoringGetLoadSnapshotStatusParameters = RequestParameters;

export interface TextAnalysisAuthoringListDeploymentResourcesQueryParamProperties {
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListDeploymentResourcesQueryParam {
  queryParameters?: TextAnalysisAuthoringListDeploymentResourcesQueryParamProperties;
}

export type TextAnalysisAuthoringListDeploymentResourcesParameters =
  TextAnalysisAuthoringListDeploymentResourcesQueryParam & RequestParameters;

export interface TextAnalysisAuthoringAssignDeploymentResourcesBodyParam {
  /** The new project resources info. */
  body: AssignDeploymentResourcesOptions;
}

export interface TextAnalysisAuthoringAssignDeploymentResourcesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringAssignDeploymentResourcesParameters =
  TextAnalysisAuthoringAssignDeploymentResourcesMediaTypesParam &
    TextAnalysisAuthoringAssignDeploymentResourcesBodyParam &
    RequestParameters;

export interface TextAnalysisAuthoringUnassignDeploymentResourcesBodyParam {
  /** The info for the deployment resources to be deleted. */
  body: UnassignDeploymentResourcesOptions;
}

export interface TextAnalysisAuthoringUnassignDeploymentResourcesMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TextAnalysisAuthoringUnassignDeploymentResourcesParameters =
  TextAnalysisAuthoringUnassignDeploymentResourcesMediaTypesParam &
    TextAnalysisAuthoringUnassignDeploymentResourcesBodyParam &
    RequestParameters;
export type TextAnalysisAuthoringGetAssignDeploymentResourcesStatusParameters = RequestParameters;
export type TextAnalysisAuthoringGetUnassignDeploymentResourcesStatusParameters = RequestParameters;

export interface TextAnalysisAuthoringListTrainingJobsQueryParamProperties {
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListTrainingJobsQueryParam {
  queryParameters?: TextAnalysisAuthoringListTrainingJobsQueryParamProperties;
}

export type TextAnalysisAuthoringListTrainingJobsParameters =
  TextAnalysisAuthoringListTrainingJobsQueryParam & RequestParameters;
export type TextAnalysisAuthoringGetTrainingStatusParameters = RequestParameters;
export type TextAnalysisAuthoringCancelTrainingJobParameters = RequestParameters;
export type TextAnalysisAuthoringGetProjectDeletionStatusParameters = RequestParameters;

export interface TextAnalysisAuthoringListAssignedResourceDeploymentsQueryParamProperties {
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListAssignedResourceDeploymentsQueryParam {
  queryParameters?: TextAnalysisAuthoringListAssignedResourceDeploymentsQueryParamProperties;
}

export type TextAnalysisAuthoringListAssignedResourceDeploymentsParameters =
  TextAnalysisAuthoringListAssignedResourceDeploymentsQueryParam & RequestParameters;

export interface TextAnalysisAuthoringGetSupportedLanguagesQueryParamProperties {
  /** The project kind, default value is CustomSingleLabelClassification. */
  projectKind?:
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification"
    | "CustomEntityRecognition"
    | "CustomAbstractiveSummarization";
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringGetSupportedLanguagesQueryParam {
  queryParameters?: TextAnalysisAuthoringGetSupportedLanguagesQueryParamProperties;
}

export type TextAnalysisAuthoringGetSupportedLanguagesParameters =
  TextAnalysisAuthoringGetSupportedLanguagesQueryParam & RequestParameters;

export interface TextAnalysisAuthoringListTrainingConfigVersionsQueryParamProperties {
  /** The project kind. */
  projectKind:
    | "CustomSingleLabelClassification"
    | "CustomMultiLabelClassification"
    | "CustomEntityRecognition"
    | "CustomAbstractiveSummarization";
  /** The maximum number of resources to return from the collection. */
  top?: number;
  /** An offset into the collection of the first resource to be returned. */
  skip?: number;
  /** The maximum number of resources to include in a single response. */
  maxpagesize?: number;
}

export interface TextAnalysisAuthoringListTrainingConfigVersionsQueryParam {
  queryParameters: TextAnalysisAuthoringListTrainingConfigVersionsQueryParamProperties;
}

export type TextAnalysisAuthoringListTrainingConfigVersionsParameters =
  TextAnalysisAuthoringListTrainingConfigVersionsQueryParam & RequestParameters;
