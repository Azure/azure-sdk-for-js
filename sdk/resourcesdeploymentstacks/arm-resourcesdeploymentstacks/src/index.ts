// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DeploymentStacksClient } from "./deploymentStacksClient.js";
export type { SimplePollerLike } from "./static-helpers/simplePollerHelpers.js";
export type { RestorePollerOptions } from "./restorePollerHelpers.js";
export { restorePoller } from "./restorePollerHelpers.js";
export type {
  DeploymentStacksWhatIfResult,
  DeploymentStacksWhatIfResultProperties,
  ErrorDetail,
  ErrorAdditionalInfo,
  DeploymentStacksTemplateLink,
  DeploymentParameter,
  KeyVaultParameterReference,
  KeyVaultReference,
  DeploymentStacksParametersLink,
  DeploymentExtensionConfig,
  DeploymentExtensionConfigItem,
  DeploymentExternalInput,
  DeploymentExternalInputDefinition,
  ActionOnUnmanage,
  UnmanageActionResourceMode,
  UnmanageActionResourceGroupMode,
  UnmanageActionManagementGroupMode,
  ResourcesWithoutDeleteSupportAction,
  DeploymentStacksDebugSetting,
  DenySettings,
  DenySettingsMode,
  DeploymentStackProvisioningState,
  ValidationLevel,
  DeploymentStacksWhatIfChange,
  DeploymentStacksWhatIfResourceChange,
  DeploymentExtension,
  DeploymentStacksWhatIfChangeType,
  DeploymentStacksWhatIfChangeCertainty,
  DeploymentStacksChangeBaseDeploymentStacksManagementStatus,
  DeploymentStacksManagementStatus,
  DeploymentStacksChangeBaseDenyStatusMode,
  DenyStatusMode,
  DeploymentStacksChangeDeltaRecord,
  DeploymentStacksWhatIfPropertyChange,
  DeploymentStacksWhatIfPropertyChangeType,
  DeploymentStacksChangeDeltaDenySettings,
  DeploymentStacksChangeBase,
  DeploymentStacksDiagnostic,
  DeploymentStacksDiagnosticLevel,
  ProxyResource,
  Resource,
  SystemData,
  CreatedByType,
  ErrorResponse,
  DeploymentStack,
  DeploymentStackProperties,
  ResourceReference,
  ResourceReferenceExtended,
  ManagedResourceReference,
  ResourceStatusMode,
  DeploymentStackValidateResult,
  DeploymentStackValidateProperties,
  DeploymentStackTemplateDefinition,
} from "./models/index.js";
export {
  KnownUnmanageActionResourceMode,
  KnownUnmanageActionResourceGroupMode,
  KnownUnmanageActionManagementGroupMode,
  KnownResourcesWithoutDeleteSupportAction,
  KnownDenySettingsMode,
  KnownDeploymentStackProvisioningState,
  KnownValidationLevel,
  KnownDeploymentStacksWhatIfChangeType,
  KnownDeploymentStacksWhatIfChangeCertainty,
  KnownDeploymentStacksManagementStatus,
  KnownDenyStatusMode,
  KnownDeploymentStacksWhatIfPropertyChangeType,
  KnownDeploymentStacksDiagnosticLevel,
  KnownCreatedByType,
  KnownResourceStatusMode,
  KnownVersions,
} from "./models/index.js";
export type { DeploymentStacksClientOptionalParams } from "./api/index.js";
export type {
  DeploymentStacksExportTemplateAtManagementGroupOptionalParams,
  DeploymentStacksDeleteAtManagementGroupOptionalParams,
  DeploymentStacksCreateOrUpdateAtManagementGroupOptionalParams,
  DeploymentStacksValidateStackAtManagementGroupOptionalParams,
  DeploymentStacksListAtManagementGroupOptionalParams,
  DeploymentStacksGetAtManagementGroupOptionalParams,
  DeploymentStacksExportTemplateAtSubscriptionOptionalParams,
  DeploymentStacksDeleteAtSubscriptionOptionalParams,
  DeploymentStacksCreateOrUpdateAtSubscriptionOptionalParams,
  DeploymentStacksValidateStackAtSubscriptionOptionalParams,
  DeploymentStacksListAtSubscriptionOptionalParams,
  DeploymentStacksGetAtSubscriptionOptionalParams,
  DeploymentStacksExportTemplateAtResourceGroupOptionalParams,
  DeploymentStacksDeleteAtResourceGroupOptionalParams,
  DeploymentStacksCreateOrUpdateAtResourceGroupOptionalParams,
  DeploymentStacksValidateStackAtResourceGroupOptionalParams,
  DeploymentStacksListAtResourceGroupOptionalParams,
  DeploymentStacksGetAtResourceGroupOptionalParams,
} from "./api/deploymentStacks/index.js";
export type {
  DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupListOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupGetOptionalParams,
} from "./api/deploymentStacksWhatIfResultsAtManagementGroup/index.js";
export type {
  DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams,
} from "./api/deploymentStacksWhatIfResultsAtResourceGroup/index.js";
export type {
  DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionListOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionGetOptionalParams,
} from "./api/deploymentStacksWhatIfResultsAtSubscription/index.js";
export type {
  DeploymentStacksOperations,
  DeploymentStacksWhatIfResultsAtManagementGroupOperations,
  DeploymentStacksWhatIfResultsAtResourceGroupOperations,
  DeploymentStacksWhatIfResultsAtSubscriptionOperations,
} from "./classic/index.js";
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
export { RestError, isRestError } from "@azure/core-rest-pipeline";
