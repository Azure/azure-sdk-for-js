// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { RestError, RequestBodyType } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated/generatedClient";
import { tracingClient } from "./tracing";
import { getPayloadForMessage } from "./utils";
import { JSONTypes } from "./hubClient";

/**
 * Options for constructing a GroupAdmin client.
 */
export interface GroupAdminClientOptions extends CommonClientOptions {}

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
}

/**
 * Options for sending text messages to a group..
 */
export interface GroupSendTextToAllOptions extends OperationOptions {
  /**
   * Connection ids to exclude from receiving this message.
   */
  excludedConnections?: string[];
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
}

/**
 * @hidden
 */
export class WebPubSubGroupImpl implements WebPubSubGroup {
  private client!: GeneratedClient;

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
  public readonly apiVersion: string = "2020-10-01";

  /**
   * The Web PubSub endpoint this client is connected to
   */
  public endpoint!: string;

  /**
   * @internal
   */
  constructor(client: GeneratedClient, hubName: string, groupName: string) {
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
    options: GroupAddConnectionOptions = {}
  ): Promise<void> {
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (options.onResponse) {
        options.onResponse(rawResponse, flatResponse);
      }
    }

    return tracingClient.withSpan(
      "WebPubSubGroupClient.addConnection",
      options,
      async (updatedOptions) => {
        await this.client.webPubSub.addConnectionToGroup(
          this.hubName,
          this.groupName,
          connectionId,
          {
            ...updatedOptions,
            onResponse,
          }
        );

        if (response!.status === 404) {
          throw new RestError(`Connection id '${connectionId}' doesn't exist`, {
            statusCode: response?.status,
            request: response?.request,
            response: response,
          });
        }
      }
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
    options: GroupRemoveConnectionOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubGroupClient.removeConnection",
      options,
      (updatedOptions) => {
        return this.client.webPubSub.removeConnectionFromGroup(
          this.hubName,
          this.groupName,
          connectionId,
          updatedOptions
        );
      }
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
        return this.client.webPubSub.closeGroupConnections(
          this.hubName,
          this.groupName,
          updatedOptions
        );
      }
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
      return this.client.webPubSub.addUserToGroup(
        this.hubName,
        this.groupName,
        username,
        updatedOptions
      );
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
      return this.client.webPubSub.removeUserFromGroup(
        this.hubName,
        this.groupName,
        username,
        updatedOptions
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
    options: GroupSendToAllOptions | GroupSendTextToAllOptions = {}
  ): Promise<void> {
    return tracingClient.withSpan("WebPubSubGroupClient.sendToAll", options, (updatedOptions) => {
      const { contentType, payload } = getPayloadForMessage(message, updatedOptions);
      return this.client.webPubSub.sendToGroup(
        this.hubName,
        this.groupName,
        contentType,
        payload as any,
        updatedOptions
      );
    });
  }
}
