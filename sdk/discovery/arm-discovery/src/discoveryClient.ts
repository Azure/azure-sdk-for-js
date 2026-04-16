// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DiscoveryContext, DiscoveryClientOptionalParams } from "./api/index.js";
import { createDiscovery } from "./api/index.js";
import type { BookshelfPrivateEndpointConnectionsOperations } from "./classic/bookshelfPrivateEndpointConnections/index.js";
import { _getBookshelfPrivateEndpointConnectionsOperations } from "./classic/bookshelfPrivateEndpointConnections/index.js";
import type { BookshelfPrivateLinkResourcesOperations } from "./classic/bookshelfPrivateLinkResources/index.js";
import { _getBookshelfPrivateLinkResourcesOperations } from "./classic/bookshelfPrivateLinkResources/index.js";
import type { BookshelvesOperations } from "./classic/bookshelves/index.js";
import { _getBookshelvesOperations } from "./classic/bookshelves/index.js";
import type { ChatModelDeploymentsOperations } from "./classic/chatModelDeployments/index.js";
import { _getChatModelDeploymentsOperations } from "./classic/chatModelDeployments/index.js";
import type { NodePoolsOperations } from "./classic/nodePools/index.js";
import { _getNodePoolsOperations } from "./classic/nodePools/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { ProjectsOperations } from "./classic/projects/index.js";
import { _getProjectsOperations } from "./classic/projects/index.js";
import type { StorageAssetsOperations } from "./classic/storageAssets/index.js";
import { _getStorageAssetsOperations } from "./classic/storageAssets/index.js";
import type { StorageContainersOperations } from "./classic/storageContainers/index.js";
import { _getStorageContainersOperations } from "./classic/storageContainers/index.js";
import type { SupercomputersOperations } from "./classic/supercomputers/index.js";
import { _getSupercomputersOperations } from "./classic/supercomputers/index.js";
import type { ToolsOperations } from "./classic/tools/index.js";
import { _getToolsOperations } from "./classic/tools/index.js";
import type { WorkspacePrivateEndpointConnectionsOperations } from "./classic/workspacePrivateEndpointConnections/index.js";
import { _getWorkspacePrivateEndpointConnectionsOperations } from "./classic/workspacePrivateEndpointConnections/index.js";
import type { WorkspacePrivateLinkResourcesOperations } from "./classic/workspacePrivateLinkResources/index.js";
import { _getWorkspacePrivateLinkResourcesOperations } from "./classic/workspacePrivateLinkResources/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { DiscoveryClientOptionalParams } from "./api/discoveryContext.js";

export class DiscoveryClient {
  private _client: DiscoveryContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.Discovery Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DiscoveryClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDiscovery(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.storageContainers = _getStorageContainersOperations(this._client);
    this.storageAssets = _getStorageAssetsOperations(this._client);
    this.supercomputers = _getSupercomputersOperations(this._client);
    this.nodePools = _getNodePoolsOperations(this._client);
    this.workspacePrivateLinkResources = _getWorkspacePrivateLinkResourcesOperations(this._client);
    this.chatModelDeployments = _getChatModelDeploymentsOperations(this._client);
    this.workspacePrivateEndpointConnections = _getWorkspacePrivateEndpointConnectionsOperations(
      this._client,
    );
    this.workspaces = _getWorkspacesOperations(this._client);
    this.projects = _getProjectsOperations(this._client);
    this.tools = _getToolsOperations(this._client);
    this.bookshelfPrivateLinkResources = _getBookshelfPrivateLinkResourcesOperations(this._client);
    this.bookshelfPrivateEndpointConnections = _getBookshelfPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.bookshelves = _getBookshelvesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for storageContainers */
  public readonly storageContainers: StorageContainersOperations;
  /** The operation groups for storageAssets */
  public readonly storageAssets: StorageAssetsOperations;
  /** The operation groups for supercomputers */
  public readonly supercomputers: SupercomputersOperations;
  /** The operation groups for nodePools */
  public readonly nodePools: NodePoolsOperations;
  /** The operation groups for workspacePrivateLinkResources */
  public readonly workspacePrivateLinkResources: WorkspacePrivateLinkResourcesOperations;
  /** The operation groups for chatModelDeployments */
  public readonly chatModelDeployments: ChatModelDeploymentsOperations;
  /** The operation groups for workspacePrivateEndpointConnections */
  public readonly workspacePrivateEndpointConnections: WorkspacePrivateEndpointConnectionsOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for projects */
  public readonly projects: ProjectsOperations;
  /** The operation groups for tools */
  public readonly tools: ToolsOperations;
  /** The operation groups for bookshelfPrivateLinkResources */
  public readonly bookshelfPrivateLinkResources: BookshelfPrivateLinkResourcesOperations;
  /** The operation groups for bookshelfPrivateEndpointConnections */
  public readonly bookshelfPrivateEndpointConnections: BookshelfPrivateEndpointConnectionsOperations;
  /** The operation groups for bookshelves */
  public readonly bookshelves: BookshelvesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
