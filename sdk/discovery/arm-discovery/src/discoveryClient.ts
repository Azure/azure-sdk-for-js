// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createDiscovery, DiscoveryContext, DiscoveryClientOptionalParams } from "./api/index.js";
import {
  BookshelfPrivateEndpointConnectionsOperations,
  _getBookshelfPrivateEndpointConnectionsOperations,
} from "./classic/bookshelfPrivateEndpointConnections/index.js";
import {
  BookshelfPrivateLinkResourcesOperations,
  _getBookshelfPrivateLinkResourcesOperations,
} from "./classic/bookshelfPrivateLinkResources/index.js";
import { BookshelvesOperations, _getBookshelvesOperations } from "./classic/bookshelves/index.js";
import {
  ChatModelDeploymentsOperations,
  _getChatModelDeploymentsOperations,
} from "./classic/chatModelDeployments/index.js";
import { NodePoolsOperations, _getNodePoolsOperations } from "./classic/nodePools/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { ProjectsOperations, _getProjectsOperations } from "./classic/projects/index.js";
import {
  StorageAssetsOperations,
  _getStorageAssetsOperations,
} from "./classic/storageAssets/index.js";
import {
  StorageContainersOperations,
  _getStorageContainersOperations,
} from "./classic/storageContainers/index.js";
import {
  SupercomputersOperations,
  _getSupercomputersOperations,
} from "./classic/supercomputers/index.js";
import { ToolsOperations, _getToolsOperations } from "./classic/tools/index.js";
import {
  WorkspacePrivateEndpointConnectionsOperations,
  _getWorkspacePrivateEndpointConnectionsOperations,
} from "./classic/workspacePrivateEndpointConnections/index.js";
import {
  WorkspacePrivateLinkResourcesOperations,
  _getWorkspacePrivateLinkResourcesOperations,
} from "./classic/workspacePrivateLinkResources/index.js";
import { WorkspacesOperations, _getWorkspacesOperations } from "./classic/workspaces/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { DiscoveryClientOptionalParams } from "./api/discoveryContext.js";

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
