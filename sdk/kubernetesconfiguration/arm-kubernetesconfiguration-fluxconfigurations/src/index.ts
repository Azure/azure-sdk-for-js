// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { KubernetesConfigurationClient } from "./kubernetesConfigurationClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  FluxConfiguration,
  FluxConfigurationProperties,
  ScopeType,
  SourceKindType,
  GitRepositoryDefinition,
  RepositoryRefDefinition,
  ProviderType,
  BucketDefinition,
  AzureBlobDefinition,
  ServicePrincipalDefinition,
  ManagedIdentityDefinition,
  OCIRepositoryDefinition,
  OCIRepositoryRefDefinition,
  LayerSelectorDefinition,
  OperationType,
  VerifyDefinition,
  MatchOidcIdentityDefinition,
  TlsConfigDefinition,
  KustomizationDefinition,
  PostBuildDefinition,
  SubstituteFromDefinition,
  ObjectStatusDefinition,
  FluxComplianceState,
  ObjectReferenceDefinition,
  ObjectStatusConditionDefinition,
  HelmReleasePropertiesDefinition,
  ProvisioningState,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  FluxConfigurationPatch,
  FluxConfigurationPatchProperties,
  GitRepositoryPatchDefinition,
  BucketPatchDefinition,
  AzureBlobPatchDefinition,
  ServicePrincipalPatchDefinition,
  ManagedIdentityPatchDefinition,
  OCIRepositoryPatchDefinition,
  OCIRepositoryRefPatchDefinition,
  LayerSelectorPatchDefinition,
  VerifyPatchDefinition,
  MatchOidcIdentityPatchDefinition,
  TlsConfigPatchDefinition,
  KustomizationPatchDefinition,
  PostBuildPatchDefinition,
  SubstituteFromPatchDefinition,
  OperationStatusResult,
} from "./models/index.js";
export {
  KnownScopeType,
  KnownSourceKindType,
  KnownProviderType,
  KnownOperationType,
  KnownFluxComplianceState,
  KnownProvisioningState,
  KnownCreatedByType,
  KnownVersions,
} from "./models/index.js";
export type { KubernetesConfigurationClientOptionalParams } from "./api/index.js";
export type { FluxConfigOperationStatusGetOptionalParams } from "./api/fluxConfigOperationStatus/index.js";
export type {
  FluxConfigurationsListOptionalParams,
  FluxConfigurationsDeleteOptionalParams,
  FluxConfigurationsUpdateOptionalParams,
  FluxConfigurationsCreateOrUpdateOptionalParams,
  FluxConfigurationsGetOptionalParams,
} from "./api/fluxConfigurations/index.js";
export type {
  FluxConfigOperationStatusOperations,
  FluxConfigurationsOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
