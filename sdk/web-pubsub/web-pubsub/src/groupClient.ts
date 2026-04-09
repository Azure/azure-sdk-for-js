// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions, OperationOptions } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type { RequestBodyType } from "@azure/core-rest-pipeline";
import { RestError } from "@azure/core-rest-pipeline";
import type { WebPubSubServiceContext } from "./api/webPubSubServiceContext.js";
import { tracingClient } from "./tracing.js";
import { getPayloadForMessage, toByteArrayPayload } from "./utils.js";
import type { JSONTypes } from "./hubClient.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { MessageContentType } from "./models/models.js";
import {
  removeConnectionFromGroup as generatedRemoveConnectionFromGroup,
  closeGroupConnections as generatedCloseGroupConnections,
  addUserToGroup as generatedAddUserToGroup,
  removeUserFromGroup as generatedRemoveUserFromGroup,
  sendToGroup as generatedSendToGroup,
  listConnectionsInGroup as generatedListConnectionsInGroup,
  _addConnectionToGroupSend,
} from "./api/operations.js";

/**
 * Options for constructing a GroupAdmin client.
 */
export interface GroupAdminClientOptions extends ClientOptions {}

/**
 * Options for adding a connection to a group.
 */
export interface GroupAddConnectionOptions extends OperationOptions {}

/**
 * Options for adding a user to a group.
 */
export interface GroupAddUserOptions extends OperationOptions {}

/**
 * Options for checking if a user is in a group
 */
export interface GroupHasUserOptions extends OperationOptions {}

/**
 * Options for removing a user from a group
 */
export interface GroupRemoveUserOptions extends OperationOptions {}

/**
 * Options for removing a connection from a group
 */
export interface GroupRemoveConnectionOptions extends OperationOptions {}

/**
 * Options for sending messages to a group.
 */
export interface GroupSendToAllOptions extends OperationOptions {
  /**
   * Connection ids to exclude from receiving this message.
   */
  excludedConnections?: string[];
  /**
   * The filter syntax to filter out the connections to send the messages to following OData filter syntax.
   * Examples:
   *  * Exclude connections from `user1` and `user2`: `userId ne 'user1' and userId ne 'user2'`
   *  * Exclude connections in `group1`: `not('group1' in groups)`
   * Details about `filter` syntax please see [OData filter syntax for Azure Web PubSub](https://aka.ms/awps/filter-syntax).
   */
  filter?: string;
  /**
   * The time-to-live (TTL) value in seconds for messages sent to the service.
   * 0 is the default value, which means the message never expires.
   * 300 is the maximum value.
   * If this parameter is non-zero, messages that are not consumed by the client within the specified TTL will be dropped by the service.
   * This parameter can help when the client's bandwidth is limited.
   */
  messageTtlSeconds?: number;
}

/**
 * Options for sending text messages to a group..
 */
export interface GroupSendTextToAllOptions extends GroupSendToAllOptions {
  /**
   * The content will be sent to the clients in plain text.
   */
  contentType: "text/plain";
}

/**
 * Options for closing all connections to a group.
 */
export interface GroupCloseAllConnectionsOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * A connection in a group in the Web PubSub service.
 */
export interface WebPubSubGroupMember {
  /** A unique identifier of a connection. */
  connectionId: string;
  /** The user ID of the connection. A user can have multiple connections. */
  userId?: string;
}

/** Options for listing connections in a group. */
export interface GroupListConnectionsOptions extends OperationOptions {
  /** The maximum number of connections to include in a single response. It should be between 1 and 200. */
  maxPageSize?: number;
  /** The maximum number of connections to return. If the value is not set, then all the connections in a group are returned. */
  top?: number;
  /** A token that allows the client to retrieve the next page of results. This parameter is provided by the service in the response of a previous request when there are additional results to be fetched. Clients should include the continuationToken in the next request to receive the subsequent page of data. If this parameter is omitted, the server will return the first page of results. */
  continuationToken?: string;
}

/**
 * Represents a group in the Web PubSub service.
 */
export interface WebPubSubGroup {
  /**
   * The name of this group
   */
  readonly groupName: string;

  /**
   * The name of the hub this group belongs to
   */
  readonly hubName: string;

  /**
   * The Web PubSub API version being used by this client
   */
  readonly apiVersion: string;

  /**
   * The Web PubSub endpoint this client is connected to
   */
  readonly endpoint: string;

  /**
   * Add a specific connection to this group
   *
   * @param connectionId - The connection id to add to this group
   * @param options - Additional options
   */
  addConnection(connectionId: string, options?: GroupAddConnectionOptions): Promise<void>;

  /**
   * Remove a specific connection from this group
   *
   * @param connectionId - The connection id to remove from this group
   * @param options - Additional options
   */
  removeConnection(connectionId: string, options?: GroupRemoveConnectionOptions): Promise<void>;

  /**
   * Close all connections to the group
   *
   * @param options - Additional options
   */
  closeAllConnections(options?: GroupCloseAllConnectionsOptions): Promise<void>;

  /**
   * Add a user to this group
   *
   * @param username - The user name to add
   * @param options - Additional options
   */
  addUser(username: string, options?: GroupAddUserOptions): Promise<void>;

  /**
   * Remove a user from this group
   *
   * @param username - The user name to remove
   * @param options - Additional options
   */
  removeUser(username: string, options?: GroupRemoveUserOptions): Promise<void>;

  /**
   * Send a text message to every connection in this group
   *
   * @param message - The message to send
   * @param options - Additional options
   */
  sendToAll(message: string, options: GroupSendTextToAllOptions): Promise<void>;
  /**
   * Send a json message to every connection in this group
   *
   * @param message - The message to send
   * @param options - Additional options
   */
  sendToAll(message: JSONTypes, options?: GroupSendToAllOptions): Promise<void>;
  /**
   * Send a binary message to every connection in this group
   *
   * @param message - The binary message to send
   * @param options - Additional options
   */
  sendToAll(message: RequestBodyType, options?: GroupSendToAllOptions): Promise<void>;

  /**
   * List connections in this group
   *
   * @param options - Additional options for listing connections
   */
  listConnections(
    options?: GroupListConnectionsOptions,
  ): Promise<PagedAsyncIterableIterator<WebPubSubGroupMember>>;
}

/**
 * @hidden
 */
export class WebPubSubGroupImpl implements WebPubSubGroup {
  private client!: WebPubSubServiceContext;

  /**
   * The name of this group
   */
  public readonly groupName: string;

  /**
   * The name of the hub this group belongs to
   */
  public readonly hubName: string;

  /**
   * The Web PubSub API version being used by this client
   */
  public readonly apiVersion: string = "2024-12-01";

  /**
   * The Web PubSub endpoint this client is connected to
   */
  public endpoint!: string;

  /**
   * @internal
   */
  constructor(client: WebPubSubServiceContext, hubName: string, groupName: string) {
    this.client = client;
    this.groupName = groupName;
    this.hubName = hubName;
  }
  /**
   * Add a specific connection to this group
   *
   * @param connectionId - The connection id to add to this group
   * @param options - Additional options
   */
  public async addConnection(
    connectionId: string,
    options: GroupAddConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubGroupClient.addConnection",
      options,
      async (updatedOptions) => {
        const result = await _addConnectionToGroupSend(
          this.client,
          this.groupName,
          connectionId,
          updatedOptions as any,
        );

        if (result.status === "404") {
          throw new RestError(`Connection id '${connectionId}' doesn't exist`, {
            statusCode: 404,
            request: result.request,
          });
        }
        if (result.status !== "200") {
          throw createRestError(result);
        }
      },
    );
  }

  /**
   * Remove a specific connection from this group
   *
   * @param connectionId - The connection id to remove from this group
   * @param options - Additional options
   */
  public async removeConnection(
    connectionId: string,
    options: GroupRemoveConnectionOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubGroupClient.removeConnection",
      options,
      (updatedOptions) => {
        return generatedRemoveConnectionFromGroup(
          this.client,
          this.groupName,
          connectionId,
          updatedOptions as any,
        );
      },
    );
  }

  /**
   * Close all connections to this group
   *
   * @param options - Additional options
   */
  public async closeAllConnections(options: GroupCloseAllConnectionsOptions = {}): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubGroupClient.closeAllConnections",
      options,
      (updatedOptions) => {
        return generatedCloseGroupConnections(this.client, this.groupName, updatedOptions as any);
      },
    );
  }
  /**
   * Add a user to this group
   *
   * @param username - The user name to add
   * @param options - Additional options
   */
  public async addUser(username: string, options: GroupAddUserOptions = {}): Promise<void> {
    return tracingClient.withSpan("WebPubSubGroupClient.addUser", options, (updatedOptions) => {
      return generatedAddUserToGroup(this.client, this.groupName, username, updatedOptions as any);
    });
  }

  /**
   * Remove a user from this group
   *
   * @param username - The user name to remove
   * @param options - Additional options
   */
  public async removeUser(username: string, options: GroupRemoveUserOptions = {}): Promise<void> {
    return tracingClient.withSpan("WebPubSubGroupClient.removeUser", options, (updatedOptions) => {
      return generatedRemoveUserFromGroup(
        this.client,
        this.groupName,
        username,
        updatedOptions as any,
      );
    });
  }

  /**
   * Send a text message to every connection in this group
   *
   * @param message - The message to send
   * @param options - Additional options
   */
  public async sendToAll(message: string, options: GroupSendTextToAllOptions): Promise<void>;
  /**
   * Send a json message to every connection in this group
   *
   * @param message - The message to send
   * @param options - Additional options
   */
  public async sendToAll(message: JSONTypes, options?: GroupSendToAllOptions): Promise<void>;
  /**
   * Send a binary message to every connection in this group
   *
   * @param message - The binary message to send
   * @param options - Additional options
   */
  public async sendToAll(message: RequestBodyType, options?: GroupSendToAllOptions): Promise<void>;

  public async sendToAll(
    message: JSONTypes | RequestBodyType,
    options: GroupSendToAllOptions | GroupSendTextToAllOptions = {},
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubGroupClient.sendToAll",
      options,
      async (updatedOptions) => {
        const { contentType, payload } = getPayloadForMessage(message, updatedOptions);
        await generatedSendToGroup(
          this.client,
          this.groupName,
          contentType as MessageContentType,
          toByteArrayPayload(payload) as any,
          {
            ...updatedOptions,
            excluded: (updatedOptions as any).excludedConnections,
          } as any,
        );
      },
    );
  }

  /**
   * List connections in this group.
   * @param options - The options parameters.
   */
  public listConnections(
    options: GroupListConnectionsOptions = {},
  ): Promise<PagedAsyncIterableIterator<WebPubSubGroupMember>> {
    return tracingClient.withSpan(
      "WebPubSubGroupClient.listConnections",
      options,
      (updatedOptions) =>
        generatedListConnectionsInGroup(this.client, this.groupName, {
          ...updatedOptions,
          maxpagesize: updatedOptions.maxPageSize,
        } as any),
    );
  }
}
