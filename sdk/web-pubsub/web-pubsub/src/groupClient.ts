// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationOptions,
  RestResponse,
  RestError,
  HttpRequestBody,
  PipelineOptions
} from "@azure/core-http";
import { AzureWebPubSubServiceRestAPI as GeneratedClient } from "./generated/azureWebPubSubServiceRestAPI";
import { createSpan } from "./tracing";
import { HubSendToAllOptions } from "./hubClient";
import normalizeSendToAllOptions from "./normalizeOptions";

/**
 * Options for constructing a GroupAdmin client.
 */
export interface GroupAdminClientOptions extends PipelineOptions {}

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
 * Client for connecting to a Web PubSub group.
 */
export class WebPubsubGroup {
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
  constructor(groupName: string, hubName: string) {
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
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-group-addConnection",
      options
    );

    try {
      const res = await this.client.webPubSub.addConnectionToGroup(
        this.hubName,
        this.groupName,
        connectionId,
        updatedOptions
      );

      if (res._response.status === 404) {
        throw new RestError(
          `Connection id '${connectionId}' doesn't exist`,
          undefined,
          res._response.status,
          res._response.request,
          res._response
        );
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
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-group-removeUser",
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
  public addUser(username: string, options: GroupAddUserOptions = {}): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan("WebPubSubManagementClient-group-addUser", options);

    try {
      return this.client.webPubSub.addUserToGroup(
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
    const { span, updatedOptions } = createSpan("WebPubSubManagementClient-group-hasUser", options);

    try {
      const res = await this.client.webPubSub.checkUserExistenceInGroup(
        this.hubName,
        this.groupName,
        username,
        updatedOptions
      );

      if (res._response.status === 200) {
        return true;
      } else if (res._response.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(
          res._response.bodyAsText!,
          undefined,
          res._response.status,
          res._response.request,
          res._response
        );
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
  public removeUser(username: string, options: GroupRemoveUserOptions = {}): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-group-removeUser",
      options
    );

    try {
      return this.client.webPubSub.removeUserFromGroup(
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
  public async sendToAll(message: string, options?: HubSendToAllOptions): Promise<RestResponse>;

  /**
   * Send a binary message to every connection in this group
   *
   * @param message The binary message to send
   * @param options Additional options
   */
  public async sendToAll(
    message: HttpRequestBody,
    options?: HubSendToAllOptions
  ): Promise<RestResponse>;
  public async sendToAll(
    message: string | HttpRequestBody,
    options: HubSendToAllOptions = {}
  ): Promise<RestResponse> {
    const normalizedOptions = normalizeSendToAllOptions(options);
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-group-sendToAll",
      normalizedOptions
    );

    try {
      if (typeof message === "string") {
        return this.client.webPubSub.sendToGroup(
          this.hubName,
          this.groupName,
          "text/plain",
          message,
          updatedOptions
        );
      } else {
        return this.client.webPubSub.sendToGroup(
          this.hubName,
          this.groupName,
          "application/octet-stream",
          message,
          updatedOptions
        );
      }
    } finally {
      span.end();
    }
  }
}
