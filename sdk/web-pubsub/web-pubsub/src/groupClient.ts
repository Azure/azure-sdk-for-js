// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { RestError, RequestBodyType } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated/generatedClient";
import { createSpan } from "./tracing";
import normalizeSendToAllOptions from "./normalizeOptions";
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
   * @private
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
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-group-addConnection",
      options
    );

    try {
      let response: FullOperationResponse | undefined;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        response = rawResponse;
        if (updatedOptions.onResponse) {
          updatedOptions.onResponse(rawResponse, flatResponse);
        }
      }
      await this.client.webPubSub.addConnectionToGroup(this.hubName, this.groupName, connectionId, {
        ...updatedOptions,
        onResponse
      });

      if (response?.status === 404) {
        throw new RestError(`Connection id '${connectionId}' doesn't exist`, {
          statusCode: response?.status,
          request: response?.request,
          response: response
        });
      }
    } finally {
      span.end();
    }
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
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-group-removeConnection",
      options
    );

    try {
      await this.client.webPubSub.removeConnectionFromGroup(
        this.hubName,
        this.groupName,
        connectionId,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Add a user to this group
   *
   * @param username - The user name to add
   * @param options - Additional options
   */
  public async addUser(username: string, options: GroupAddUserOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-group-addUser", options);

    try {
      await this.client.webPubSub.addUserToGroup(
        this.hubName,
        this.groupName,
        username,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Remove a user from this group
   *
   * @param username - The user name to remove
   * @param options - Additional options
   */
  public async removeUser(username: string, options: GroupRemoveUserOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-group-removeUser", options);

    try {
      await this.client.webPubSub.removeUserFromGroup(
        this.hubName,
        this.groupName,
        username,
        updatedOptions
      );
    } finally {
      span.end();
    }
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
    const normalizedOptions = normalizeSendToAllOptions(options);
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-group-sendToAll",
      normalizedOptions
    );

    const { contentType, payload } = getPayloadForMessage(message, updatedOptions);

    try {
      await this.client.webPubSub.sendToGroup(
        this.hubName,
        this.groupName,
        contentType,
        payload as any,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }
}
