// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DeveloperHubServiceClient } from "./developerHubServiceClient.js";
export type {
  ArtifactGenerationProperties,
  GenerationLanguage,
  DockerfileGenerationMode,
  ManifestGenerationMode,
  GenerationManifestType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  GitHubOAuthResponse,
  GitHubOAuthProperties,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  GitHubOAuthListResponse,
  GitHubOAuthCallRequest,
  GitHubOAuthInfoResponse,
  OperationListResult,
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  IacProfile,
  IacProfileProperties,
  IacGitHubProfile,
  AuthorizationStatus,
  PullRequestStatus,
  TerraformProfile,
  StageProperties,
  IacTemplateProperties,
  IacTemplateDetails,
  QuickStartTemplateType,
  TrackedResource,
  TagsObject,
  ExportTemplateRequest,
  PrLinkResponse,
  ScaleTemplateRequest,
  ScaleProperty,
  AdooAuthCallRequest,
  AdooAuthInfoResponse,
  Workflow,
  WorkflowProperties,
  GitHubWorkflowProfile,
  DeploymentProperties,
  ManifestType,
  Acr,
  GitHubWorkflowProfileOidcCredentials,
  WorkflowRun,
  WorkflowRunStatus,
  AzurePipelineProfile,
  ADORepository,
  Build,
  PullRequest,
  TemplateWorkflowProfile,
  RepositoryProviderType,
  TemplateReference,
  GitHubProviderProfile,
  GitHubRepository,
  OidcCredentials,
  ADOProviderProfile,
  DeleteWorkflowResponse,
  AdooAuthResponse,
  AdooAuth,
  Template,
  TemplateProperties,
  TemplateType,
  VersionedTemplate,
  VersionedTemplateProperties,
  Parameter,
  ParameterType,
  ParameterKind,
  ParameterDefault,
  GenerateVersionedTemplateResponse,
} from "./models/index.js";
export {
  KnownGenerationLanguage,
  KnownDockerfileGenerationMode,
  KnownManifestGenerationMode,
  KnownGenerationManifestType,
  KnownCreatedByType,
  KnownOrigin,
  KnownActionType,
  KnownAuthorizationStatus,
  KnownPullRequestStatus,
  KnownQuickStartTemplateType,
  KnownManifestType,
  KnownWorkflowRunStatus,
  KnownRepositoryProviderType,
  KnownTemplateType,
  KnownParameterType,
  KnownParameterKind,
  KnownVersions,
} from "./models/index.js";
export type {
  DeveloperHubServiceClientOptionalParams,
  GitHubOAuthOptionalParams,
  ListGitHubOAuthOptionalParams,
  GitHubOAuthCallbackOptionalParams,
  GeneratePreviewArtifactsOptionalParams,
} from "./api/index.js";
export type {
  AdooAuthListOptionalParams,
  AdooAuthGetOptionalParams,
} from "./api/adooAuth/index.js";
export type { AdooAuthResponsesGetAdooAuthInfoOptionalParams } from "./api/adooAuthResponses/index.js";
export type {
  IacProfilesSyncOptionalParams,
  IacProfilesScaleOptionalParams,
  IacProfilesExportOptionalParams,
  IacProfilesListOptionalParams,
  IacProfilesListByResourceGroupOptionalParams,
  IacProfilesDeleteOptionalParams,
  IacProfilesUpdateTagsOptionalParams,
  IacProfilesCreateOrUpdateOptionalParams,
  IacProfilesGetOptionalParams,
} from "./api/iacProfiles/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  TemplateListOptionalParams,
  TemplateGetOptionalParams,
} from "./api/template/index.js";
export type {
  VersionedTemplateGenerateOptionalParams,
  VersionedTemplateListOptionalParams,
  VersionedTemplateGetOptionalParams,
} from "./api/versionedTemplate/index.js";
export type {
  WorkflowListOptionalParams,
  WorkflowListByResourceGroupOptionalParams,
  WorkflowDeleteOptionalParams,
  WorkflowUpdateTagsOptionalParams,
  WorkflowCreateOrUpdateOptionalParams,
  WorkflowGetOptionalParams,
} from "./api/workflow/index.js";
export type {
  AdooAuthOperations,
  AdooAuthResponsesOperations,
  IacProfilesOperations,
  OperationsOperations,
  TemplateOperations,
  VersionedTemplateOperations,
  WorkflowOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
