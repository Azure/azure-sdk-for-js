// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureClouds, AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DiscoveryClient } from "./discoveryClient.js";
export { restorePoller, RestorePollerOptions } from "./restorePollerHelpers.js";
export {
  Operation,
  OperationDisplay,
  KnownOrigin,
  Origin,
  KnownActionType,
  ActionType,
  ErrorResponse,
  ErrorDetail,
  ErrorAdditionalInfo,
  Bookshelf,
  BookshelfProperties,
  KnownProvisioningState,
  ProvisioningState,
  UserAssignedIdentity,
  KnownCustomerManagedKeys,
  CustomerManagedKeys,
  BookshelfKeyVaultProperties,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  KnownPrivateEndpointServiceConnectionStatus,
  PrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  PrivateEndpointConnectionProvisioningState,
  KnownPublicNetworkAccess,
  PublicNetworkAccess,
  WithMoboBrokerResources,
  MoboBrokerResource,
  Resource,
  SystemData,
  KnownCreatedByType,
  CreatedByType,
  TrackedResource,
  BookshelfPrivateEndpointConnection,
  ProxyResource,
  BookshelfPrivateLinkResource,
  PrivateLinkResourceProperties,
  Tool,
  ToolProperties,
  Project,
  ProjectProperties,
  ProjectSettings,
  Workspace,
  WorkspaceProperties,
  Identity,
  KeyVaultProperties,
  WorkspacePrivateEndpointConnection,
  ChatModelDeployment,
  ChatModelDeploymentProperties,
  WorkspacePrivateLinkResource,
  NodePool,
  NodePoolProperties,
  KnownVmSize,
  VmSize,
  KnownScaleSetPriority,
  ScaleSetPriority,
  Supercomputer,
  SupercomputerProperties,
  KnownNetworkEgressType,
  NetworkEgressType,
  KnownSystemSku,
  SystemSku,
  SupercomputerIdentities,
  StorageAsset,
  StorageAssetProperties,
  StorageContainer,
  StorageContainerProperties,
  StorageStore,
  StorageStoreUnion,
  KnownStorageStoreType,
  StorageStoreType,
  AzureStorageBlobStore,
  AzureNetAppFilesStore,
  KnownVersions,
} from "./models/index.js";
export { DiscoveryClientOptionalParams } from "./api/index.js";
export {
  BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams,
  BookshelfPrivateEndpointConnectionsDeleteOptionalParams,
  BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  BookshelfPrivateEndpointConnectionsGetOptionalParams,
} from "./api/bookshelfPrivateEndpointConnections/index.js";
export {
  BookshelfPrivateLinkResourcesListByBookshelfOptionalParams,
  BookshelfPrivateLinkResourcesGetOptionalParams,
} from "./api/bookshelfPrivateLinkResources/index.js";
export {
  BookshelvesListBySubscriptionOptionalParams,
  BookshelvesListByResourceGroupOptionalParams,
  BookshelvesDeleteOptionalParams,
  BookshelvesUpdateOptionalParams,
  BookshelvesCreateOrUpdateOptionalParams,
  BookshelvesGetOptionalParams,
} from "./api/bookshelves/index.js";
export {
  ChatModelDeploymentsListByWorkspaceOptionalParams,
  ChatModelDeploymentsDeleteOptionalParams,
  ChatModelDeploymentsUpdateOptionalParams,
  ChatModelDeploymentsCreateOrUpdateOptionalParams,
  ChatModelDeploymentsGetOptionalParams,
} from "./api/chatModelDeployments/index.js";
export {
  NodePoolsListBySupercomputerOptionalParams,
  NodePoolsDeleteOptionalParams,
  NodePoolsUpdateOptionalParams,
  NodePoolsCreateOrUpdateOptionalParams,
  NodePoolsGetOptionalParams,
} from "./api/nodePools/index.js";
export { OperationsListOptionalParams } from "./api/operations/index.js";
export {
  ProjectsListByWorkspaceOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./api/projects/index.js";
export {
  StorageAssetsListByStorageContainerOptionalParams,
  StorageAssetsDeleteOptionalParams,
  StorageAssetsUpdateOptionalParams,
  StorageAssetsCreateOrUpdateOptionalParams,
  StorageAssetsGetOptionalParams,
} from "./api/storageAssets/index.js";
export {
  StorageContainersListBySubscriptionOptionalParams,
  StorageContainersListByResourceGroupOptionalParams,
  StorageContainersDeleteOptionalParams,
  StorageContainersUpdateOptionalParams,
  StorageContainersCreateOrUpdateOptionalParams,
  StorageContainersGetOptionalParams,
} from "./api/storageContainers/index.js";
export {
  SupercomputersListBySubscriptionOptionalParams,
  SupercomputersListByResourceGroupOptionalParams,
  SupercomputersDeleteOptionalParams,
  SupercomputersUpdateOptionalParams,
  SupercomputersCreateOrUpdateOptionalParams,
  SupercomputersGetOptionalParams,
} from "./api/supercomputers/index.js";
export {
  ToolsListBySubscriptionOptionalParams,
  ToolsListByResourceGroupOptionalParams,
  ToolsDeleteOptionalParams,
  ToolsUpdateOptionalParams,
  ToolsCreateOrUpdateOptionalParams,
  ToolsGetOptionalParams,
} from "./api/tools/index.js";
export {
  WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  WorkspacePrivateEndpointConnectionsGetOptionalParams,
} from "./api/workspacePrivateEndpointConnections/index.js";
export {
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
} from "./api/workspacePrivateLinkResources/index.js";
export {
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export {
  BookshelfPrivateEndpointConnectionsOperations,
  BookshelfPrivateLinkResourcesOperations,
  BookshelvesOperations,
  ChatModelDeploymentsOperations,
  NodePoolsOperations,
  OperationsOperations,
  ProjectsOperations,
  StorageAssetsOperations,
  StorageContainersOperations,
  SupercomputersOperations,
  ToolsOperations,
  WorkspacePrivateEndpointConnectionsOperations,
  WorkspacePrivateLinkResourcesOperations,
  WorkspacesOperations,
} from "./classic/index.js";
export { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds, AzureSupportedClouds };
