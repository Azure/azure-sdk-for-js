// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebPubSubServiceContext,
  WebPubSubServiceClientOptionalParams,
  createWebPubSubService,
} from "./api/index.js";
import {
  addUserToGroup,
  removeUserFromGroup,
  removeUserFromAllGroups,
  sendToUser,
  closeUserConnections,
  userExists,
  grantPermission,
  checkPermission,
  revokePermission,
  addConnectionToGroup,
  removeConnectionFromGroup,
  listConnectionsInGroup,
  sendToGroup,
  closeGroupConnections,
  groupExists,
  removeConnectionFromAllGroups,
  sendToConnection,
  connectionExists,
  closeConnection,
  sendToAll,
  removeConnectionsFromGroups,
  generateClientToken,
  closeAllConnections,
  addConnectionsToGroups,
  getServiceStatus,
} from "./api/operations.js";
import {
  AddUserToGroupOptionalParams,
  RemoveUserFromGroupOptionalParams,
  RemoveUserFromAllGroupsOptionalParams,
  SendToUserOptionalParams,
  CloseUserConnectionsOptionalParams,
  UserExistsOptionalParams,
  GrantPermissionOptionalParams,
  CheckPermissionOptionalParams,
  RevokePermissionOptionalParams,
  AddConnectionToGroupOptionalParams,
  RemoveConnectionFromGroupOptionalParams,
  ListConnectionsInGroupOptionalParams,
  SendToGroupOptionalParams,
  CloseGroupConnectionsOptionalParams,
  GroupExistsOptionalParams,
  RemoveConnectionFromAllGroupsOptionalParams,
  SendToConnectionOptionalParams,
  ConnectionExistsOptionalParams,
  CloseConnectionOptionalParams,
  SendToAllOptionalParams,
  RemoveConnectionsFromGroupsOptionalParams,
  GenerateClientTokenOptionalParams,
  CloseAllConnectionsOptionalParams,
  AddConnectionsToGroupsOptionalParams,
  GetServiceStatusOptionalParams,
} from "./api/options.js";
import {
  AddToGroupsRequest,
  ClientTokenResponse,
  RemoveFromGroupsRequest,
  GroupMember,
  MessageContentType,
  WebPubSubPermission,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { WebPubSubServiceClientOptionalParams } from "./api/webPubSubServiceContext.js";

export class WebPubSubServiceClient {
  private _client: WebPubSubServiceContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** WebPubSubServiceClient */
  constructor(
    endpointParam: string,
    credential: TokenCredential,
    hub: string,
    options: WebPubSubServiceClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createWebPubSubService(endpointParam, credential, hub, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Add a user to the target group. */
  addUserToGroup(
    group: string,
    userId: string,
    options: AddUserToGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return addUserToGroup(this._client, group, userId, options);
  }

  /** Remove a user from the target group. */
  removeUserFromGroup(
    group: string,
    userId: string,
    options: RemoveUserFromGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return removeUserFromGroup(this._client, group, userId, options);
  }

  /** Remove a user from all groups. */
  removeUserFromAllGroups(
    userId: string,
    options: RemoveUserFromAllGroupsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return removeUserFromAllGroups(this._client, userId, options);
  }

  /** Send content inside request body to the specific user. */
  sendToUser(
    userId: string,
    contentType: MessageContentType,
    message: Uint8Array,
    options: SendToUserOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return sendToUser(this._client, userId, contentType, message, options);
  }

  /** Close connections for the specific user. */
  closeUserConnections(
    userId: string,
    options: CloseUserConnectionsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return closeUserConnections(this._client, userId, options);
  }

  /** Check if there are any client connections connected for the given user. */
  userExists(
    userId: string,
    options: UserExistsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return userExists(this._client, userId, options);
  }

  /** Grant permission to the connection. */
  grantPermission(
    permission: WebPubSubPermission,
    connectionId: string,
    options: GrantPermissionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return grantPermission(this._client, permission, connectionId, options);
  }

  /** Check if a connection has permission to the specified action. */
  checkPermission(
    permission: WebPubSubPermission,
    connectionId: string,
    options: CheckPermissionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return checkPermission(this._client, permission, connectionId, options);
  }

  /** Revoke permission for the connection. */
  revokePermission(
    permission: WebPubSubPermission,
    connectionId: string,
    options: RevokePermissionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return revokePermission(this._client, permission, connectionId, options);
  }

  /** Add a connection to the target group. */
  addConnectionToGroup(
    group: string,
    connectionId: string,
    options: AddConnectionToGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return addConnectionToGroup(this._client, group, connectionId, options);
  }

  /** Remove a connection from the target group. */
  removeConnectionFromGroup(
    group: string,
    connectionId: string,
    options: RemoveConnectionFromGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return removeConnectionFromGroup(this._client, group, connectionId, options);
  }

  /** List connections in a group. */
  listConnectionsInGroup(
    group: string,
    options: ListConnectionsInGroupOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<GroupMember> {
    return listConnectionsInGroup(this._client, group, options);
  }

  /** Send content inside request body to a group of connections. */
  sendToGroup(
    group: string,
    contentType: MessageContentType,
    message: Uint8Array,
    options: SendToGroupOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return sendToGroup(this._client, group, contentType, message, options);
  }

  /** Close connections in the specific group. */
  closeGroupConnections(
    group: string,
    options: CloseGroupConnectionsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return closeGroupConnections(this._client, group, options);
  }

  /** Check if there are any client connections inside the given group */
  groupExists(
    group: string,
    options: GroupExistsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return groupExists(this._client, group, options);
  }

  /** Remove a connection from all groups. */
  removeConnectionFromAllGroups(
    connectionId: string,
    options: RemoveConnectionFromAllGroupsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return removeConnectionFromAllGroups(this._client, connectionId, options);
  }

  /** Send content inside request body to the specific connection. */
  sendToConnection(
    connectionId: string,
    contentType: MessageContentType,
    message: Uint8Array,
    options: SendToConnectionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return sendToConnection(this._client, connectionId, contentType, message, options);
  }

  /** Check if the connection with the given connectionId exists. */
  connectionExists(
    connectionId: string,
    options: ConnectionExistsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return connectionExists(this._client, connectionId, options);
  }

  /** Close the client connection. */
  closeConnection(
    connectionId: string,
    options: CloseConnectionOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return closeConnection(this._client, connectionId, options);
  }

  /** Broadcast content inside request body to all the connected client connections. */
  sendToAll(
    contentType: MessageContentType,
    message: Uint8Array,
    options: SendToAllOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return sendToAll(this._client, contentType, message, options);
  }

  /** Remove filtered connections from multiple groups. */
  removeConnectionsFromGroups(
    groupsToRemove: RemoveFromGroupsRequest,
    options: RemoveConnectionsFromGroupsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return removeConnectionsFromGroups(this._client, groupsToRemove, options);
  }

  /** Generate token for the client to connect Azure Web PubSub service. */
  generateClientToken(
    options: GenerateClientTokenOptionalParams = { requestOptions: {} },
  ): Promise<ClientTokenResponse> {
    return generateClientToken(this._client, options);
  }

  /** Close the connections in the hub. */
  closeAllConnections(
    options: CloseAllConnectionsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return closeAllConnections(this._client, options);
  }

  /** Add filtered connections to multiple groups. */
  addConnectionsToGroups(
    groupsToAdd: AddToGroupsRequest,
    options: AddConnectionsToGroupsOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return addConnectionsToGroups(this._client, groupsToAdd, options);
  }

  /** Get service health status. */
  getServiceStatus(
    options: GetServiceStatusOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return getServiceStatus(this._client, options);
  }
}
