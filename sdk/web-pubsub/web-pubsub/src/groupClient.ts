// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { RestError, RequestBodyType } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated/generatedClient";
import { createSpan } from "./tracing";
import normalizeSendToAllOptions from "./normalizeOptions";
import { getContentTypeForMessage } from "./utils";
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
   * @param connectionId The connection id to add to this group
   * @param options Additional options
   */
  addConnection(connectionId: string, options?: GroupAddConnectionOptions): Promise<void>;

  /**
   * Remove a specific connection from this group
   *
   * @param connectionId The connection id to remove from this group
   * @param options Additional options
   */
  removeConnection(connectionId: string, options?: GroupRemoveConnectionOptions): Promise<void>;

  /**
   * Add a user to this group
   *
   * @param username The user name to add
   * @param options Additional options
   */
  addUser(username: string, options?: GroupAddUserOptions): Promise<void>;

  /**
   * Check if a user is in this group
   *
   * @param username The user name to check for
   * @param options Additional options
   */
  hasUser(username: string, options?: GroupHasUserOptions): Promise<boolean>;

  /**
   * Remove a user from this group
   *
   * @param username The user name to remove
   * @param options Additional options
   */
  removeUser(username: string, options?: GroupRemoveUserOptions): Promise<void>;

  /**
   * Send a text message to every connection in this group
   *
   * @param message The message to send
   * @param options Additional options
   */
  sendToAll(message: string, options: GroupSendTextToAllOptions): Promise<void>;
  /**
   * Send a json message to every connection in this group
   *
   * @param message The message to send
   * @param options Additional options
   */
  sendToAll(message: JSONTypes, options?: GroupSendToAllOptions): Promise<void>;
  /**
   * Send a binary message to every connection in this group
   *
   * @param message The binary message to send
   * @param options Additional options
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
   * @param connectionId The connection id to add to this group
   * @param options Additional options
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
      let rawResponse: FullOperationResponse | undefined;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        rawResponse = rawResponse;
        if (updatedOptions.onResponse) {
          updatedOptions.onResponse(rawResponse, flatResponse);
        }
      }
      const res = await this.client.webPubSub.addConnectionToGroup(
        this.hubName,
        this.groupName,
        connectionId,
        { ...updatedOptions, onResponse }
      );

      if (rawResponse?.status === 404) {
        throw new RestError(`Connection id '${connectionId}' doesn't exist`, {
          statusCode: rawResponse?.status,
          request: rawResponse?.request,
          response: rawResponse
        });
      }

      return res;
    } finally {
      span.end();
    }
  }

  /**
   * Remove a specific connection from this group
   *
   * @param connectionId The connection id to remove from this group
   * @param options Additional options
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
      const res = await this.client.webPubSub.removeConnectionFromGroup(
        this.hubName,
        this.groupName,
        connectionId,
        updatedOptions
      );

      return res;
    } finally {
      span.end();
    }
  }

  /**
   * Add a user to this group
   *
   * @param username The user name to add
   * @param options Additional options
   */
  public async addUser(username: string, options: GroupAddUserOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-group-addUser", options);

    try {
      return await this.client.webPubSub.addUserToGroup(
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
   * Check if a user is in this group
   *
   * @param username The user name to check for
   * @param options Additional options
   */
  public async hasUser(username: string, options: GroupHasUserOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-group-hasUser", options);

    try {
      let rawResponse: FullOperationResponse | undefined;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        rawResponse = rawResponse;
        if (updatedOptions.onResponse) {
          updatedOptions.onResponse(rawResponse, flatResponse);
        }
      }
      const res = await this.client.webPubSub.userExistsInGroup(
        this.hubName,
        this.groupName,
        username,
        { ...updatedOptions, onResponse }
      );

      if (res._response.status === 200) {
        return true;
      } else if (res._response.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(rawResponse?.bodyAsText!, {
          statusCode: rawResponse?.status,
          request: rawResponse?.request,
          response: rawResponse
        });
      }
    } finally {
      span.end();
    }
  }

  /**
   * Remove a user from this group
   *
   * @param username The user name to remove
   * @param options Additional options
   */
  public async removeUser(username: string, options: GroupRemoveUserOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-group-removeUser", options);

    try {
      return await this.client.webPubSub.removeUserFromGroup(
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
   * @param message The message to send
   * @param options Additional options
   */
  public async sendToAll(message: string, options: GroupSendTextToAllOptions): Promise<void>;
  /**
   * Send a json message to every connection in this group
   *
   * @param message The message to send
   * @param options Additional options
   */
  public async sendToAll(message: JSONTypes, options?: GroupSendToAllOptions): Promise<void>;
  /**
   * Send a binary message to every connection in this group
   *
   * @param message The binary message to send
   * @param options Additional options
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

    const contentType = getContentTypeForMessage(message, updatedOptions);

    try {
      return await this.client.webPubSub.sendToGroup(
        this.hubName,
        this.groupName,
        contentType,
        contentType === "application/json" ? JSON.stringify(message) : message,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }
}
