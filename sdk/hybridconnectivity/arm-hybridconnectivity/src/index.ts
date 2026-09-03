// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { HybridConnectivityManagementAPI } from "./hybridConnectivityManagementAPI.js";
export { restorePoller, type RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  type Operation,
  type OperationDisplay,
  KnownOrigin,
  type Origin,
  KnownActionType,
  type ActionType,
  type ErrorResponse,
  type ErrorDetail,
  type ErrorAdditionalInfo,
  type EndpointResource,
  type EndpointProperties,
  KnownType,
  type Type,
  type ExtensionResource,
  type Resource,
  type SystemData,
  KnownCreatedByType,
  type CreatedByType,
  type ListCredentialsRequest,
  KnownServiceName,
  type ServiceName,
  type EndpointAccessResource,
  type RelayNamespaceAccessProperties,
  type ListIngressGatewayCredentialsRequest,
  type IngressGatewayResource,
  type IngressProfileProperties,
  type AADProfileProperties,
  type ManagedProxyRequest,
  type ManagedProxyResource,
  type ServiceConfigurationResource,
  type ServiceConfigurationProperties,
  KnownProvisioningState,
  type ProvisioningState,
  type ServiceConfigurationResourcePatch,
  type ServiceConfigurationPropertiesPatch,
  type GenerateAwsTemplateRequest,
  type SolutionTypeSettings,
  type SolutionSettings,
  type GenerateAwsTemplateResponse,
  type PublicCloudConnector,
  type PublicCloudConnectorProperties,
  type AwsCloudProfile,
  KnownHostType,
  type HostType,
  KnownResourceProvisioningState,
  type ResourceProvisioningState,
  type TrackedResource,
  type PublicCloudConnectorUpdate,
  type PublicCloudConnectorPropertiesUpdate,
  type AwsCloudProfileUpdate,
  type TrackedResourceUpdate,
  type OperationStatusResult,
  type SolutionConfiguration,
  type SolutionConfigurationProperties,
  KnownSolutionConfigurationStatus,
  type SolutionConfigurationStatus,
  type SolutionConfigurationUpdate,
  type SolutionConfigurationPropertiesUpdate,
  type ProxyResource,
  type InventoryResource,
  type InventoryProperties,
  KnownCloudNativeType,
  type CloudNativeType,
  type SolutionTypeResource,
  type SolutionTypeProperties,
  type SolutionTypeSettingsProperties,
  KnownVersions,
} from "./models/index.js";
export { type HybridConnectivityManagementAPIOptionalParams } from "./api/index.js";
export {
  type EndpointsListManagedProxyDetailsOptionalParams,
  type EndpointsListIngressGatewayCredentialsOptionalParams,
  type EndpointsListCredentialsOptionalParams,
  type EndpointsListOptionalParams,
  type EndpointsDeleteOptionalParams,
  type EndpointsUpdateOptionalParams,
  type EndpointsCreateOrUpdateOptionalParams,
  type EndpointsGetOptionalParams,
} from "./api/endpoints/index.js";
export { type GenerateAwsTemplatePostOptionalParams } from "./api/generateAwsTemplate/index.js";
export {
  type InventoryListBySolutionConfigurationOptionalParams,
  type InventoryGetOptionalParams,
} from "./api/inventory/index.js";
export { type OperationsListOptionalParams } from "./api/operations/index.js";
export {
  type PublicCloudConnectorsTestPermissionsOptionalParams,
  type PublicCloudConnectorsListBySubscriptionOptionalParams,
  type PublicCloudConnectorsListByResourceGroupOptionalParams,
  type PublicCloudConnectorsDeleteOptionalParams,
  type PublicCloudConnectorsUpdateOptionalParams,
  type PublicCloudConnectorsCreateOrUpdateOptionalParams,
  type PublicCloudConnectorsGetOptionalParams,
} from "./api/publicCloudConnectors/index.js";
export {
  type ServiceConfigurationsListByEndpointResourceOptionalParams,
  type ServiceConfigurationsDeleteOptionalParams,
  type ServiceConfigurationsUpdateOptionalParams,
  type ServiceConfigurationsCreateOrupdateOptionalParams,
  type ServiceConfigurationsGetOptionalParams,
} from "./api/serviceConfigurations/index.js";
export {
  type SolutionConfigurationsSyncNowOptionalParams,
  type SolutionConfigurationsListOptionalParams,
  type SolutionConfigurationsDeleteOptionalParams,
  type SolutionConfigurationsUpdateOptionalParams,
  type SolutionConfigurationsCreateOrUpdateOptionalParams,
  type SolutionConfigurationsGetOptionalParams,
} from "./api/solutionConfigurations/index.js";
export {
  type SolutionTypesListBySubscriptionOptionalParams,
  type SolutionTypesListByResourceGroupOptionalParams,
  type SolutionTypesGetOptionalParams,
} from "./api/solutionTypes/index.js";
export {
  type EndpointsOperations,
  type GenerateAwsTemplateOperations,
  type InventoryOperations,
  type OperationsOperations,
  type PublicCloudConnectorsOperations,
  type ServiceConfigurationsOperations,
  type SolutionConfigurationsOperations,
  type SolutionTypesOperations,
} from "./classic/index.js";
export { type PageSettings, type ContinuablePage, type PagedAsyncIterableIterator };
export { AzureClouds, type AzureSupportedClouds };
