// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureSupportedClouds } from "./static-helpers/cloudSettingHelpers.js";
import { AzureClouds } from "./static-helpers/cloudSettingHelpers.js";
import type {
  PageSettings,
  ContinuablePage,
  PagedAsyncIterableIterator,
} from "./static-helpers/pagingHelpers.js";

export { DiscoveryClient } from "./discoveryClient.js";
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
  Bookshelf,
  BookshelfProperties,
  ProvisioningState,
  UserAssignedIdentity,
  CustomerManagedKeys,
  BookshelfKeyVaultProperties,
  PrivateEndpointConnection,
  PrivateEndpointConnectionProperties,
  PrivateEndpoint,
  PrivateLinkServiceConnectionState,
  PrivateEndpointServiceConnectionStatus,
  PrivateEndpointConnectionProvisioningState,
  PublicNetworkAccess,
  WithMoboBrokerResources,
  MoboBrokerResource,
  Resource,
  SystemData,
  CreatedByType,
  TrackedResource,
  BookshelfUpdate,
  BookshelfUpdateProperties,
  BookshelfKeyVaultUpdateProperties,
  BookshelfPrivateEndpointConnection,
  ProxyResource,
  BookshelfPrivateLinkResource,
  PrivateLinkResourceProperties,
  Tool,
  ToolProperties,
  ToolUpdate,
  ToolUpdateProperties,
  Project,
  ProjectProperties,
  ProjectSettings,
  ProjectUpdate,
  ProjectUpdateProperties,
  Workspace,
  WorkspaceProperties,
  Identity,
  KeyVaultProperties,
  WorkspaceUpdate,
  WorkspaceUpdateProperties,
  KeyVaultUpdateProperties,
  WorkspacePrivateEndpointConnection,
  ChatModelDeployment,
  ChatModelDeploymentProperties,
  ChatModelDeploymentUpdate,
  WorkspacePrivateLinkResource,
  NodePool,
  NodePoolProperties,
  VmSize,
  ScaleSetPriority,
  NodePoolUpdate,
  NodePoolUpdateProperties,
  Supercomputer,
  SupercomputerProperties,
  NetworkEgressType,
  SystemSku,
  SupercomputerIdentities,
  SupercomputerUpdate,
  SupercomputerUpdateProperties,
  SupercomputerIdentitiesUpdate,
  StorageAsset,
  StorageAssetProperties,
  StorageAssetUpdate,
  StorageAssetUpdateProperties,
  StorageContainer,
  StorageContainerProperties,
  StorageStore,
  StorageStoreUnion,
  StorageStoreType,
  AzureStorageBlobStore,
  AzureNetAppFilesStore,
  StorageContainerUpdate,
} from "./models/index.js";
export {
  KnownOrigin,
  KnownActionType,
  KnownProvisioningState,
  KnownCustomerManagedKeys,
  KnownPrivateEndpointServiceConnectionStatus,
  KnownPrivateEndpointConnectionProvisioningState,
  KnownPublicNetworkAccess,
  KnownCreatedByType,
  KnownVmSize,
  KnownScaleSetPriority,
  KnownNetworkEgressType,
  KnownSystemSku,
  KnownStorageStoreType,
  KnownVersions,
} from "./models/index.js";
export type { DiscoveryClientOptionalParams } from "./api/index.js";
export type {
  BookshelfPrivateEndpointConnectionsListByBookshelfOptionalParams,
  BookshelfPrivateEndpointConnectionsDeleteOptionalParams,
  BookshelfPrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  BookshelfPrivateEndpointConnectionsGetOptionalParams,
} from "./api/bookshelfPrivateEndpointConnections/index.js";
export type {
  BookshelfPrivateLinkResourcesListByBookshelfOptionalParams,
  BookshelfPrivateLinkResourcesGetOptionalParams,
} from "./api/bookshelfPrivateLinkResources/index.js";
export type {
  BookshelvesListBySubscriptionOptionalParams,
  BookshelvesListByResourceGroupOptionalParams,
  BookshelvesDeleteOptionalParams,
  BookshelvesUpdateOptionalParams,
  BookshelvesCreateOrUpdateOptionalParams,
  BookshelvesGetOptionalParams,
} from "./api/bookshelves/index.js";
export type {
  ChatModelDeploymentsListByWorkspaceOptionalParams,
  ChatModelDeploymentsDeleteOptionalParams,
  ChatModelDeploymentsUpdateOptionalParams,
  ChatModelDeploymentsCreateOrUpdateOptionalParams,
  ChatModelDeploymentsGetOptionalParams,
} from "./api/chatModelDeployments/index.js";
export type {
  NodePoolsListBySupercomputerOptionalParams,
  NodePoolsDeleteOptionalParams,
  NodePoolsUpdateOptionalParams,
  NodePoolsCreateOrUpdateOptionalParams,
  NodePoolsGetOptionalParams,
} from "./api/nodePools/index.js";
export type { OperationsListOptionalParams } from "./api/operations/index.js";
export type {
  ProjectsListByWorkspaceOptionalParams,
  ProjectsDeleteOptionalParams,
  ProjectsUpdateOptionalParams,
  ProjectsCreateOrUpdateOptionalParams,
  ProjectsGetOptionalParams,
} from "./api/projects/index.js";
export type {
  StorageAssetsListByStorageContainerOptionalParams,
  StorageAssetsDeleteOptionalParams,
  StorageAssetsUpdateOptionalParams,
  StorageAssetsCreateOrUpdateOptionalParams,
  StorageAssetsGetOptionalParams,
} from "./api/storageAssets/index.js";
export type {
  StorageContainersListBySubscriptionOptionalParams,
  StorageContainersListByResourceGroupOptionalParams,
  StorageContainersDeleteOptionalParams,
  StorageContainersUpdateOptionalParams,
  StorageContainersCreateOrUpdateOptionalParams,
  StorageContainersGetOptionalParams,
} from "./api/storageContainers/index.js";
export type {
  SupercomputersListBySubscriptionOptionalParams,
  SupercomputersListByResourceGroupOptionalParams,
  SupercomputersDeleteOptionalParams,
  SupercomputersUpdateOptionalParams,
  SupercomputersCreateOrUpdateOptionalParams,
  SupercomputersGetOptionalParams,
} from "./api/supercomputers/index.js";
export type {
  ToolsListBySubscriptionOptionalParams,
  ToolsListByResourceGroupOptionalParams,
  ToolsDeleteOptionalParams,
  ToolsUpdateOptionalParams,
  ToolsCreateOrUpdateOptionalParams,
  ToolsGetOptionalParams,
} from "./api/tools/index.js";
export type {
  WorkspacePrivateEndpointConnectionsListByWorkspaceOptionalParams,
  WorkspacePrivateEndpointConnectionsDeleteOptionalParams,
  WorkspacePrivateEndpointConnectionsCreateOrUpdateOptionalParams,
  WorkspacePrivateEndpointConnectionsGetOptionalParams,
} from "./api/workspacePrivateEndpointConnections/index.js";
export type {
  WorkspacePrivateLinkResourcesListByWorkspaceOptionalParams,
  WorkspacePrivateLinkResourcesGetOptionalParams,
} from "./api/workspacePrivateLinkResources/index.js";
export type {
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesDeleteOptionalParams,
  WorkspacesUpdateOptionalParams,
  WorkspacesCreateOrUpdateOptionalParams,
  WorkspacesGetOptionalParams,
} from "./api/workspaces/index.js";
export type {
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
export type { PageSettings, ContinuablePage, PagedAsyncIterableIterator };
export { AzureClouds };
export type { AzureSupportedClouds };
