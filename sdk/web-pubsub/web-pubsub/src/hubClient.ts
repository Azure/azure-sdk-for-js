// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationOptions,
  RestResponse,
  RestError,
  HttpRequestBody,
  InternalPipelineOptions,
  createPipelineFromOptions,
  PipelineOptions
} from "@azure/core-http";
import { AzureWebPubSubServiceRestAPI as GeneratedClient } from "./generated/azureWebPubSubServiceRestAPI";
import { GroupAdminClient } from "./groupClient";
import normalizeBroadcastOptions from "./normalizeOptions";
import { AzureKeyCredential } from "@azure/core-auth";
import { webPubSubAzureKeyCredentialPolicyFactory } from "./webPubSubCredentialPolicy";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { parseConnectionString } from "./parseConnectionString";

/**
 * Options for closing a connection to a hub.
 */
export interface CloseConnectionOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * Options for sending messages to hubs, groups, users, or connections.
 */
export interface HubBroadcastOptions extends OperationOptions {
  /**
   * Connection ids to exclude from receiving this message.
   */
  excludedConnections?: string[];
}

/**
 * Options for constructing a HubAdmin client.
 */
export interface HubAdminClientOptions extends PipelineOptions {}

/**
 * Options for checking if a connection exists.
 */
export interface HasConnectionOptions extends OperationOptions {}

/**
 * Options for checking if a group exists.
 */
export interface HubHasGroupOptions extends OperationOptions {}

/**
 * Options for checking if a user exists.
 */
export interface HubHasUserOptions extends OperationOptions {}

/**
 * Options for removing a user from all groups.
 */
export interface HubRemoveUserFromAllGroupsOptions extends CloseConnectionOptions {}

/**
 * Options for sending a message to a specific connection.
 */
export interface HubSendToConnectionOptions extends OperationOptions {}

/**
 * Options for sending a message to a user.
 */
export interface HubSendToUserOptions extends OperationOptions {}

/**
 * Options for checking if the service is healthy.
 */
export interface HubIsServiceHealthyOptions extends OperationOptions {}

export const DEFAULT_HUB_NAME = "_default";

/**
 * Client for connecting to a Web PubSub hub
 *
 *   ()=()
 *   (^;^) Web PubSub Hub Cub says Hi!
 *   C   C
 *   ()_()
 */
export class HubAdminClient {
  private readonly client: GeneratedClient;
  private credential!: AzureKeyCredential;
  private readonly clientOptions?: HubAdminClientOptions;

  /**
   * The name of the hub this client is connected to
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
   * @param connectionString The connection string
   * @param options Options to configure the http pipeline
   */
  constructor(connectionString: string, options?: HubAdminClientOptions);
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
   * @param connectionString The connection string
   * @param hubName The name of the hub to connect to. If omitted, '_default' is used.
   * @param options Options to configure the http pipeline
   */
  constructor(connectionString: string, hubName: string, options?: HubAdminClientOptions);
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
   * @param endpoint The endpoint to connect to
   * @param credential An AzureKeyCredential holding your service key
   * @param options Options to configure the http pipeline
   */
  constructor(endpoint: string, credential: AzureKeyCredential, options?: HubAdminClientOptions);

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
   * @param options Options to configure the http pipeline
   */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential,
    hubName: string,
    options?: HubAdminClientOptions
  );
  constructor(
    epOrCs: string,
    optsCredsOrHubName?: HubAdminClientOptions | AzureKeyCredential | string,
    hubNameOrOpts?: string | HubAdminClientOptions,
    opts?: HubAdminClientOptions
  ) {
    // unpack constructor arguments
    if (typeof optsCredsOrHubName === "object" && "key" in optsCredsOrHubName) {
      // overload 3 or 4, passing in a credential.
      this.endpoint = epOrCs;
      this.credential = optsCredsOrHubName;

      if (typeof hubNameOrOpts === "string") {
        this.hubName = hubNameOrOpts;
        this.clientOptions = opts;
      } else {
        this.hubName = DEFAULT_HUB_NAME;
        this.clientOptions = hubNameOrOpts;
      }
    } else {
      // overload 1 or 2, assign endpoint and credentials from the connection string
      const parsedCs = parseConnectionString(epOrCs);
      this.endpoint = parsedCs.endpoint;
      this.credential = parsedCs.credential;

      if (typeof optsCredsOrHubName === "string") {
        this.hubName = optsCredsOrHubName;

        // if we're in overload 1, hubNameOrOpts is either undefined or options.
        this.clientOptions = hubNameOrOpts as PipelineOptions;
      } else {
        this.hubName = DEFAULT_HUB_NAME;
        this.clientOptions = optsCredsOrHubName;
      }
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...this.clientOptions,
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
   * Get a client for a group
   * @param groupName The name of the group to connect to.
   */
  public getGroupClient(groupName: string): GroupAdminClient {
    const client = new GroupAdminClient(
      this.endpoint,
      this.credential,
      groupName,
      this.clientOptions
    );

    return client;
  }

  /**
   * Check if the service is healthy
   *
   * @param options Additional options
   */
  public async isServiceHealthy(options: HubIsServiceHealthyOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-isServiceHealthy",
      options
    );

    try {
      await this.client.healthApi.getHealthStatus(updatedOptions);
      return true;
    } catch {
      return false;
    } finally {
      span.end();
    }
  }

  /**
   * Broadcast a text message to all connections on this hub.
   *
   * @param message The message to send
   * @param options Additional options
   */
  public async broadcast(message: string, options?: HubBroadcastOptions): Promise<RestResponse>;
  /**
   * Broadcast a binary message to all connections on this hub.
   *
   * @param message The message to send
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
      "WebPubSubManagementClient-hub-broadcast",
      normalizedOptions
    );
    try {
      if (typeof message === "string") {
        return this.client.webPubSubApi.broadcast("text/plain", message, {
          hub: this.hubName,
          ...updatedOptions
        });
      } else {
        return this.client.webPubSubApi.broadcast("application/octet-stream", message, {
          hub: this.hubName,
          ...updatedOptions
        });
      }
    } finally {
      span.end();
    }
  }

  /**
   * Send a text message to a specific user
   *
   * @param username User name to send to
   * @param message The message to send
   * @param options Additional options
   */
  public sendToUser(
    username: string,
    message: string,
    options?: HubSendToUserOptions
  ): Promise<RestResponse>;

  /**
   * Send a binary message to a specific user
   *
   * @param username The user name to send to
   * @param message The binary message to send
   * @param options Additional options
   */
  public sendToUser(
    username: string,
    message: HttpRequestBody,
    options?: HubSendToUserOptions
  ): Promise<RestResponse>;
  public sendToUser(
    username: string,
    message: string | HttpRequestBody,
    options: HubSendToUserOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-hub-sendToUser",
      options
    );

    try {
      if (typeof message === "string") {
        return this.client.webPubSubApi.sendToUser(username, "text/plain", message, {
          hub: this.hubName,
          ...updatedOptions
        });
      } else {
        return this.client.webPubSubApi.sendToUser(username, "application/octet-stream", message, {
          hub: this.hubName,
          ...updatedOptions
        });
      }
    } finally {
      span.end();
    }
  }

  /**
   * Send a text message to a specific connection
   *
   * @param connectionId Connection id to send to
   * @param message The text message
   * @param options Additional options
   */
  public sendToConnection(
    connectionId: string,
    message: string,
    options?: HubSendToConnectionOptions
  ): Promise<RestResponse>;
  /**
   * Send a binary message to a specific connection
   *
   * @param connectionId Connection id to send to
   * @param message The binary message
   * @param options Additional options
   */
  public sendToConnection(
    connectionId: string,
    message: HttpRequestBody,
    options?: HubSendToConnectionOptions
  ): Promise<RestResponse>;
  public sendToConnection(
    connectionId: string,
    message: string | HttpRequestBody,
    options: HubSendToConnectionOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-hub-sendToConnection",
      options
    );

    try {
      if (typeof message === "string") {
        return this.client.webPubSubApi.sendToConnection(connectionId, "text/plain", message, {
          hub: this.hubName,
          ...updatedOptions
        });
      } else {
        return this.client.webPubSubApi.sendToConnection(
          connectionId,
          "application/octet-stream",
          message,
          { hub: this.hubName, ...updatedOptions }
        );
      }
    } finally {
      span.end();
    }
  }

  /**
   * Check if a specific connection is connected to this hub
   *
   * @param connectionId Connection id to check
   * @param options Additional options
   */
  public async hasConnection(
    connectionId: string,
    options: HasConnectionOptions = {}
  ): Promise<boolean> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-hub-hasConnection",
      options
    );

    try {
      const res = await this.client.webPubSubApi.checkConnectionExistence(connectionId, {
        hub: this.hubName,
        ...updatedOptions
      });

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
   * Close a specific connection to this hub
   *
   * @param connectionId Connection id to close
   * @param options Additional options
   */
  public closeConnection(
    connectionId: string,
    options: CloseConnectionOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-hub-removeConnection",
      options
    );

    try {
      return this.client.webPubSubApi.closeClientConnection(connectionId, {
        hub: this.hubName,
        ...updatedOptions
      });
    } finally {
      span.end();
    }
  }

  /**
   * Remove a specific user from all groups they are joined to
   * @param userId The user id to remove from all groups
   * @param options Additional options
   */
  public removeUserFromAllGroups(
    userId: string,
    options: CloseConnectionOptions = {}
  ): Promise<RestResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubManagementClient-hub-removeUserFromAllGroups",
      options
    );

    try {
      return this.client.webPubSubApi.removeUserFromAllGroups(userId, {
        hub: this.hubName,
        ...updatedOptions
      });
    } finally {
      span.end();
    }
  }

  /**
   * Check if a particular group exists (i.e. has active connections).
   *
   * @param groupName The group name to check for
   * @param options Additional options
   */
  public async hasGroup(groupName: string, options: HubHasGroupOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubManagementClient-hub-hasGroup", options);

    try {
      const res = await this.client.webPubSubApi.checkGroupExistence(groupName, {
        hub: this.hubName,
        ...updatedOptions
      });

      if (res._response.status === 200) {
        return true;
      } else if (res._response.status === 404) {
        return false;
      } else {
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
   * Check if a particular user is connected to this hub.
   *
   * @param username The user name to check for
   * @param options Additional options
   */
  public async hasUser(username: string, options: HubHasUserOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubManagementClient-hub-hasUser", options);

    try {
      const res = await this.client.webPubSubApi.checkUserExistence(username, {
        hub: this.hubName,
        ...updatedOptions
      });

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
}
