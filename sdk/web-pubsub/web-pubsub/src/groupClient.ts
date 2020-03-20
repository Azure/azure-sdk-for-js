// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationOptions,
  RestResponse,
  RestError,
  HttpRequestBody,
  PipelineOptions,
  createPipelineFromOptions
} from "@azure/core-http";
import { AzureKeyCredential } from "@azure/core-auth";
import { AzureWebPubSubServiceRestAPI as GeneratedClient } from "./generated/azureWebPubSubServiceRestAPI";
import { createSpan } from "./tracing";
import { HubBroadcastOptions, DEFAULT_HUB_NAME } from "./hubClient";
import normalizeBroadcastOptions from "./normalizeOptions";
import { parseConnectionString } from "./parseConnectionString";
import { webPubSubAzureKeyCredentialPolicyFactory } from "./webPubSubCredentialPolicy";
import { logger } from "./logger";

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
export class GroupAdminClient {
  private client!: GeneratedClient;
  private credential!: AzureKeyCredential;

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
   * Creates an instance of a HubClient for sending messages and managing groups, connections, and users.
   * Connects to the default hub named `_default`.
   *
   * Example usage:
   * ```ts
   * import { HubClient } from "@azure/web-pubsub-management";
   * const connectionString = process.env['WEB_PUBSUB_CONNECTION_STRING'];
   * const client = new HubClient(connectionString, 'chat');
   * ```
   *
   * @param connectionString The connection string.
   * @param groupName Group name to use.
   * @param options Options to configure the http pipeline.
   */
  constructor(connectionString: string, groupName: string, options?: GroupAdminClientOptions);
  /**
   * Creates an instance of a HubClient for sending messages and managing groups, connections, and users.
   *
   * Example usage:
   * ```ts
   * import { HubClient } from "@azure/web-pubsub-management";
   * const connectionString = process.env['WEB_PUBSUB_CONNECTION_STRING'];
   * const client = new HubClient(connectionString, 'chat');
   * ```
   *
   * @param connectionString The connection string.
   * @param hubName The name of the hub to connect to. If omitted, '_default' is used.
   * @param groupName The name of the group to use.
   * @param options Options to configure the http pipeline.
   */
  constructor(
    connectionString: string,
    hubName: string,
    groupName: string,
    options?: GroupAdminClientOptions
  );
  /**
   * Creates an instance of a HubClient for sending messages and managing groups, connections, and users.
   * Connects to the default hub named `_default`.
   *
   * Example usage:
   * ```ts
   * import { HubClient, AzureKeyCredential } from "@azure/web-pubsub-management";
   * const cred = new AzureKeyCredential("<your web pubsub api key>");
   * const endpoint = "https://xxxx.webpubsubdev.azure.com"
   * const client = new HubClient(endpoint, cred, 'chat');
   * ```
   *
   * @param endpoint The endpoint to connect to.
   * @param credential An AzureKeyCredential holding your service key.
   * @param groupName Group name to use.
   * @param options Options to configure the http pipeline.
   */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential,
    groupName: string,
    options?: GroupAdminClientOptions
  );

  /**
   * Creates an instance of a HubClient for sending messages and managing groups, connections, and users.
   *
   * Example usage:
   * ```ts
   * import { HubClient, AzureKeyCredential } from "@azure/web-pubsub-management";
   * const cred = new AzureKeyCredential("<your web pubsub api key>");
   * const endpoint = "https://xxxx.webpubsubdev.azure.com"
   * const client = new HubClient(endpoint, cred, 'chat');
   * ```
   *
   * @param endpoint The endpoint to connect to
   * @param credential An AzureKeyCredential holding your service key
   * @param hubName The name of the hub to connect to. If omitted, '_default' is used.
   * @param groupName Group name to use.
   * @param options Options to configure the http pipeline
   */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential,
    hubName: string,
    groupName: string,
    options?: GroupAdminClientOptions
  );
  constructor(
    epOrCs: string,
    credsOrHubOrGroupName: AzureKeyCredential | string,
    optsOrGroupOrHubName?: string | GroupAdminClientOptions,
    optsOrGroupName?: string | GroupAdminClientOptions,
    opts?: GroupAdminClientOptions
  ) {
    // unpack constructor arguments
    let options: GroupAdminClientOptions | undefined;
    if (typeof credsOrHubOrGroupName === "object" && "key" in credsOrHubOrGroupName) {
      // overload 3 or 4, passing in a credential.
      this.endpoint = epOrCs;
      this.credential = credsOrHubOrGroupName;

      if (typeof optsOrGroupOrHubName !== "string") {
        throw new TypeError("Must pass in a group name after endpoint and credential");
      }

      if (typeof optsOrGroupName === "string") {
        this.hubName = optsOrGroupOrHubName;
        this.groupName = optsOrGroupName;
        options = opts;
      } else {
        this.hubName = DEFAULT_HUB_NAME;
        this.groupName = optsOrGroupOrHubName;
        options = optsOrGroupName;
      }
    } else {
      // overload 1 or 2, assign endpoint and credentials from the connection string
      const parsedCs = parseConnectionString(epOrCs);
      this.endpoint = parsedCs.endpoint;
      this.credential = parsedCs.credential;

      if (typeof optsOrGroupOrHubName === "string") {
        this.hubName = credsOrHubOrGroupName;
        this.groupName = optsOrGroupOrHubName;
        // if we're in overload 1, hubNameOrOpts is either undefined or options.
        options = optsOrGroupName as PipelineOptions;
      } else {
        this.hubName = DEFAULT_HUB_NAME;
        this.groupName = credsOrHubOrGroupName;
        options = optsOrGroupOrHubName;
      }
    }

    const internalPipelineOptions: GroupAdminClientOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const pipeline = createPipelineFromOptions(
      internalPipelineOptions,
      webPubSubAzureKeyCredentialPolicyFactory(this.credential)
    );

    this.client = new GeneratedClient(this.endpoint, pipeline);
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
      const res = await this.client.webPubSubApi.addConnectionToGroup(
        this.groupName,
        connectionId,
        { hub: this.hubName, ...updatedOptions }
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
      const res = await this.client.webPubSubApi.removeConnectionFromGroup(
        this.groupName,
        connectionId,
        { hub: this.hubName, ...updatedOptions }
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
      return this.client.webPubSubApi.addUserToGroup(this.groupName, username, {
        hub: this.hubName,
        ...updatedOptions
      });
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
      const res = await this.client.webPubSubApi.checkUserExistenceInGroup(
        this.groupName,
        username,
        { hub: this.hubName, ...updatedOptions }
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
      return this.client.webPubSubApi.removeUserFromGroup(this.groupName, username, {
        hub: this.hubName,
        ...updatedOptions
      });
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
  public async broadcast(message: string, options?: HubBroadcastOptions): Promise<RestResponse>;

  /**
   * Send a binary message to every connection in this group
   *
   * @param message The binary message to send
   * @param options Additional options
   */
  public async broadcast(
    message: HttpRequestBody,
    options?: HubBroadcastOptions
  ): Promise<RestResponse>;
  public async broadcast(
    message: string | HttpRequestBody,
    options: HubBroadcastOptions = {}
  ): Promise<RestResponse> {
    const normalizedOptions = normalizeBroadcastOptions(options);
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-group-broadcast",
      normalizedOptions
    );

    try {
      if (typeof message === "string") {
        return this.client.webPubSubApi.groupBroadcast(this.groupName, "text/plain", message, {
          hub: this.hubName,
          ...updatedOptions
        });
      } else {
        return this.client.webPubSubApi.groupBroadcast(
          this.groupName,
          "application/octet-stream",
          message,
          {
            hub: this.hubName,
            ...updatedOptions
          }
        );
      }
    } finally {
      span.end();
    }
  }
}
