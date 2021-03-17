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
import { WebPubsubGroup } from "./groupClient";
import normalizeSendToAllOptions from "./normalizeOptions";
import { AzureKeyCredential } from "@azure/core-auth";
import { webPubSubAzureKeyCredentialPolicyFactory } from "./webPubSubCredentialPolicy";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { parseConnectionString } from "./parseConnectionString";
import jwt from "jsonwebtoken";

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
export interface HubSendToAllOptions extends OperationOptions {
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

/**
 * Options for auth a client
 */
export interface GetAuthenticationTokenOptions {
  /**
   * The userId for the client
   */
  userId?: string;
  /**
   * The custom claims for the client, e.g. role
   */
  claims?: { [key: string]: string[] };
}

/**
 * Response for the authed client, including the url and the jwt token
 */
export interface GetAuthenticationTokenResponse {
  /**
   * The URL client connects to
   */
  baseUrl: string;

  /**
   * The JWT token the client uses to connect
   */
  token: string;

  /**
   * The URL client connects to with access_token query string
   */
  url: string;
}

/**
 * Client for connecting to a Web PubSub hub
 *
 *   ()=()
 *   (^;^) Web PubSub Hub Cub says Hi!
 *   C   C
 *   ()_()
 */
export class WebPubsubServiceClient {
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
   * @param hubName The name of the hub to connect to.
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
    credsOrHubName?: AzureKeyCredential | string,
    hubNameOrOpts?: string | HubAdminClientOptions,
    opts?: HubAdminClientOptions
  ) {
    // unpack constructor arguments
    if (typeof credsOrHubName === "object" && "key" in credsOrHubName) {
      this.endpoint = epOrCs;
      this.credential = credsOrHubName;
      this.hubName = hubNameOrOpts as string;
      this.clientOptions = opts;
    } else {
      const parsedCs = parseConnectionString(epOrCs);
      this.endpoint = parsedCs.endpoint;
      this.credential = parsedCs.credential;
      this.hubName = credsOrHubName as string;
      this.clientOptions = hubNameOrOpts as PipelineOptions;
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
   * Auth the client connection with userId and custom claims if any
   * @param options The options that the client has
   */
  public async getAuthenticationToken(
    options?: GetAuthenticationTokenOptions
  ): Promise<GetAuthenticationTokenResponse> {
    const endpoint = this.endpoint.endsWith("/") ? this.endpoint : this.endpoint + "/";
    const key = this.credential.key;
    const hub = this.hubName;
    var clientEndpoint = endpoint.replace(/(http)(s?:\/\/)/gi, "ws$2");
    var clientUrl = `${clientEndpoint}client/hubs/${hub}`;
    const audience = `${endpoint}client/hubs/${hub}`;
    var payload = options?.claims ?? {};
    var signOptions: jwt.SignOptions = {
      audience: audience,
      expiresIn: "1h",
      algorithm: "HS256"
    };
    if (options?.userId) {
      signOptions.subject = options?.userId;
    }
    const token = jwt.sign(payload, key, signOptions);
    const url = `${clientUrl}?access_token=${token}`;
    return {
      baseUrl: clientUrl,
      token: jwt.sign(payload, key, signOptions),
      url: url
    };
  }

  /**
   * Get a client for a group
   * @param groupName The name of the group to connect to.
   */
  public group(groupName: string): WebPubsubGroup {
    const client = new WebPubsubGroup(this.hubName, groupName);
    client["client"] = this.client;
    return client;
  }

  /**
   * Broadcast a text message to all connections on this hub.
   *
   * @param message The message to send
   * @param options Additional options
   */
  public async sendToAll(message: string, options?: HubSendToAllOptions): Promise<RestResponse>;
  /**
   * Broadcast a binary message to all connections on this hub.
   *
   * @param message The message to send
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
      "WebPubSubManagementClient-hub-sendToAll",
      normalizedOptions
    );
    try {
      if (typeof message === "string") {
        return this.client.webPubSub.sendToAll(this.hubName, "text/plain", message, updatedOptions);
      } else {
        return this.client.webPubSub.sendToAll(
          this.hubName,
          "application/octet-stream",
          message,
          updatedOptions
        );
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
        return this.client.webPubSub.sendToUser(
          this.hubName,
          username,
          "text/plain",
          message,
          updatedOptions
        );
      } else {
        return this.client.webPubSub.sendToUser(
          this.hubName,
          username,
          "application/octet-stream",
          message,
          updatedOptions
        );
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
        return this.client.webPubSub.sendToConnection(
          this.hubName,
          connectionId,
          "text/plain",
          message,
          updatedOptions
        );
      } else {
        return this.client.webPubSub.sendToConnection(
          this.hubName,
          connectionId,
          "application/octet-stream",
          message,
          updatedOptions
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
      const res = await this.client.webPubSub.checkConnectionExistence(
        this.hubName,
        connectionId,
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
      return this.client.webPubSub.closeClientConnection(
        this.hubName,
        connectionId,
        updatedOptions
      );
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
      return this.client.webPubSub.removeUserFromAllGroups(this.hubName, userId, updatedOptions);
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
      const res = await this.client.webPubSub.checkGroupExistence(
        this.hubName,
        groupName,
        updatedOptions
      );

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
      const res = await this.client.webPubSub.checkUserExistence(
        this.hubName,
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
}
