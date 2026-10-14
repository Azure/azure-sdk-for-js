// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { ApiCenterClient } from "./apiCenterClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  Operation,
  OperationDisplay,
  Origin,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Service,
  ServiceProperties,
  ProvisioningState,
  ManagedServiceIdentity,
  ManagedServiceIdentityType,
  UserAssignedIdentity,
  TrackedResource,
  Resource,
  SystemData,
  CreatedByType,
  ServiceUpdate,
  ServiceUpdateProperties,
  MetadataSchemaExportRequest,
  MetadataAssignmentEntity,
  MetadataSchemaExportResult,
  MetadataSchemaExportFormat,
  DeletedService,
  DeletedServiceProperties,
  ProxyResource,
  MetadataSchema,
  MetadataSchemaProperties,
  MetadataAssignment,
  Workspace,
  WorkspaceProperties,
  Api,
  ApiProperties,
  ApiKind,
  LifecycleStage,
  TermsOfService,
  ExternalDocumentation,
  Contact,
  License,
  CustomProperties,
  ApiVersion,
  ApiVersionProperties,
  ApiDefinition,
  ApiDefinitionProperties,
  ApiDefinitionPropertiesSpecification,
  ApiSpecImportRequest,
  ApiSpecImportSourceFormat,
  ApiSpecImportRequestSpecification,
  ApiSpecExportResult,
  ApiSpecExportResultFormat,
  ApiSource,
  ApiSourceProperties,
  ImportSpecificationOptions,
  AzureApiManagementSource,
  LinkState,
  ApiSourceLinkState,
  Deployment,
  DeploymentProperties,
  DeploymentState,
  DeploymentServer,
  Environment,
  EnvironmentProperties,
  EnvironmentKind,
  EnvironmentServer,
  EnvironmentServerType,
  Onboarding,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownManagedServiceIdentityType,
  KnownCreatedByType,
  KnownMetadataAssignmentEntity,
  KnownMetadataSchemaExportFormat,
  KnownApiKind,
  KnownLifecycleStage,
  KnownApiSpecImportSourceFormat,
  KnownApiSpecExportResultFormat,
  KnownImportSpecificationOptions,
  KnownApiSourceLinkState,
  KnownDeploymentState,
  KnownEnvironmentKind,
  KnownEnvironmentServerType,
  KnownVersions,
} from "./models/index.js";
export type { ApiCenterClientOptionalParams } from "./api/index.js";
export type {
  ApiDefinitionsExportSpecificationOptionalParams,
  ApiDefinitionsImportSpecificationOptionalParams,
  ApiDefinitionsListOptionalParams,
  ApiDefinitionsDeleteOptionalParams,
  ApiDefinitionsCreateOrUpdateOptionalParams,
  ApiDefinitionsHeadOptionalParams,
  ApiDefinitionsGetOptionalParams,
} from "./api/apiDefinitions/index.js";
export type {
  ApisListOptionalParams,
  ApisDeleteOptionalParams,
  ApisCreateOrUpdateOptionalParams,
  ApisHeadOptionalParams,
  ApisGetOptionalParams,
} from "./api/apis/index.js";
export type {
  ApiSourcesListOptionalParams,
  ApiSourcesDeleteOptionalParams,
  ApiSourcesCreateOrUpdateOptionalParams,
  ApiSourcesHeadOptionalParams,
  ApiSourcesGetOptionalParams,
} from "./api/apiSources/index.js";
export type {
  ApiVersionsListOptionalParams,
  ApiVersionsDeleteOptionalParams,
  ApiVersionsCreateOrUpdateOptionalParams,
  ApiVersionsHeadOptionalParams,
  ApiVersionsGetOptionalParams,
} from "./api/apiVersions/index.js";
export type {
  DeletedServicesListBySubscriptionOptionalParams,
  DeletedServicesListOptionalParams,
  DeletedServicesDeleteOptionalParams,
  DeletedServicesGetOptionalParams,
} from "./api/deletedServices/index.js";
export type {
  DeploymentsListOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsHeadOptionalParams,
  DeploymentsGetOptionalParams,
} from "./api/deployments/index.js";
export type {
  EnvironmentsListOptionalParams,
  EnvironmentsDeleteOptionalParams,
  EnvironmentsCreateOrUpdateOptionalParams,
  EnvironmentsHeadOptionalParams,
  EnvironmentsGetOptionalParams,
} from "./api/environments/index.js";
export type {
  MetadataSchemasListOptionalParams,
  MetadataSchemasDeleteOptionalParams,
  MetadataSchemasCreateOrUpdateOptionalParams,
  MetadataSchemasHeadOptionalParams,
  MetadataSchemasGetOptionalParams,
} from "./api/metadataSchemas/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ServicesExportMetadataSchemaOptionalParams,
  ServicesListBySubscriptionOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./api/services/index.js";
export type {
  WorkspacesListOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesHeadOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
  ApiDefinitionsOperations,
  ApisOperations,
  ApiSourcesOperations,
  ApiVersionsOperations,
  DeletedServicesOperations,
  DeploymentsOperations,
  EnvironmentsOperations,
  MetadataSchemasOperations,
  OperationsOperations,
  ServicesOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
