// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export {
  createHybridConnectivityManagementAPI,
  HybridConnectivityManagementAPIContext,
  HybridConnectivityManagementAPIOptionalParams,
} from "./hybridConnectivityManagementAPIContext.js";
export {
  SolutionTypesListBySubscriptionOptionalParams,
  SolutionTypesListByResourceGroupOptionalParams,
  SolutionTypesGetOptionalParams,
  InventoryListBySolutionConfigurationOptionalParams,
  InventoryGetOptionalParams,
  SolutionConfigurationsSyncNowOptionalParams,
  SolutionConfigurationsListOptionalParams,
  SolutionConfigurationsDeleteOptionalParams,
  SolutionConfigurationsUpdateOptionalParams,
  SolutionConfigurationsCreateOrUpdateOptionalParams,
  SolutionConfigurationsGetOptionalParams,
  PublicCloudConnectorsTestPermissionsOptionalParams,
  PublicCloudConnectorsListBySubscriptionOptionalParams,
  PublicCloudConnectorsListByResourceGroupOptionalParams,
  PublicCloudConnectorsDeleteOptionalParams,
  PublicCloudConnectorsUpdateOptionalParams,
  PublicCloudConnectorsCreateOrUpdateOptionalParams,
  PublicCloudConnectorsGetOptionalParams,
  GenerateAwsTemplatePostOptionalParams,
  ServiceConfigurationsListByEndpointResourceOptionalParams,
  ServiceConfigurationsDeleteOptionalParams,
  ServiceConfigurationsUpdateOptionalParams,
  ServiceConfigurationsCreateOrupdateOptionalParams,
  ServiceConfigurationsGetOptionalParams,
  EndpointsListManagedProxyDetailsOptionalParams,
  EndpointsListIngressGatewayCredentialsOptionalParams,
  EndpointsListCredentialsOptionalParams,
  EndpointsListOptionalParams,
  EndpointsDeleteOptionalParams,
  EndpointsUpdateOptionalParams,
  EndpointsCreateOrUpdateOptionalParams,
  EndpointsGetOptionalParams,
  OperationsListOptionalParams,
} from "./options.js";
export {
  endpointsListManagedProxyDetails,
  endpointsListIngressGatewayCredentials,
  endpointsListCredentials,
  endpointsList,
  endpointsDelete,
  endpointsUpdate,
  endpointsCreateOrUpdate,
  endpointsGet,
} from "./endpoints/index.js";
export { generateAwsTemplatePost } from "./generateAwsTemplate/index.js";
export { inventoryListBySolutionConfiguration, inventoryGet } from "./inventory/index.js";
export { operationsList } from "./operations/index.js";
export {
  publicCloudConnectorsTestPermissions,
  publicCloudConnectorsListBySubscription,
  publicCloudConnectorsListByResourceGroup,
  publicCloudConnectorsDelete,
  publicCloudConnectorsUpdate,
  publicCloudConnectorsCreateOrUpdate,
  publicCloudConnectorsGet,
} from "./publicCloudConnectors/index.js";
export {
  serviceConfigurationsListByEndpointResource,
  serviceConfigurationsDelete,
  serviceConfigurationsUpdate,
  serviceConfigurationsCreateOrupdate,
  serviceConfigurationsGet,
} from "./serviceConfigurations/index.js";
export {
  solutionConfigurationsSyncNow,
  solutionConfigurationsList,
  solutionConfigurationsDelete,
  solutionConfigurationsUpdate,
  solutionConfigurationsCreateOrUpdate,
  solutionConfigurationsGet,
} from "./solutionConfigurations/index.js";
export {
  solutionTypesListBySubscription,
  solutionTypesListByResourceGroup,
  solutionTypesGet,
} from "./solutionTypes/index.js";
