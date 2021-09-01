// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { InternalPipelineOptions, RestError, RequestBodyType } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated/generatedClient";
import { WebPubSubGroup, WebPubSubGroupImpl } from "./groupClient";
import normalizeSendToAllOptions from "./normalizeOptions";
import { AzureKeyCredential } from "@azure/core-auth";
import { webPubSubKeyCredentialPolicy } from "./webPubSubCredentialPolicy";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { parseConnectionString } from "./parseConnectionString";
import jwt from "jsonwebtoken";
import { getPayloadForMessage } from "./utils";

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
 * Options for sending messages to hubs.
 */
export interface HubSendToAllOptions extends OperationOptions {
  /**
   * Connection ids to exclude from receiving this message.
   */
  excludedConnections?: string[];
}

/**
 * Options for sending text messages to hubs.
 */
export interface HubSendTextToAllOptions extends HubSendToAllOptions {
  contentType: "text/plain";
}

/**
 * Types which can be serialized and sent as JSON.
 */
export type JSONTypes = string | number | boolean | object;

/**
 * Options for constructing a HubAdmin client.
 */
export interface HubAdminClientOptions extends CommonClientOptions {}

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
 * Options for sending a text message to a connection.
 */
export interface HubSendTextToConnectionOptions extends HubSendToConnectionOptions {
  contentType: "text/plain";
}

/**
 * Options for sending a message to a user.
 */
export interface HubSendToUserOptions extends OperationOptions {}

/**
 * Options for sending a text message to a user.
 */
export interface HubSendTextToUserOptions extends HubSendToUserOptions {
  contentType: "text/plain";
}

/**
 * Options for auth a client
 */
export interface GetAuthenticationTokenOptions {
  /**
   * The userId for the client
   */
  userId?: string;
  /**
   * The roles the client have.
   * Roles give the client initial permissions to leave, join, or publish to groups when using PubSub subprotocol
   * * `webpubsub.joinLeaveGroup`: the client can join or leave any group
   * * `webpubsub.sendToGroup`: the client can send messages to any group
   * * `webpubsub.joinLeaveGroup.<group>`: the client can join or leave group `<group>`
   * * `webpubsub.sendToGroup.<group>`: the client can send messages to group `<group>`
   *
   * {@link https://azure.github.io/azure-webpubsub/references/pubsub-websocket-subprotocol#permissions}
   */
  roles?: string[];
  /**
   * The time-to-live minutes for the access token. If not set, the default value is 60 minutes.
   */
  ttl?: number;
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

export type Permission = "joinLeaveGroup" | "sendToGroup";

/**
 * Options for grant permissions to a connection
 */
export interface HubGrantPermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * Options for revoke permissions from a connection
 */
export interface HubRevokePermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * Options for check if a connection has the specified permission
 */
export interface HubHasPermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * Client for connecting to a Web PubSub hub
 */
export class WebPubSubServiceClient {
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
   * Creates an instance of a WebPubSubServiceClient for sending messages and managing groups, connections, and users.
   *
   * Example usage:
   * ```ts
   * import { WebPubSubServiceClient } from "@azure/web-pubsub";
   * const connectionString = process.env['WEB_PUBSUB_CONNECTION_STRING'];
   * const client = new WebPubSubServiceClient(connectionString, 'chat');
   * ```
   *
   * @param connectionString - The connection string
   * @param hubName - The name of the hub to connect to. If omitted, '_default' is used.
   * @param options - Options to configure the http pipeline
   */
  constructor(connectionString: string, hubName: string, options?: HubAdminClientOptions);

  /**
   * Creates an instance of a WebPubSubServiceClient for sending messages and managing groups, connections, and users.
   *
   * Example usage:
   * ```ts
   * import { WebPubSubServiceClient, AzureKeyCredential } from "@azure/web-pubsub";
   * const cred = new AzureKeyCredential("<your web pubsub api key>");
   * const endpoint = "https://xxxx.webpubsubdev.azure.com"
   * const client = new WebPubSubServiceClient(endpoint, cred, 'chat');
   * ```
   *
   * @param endpoint - The endpoint to connect to
   * @param credential - An AzureKeyCredential holding your service key
   * @param hubName - The name of the hub to connect to.
   * @param options - Options to configure the http pipeline
   */
  constructor(
    endpoint: string,
    credential: AzureKeyCredential,
    hubName: string,
    options?: HubAdminClientOptions
  );
  constructor(
    endpointOrConnectionString: string,
    credsOrHubName?: AzureKeyCredential | string,
    hubNameOrOpts?: string | HubAdminClientOptions,
    opts?: HubAdminClientOptions
  ) {
    // unpack constructor arguments
    if (typeof credsOrHubName === "object" && "key" in credsOrHubName) {
      this.endpoint = endpointOrConnectionString;
      this.credential = credsOrHubName;
      this.hubName = hubNameOrOpts as string;
      this.clientOptions = opts;
    } else {
      const parsedCs = parseConnectionString(endpointOrConnectionString);
      this.endpoint = parsedCs.endpoint;
      this.credential = parsedCs.credential;
      this.hubName = credsOrHubName as string;
      this.clientOptions = hubNameOrOpts as HubAdminClientOptions;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...this.clientOptions,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    this.client = new GeneratedClient(this.endpoint, internalPipelineOptions);
    this.client.pipeline.addPolicy(webPubSubKeyCredentialPolicy(this.credential));
  }

  /**
   * Auth the client connection with userId and custom claims if any
   * @param options - The options that the client has
   */
  public async getAuthenticationToken(
    options?: GetAuthenticationTokenOptions
  ): Promise<GetAuthenticationTokenResponse> {
    const endpoint = this.endpoint.endsWith("/") ? this.endpoint : this.endpoint + "/";
    const key = this.credential.key;
    const hub = this.hubName;
    const clientEndpoint = endpoint.replace(/(http)(s?:\/\/)/gi, "ws$2");
    const clientUrl = `${clientEndpoint}client/hubs/${hub}`;
    const audience = `${endpoint}client/hubs/${hub}`;
    const payload = { role: options?.roles };
    const signOptions: jwt.SignOptions = {
      audience: audience,
      expiresIn: options?.ttl === undefined ? "1h" : `${options.ttl}m`,
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
   * @param groupName - The name of the group to connect to.
   */
  public group(groupName: string): WebPubSubGroup {
    return new WebPubSubGroupImpl(this.client, this.hubName, groupName);
  }

  /**
   * Broadcast a text message to all connections on this hub.
   *
   * @param message - The text message to send
   * @param options - Additional options
   */
  public async sendToAll(message: string, options: HubSendTextToAllOptions): Promise<void>;
  /**
   * Broadcast a JSON message to all connections on this hub.
   *
   * @param message - The JSON message to send
   * @param options - Additional options
   */
  public async sendToAll(message: JSONTypes, options?: HubSendToAllOptions): Promise<void>;
  /**
   * Broadcast a binary message to all connections on this hub.
   *
   * @param message - The message to send
   * @param options - Additional options
   */
  public async sendToAll(message: RequestBodyType, options?: HubSendToAllOptions): Promise<void>;

  public async sendToAll(
    message: RequestBodyType | JSONTypes,
    options: HubSendToAllOptions | HubSendTextToAllOptions = {}
  ): Promise<void> {
    const normalizedOptions = normalizeSendToAllOptions(options);
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-sendToAll",
      normalizedOptions
    );

    const { contentType, payload } = getPayloadForMessage(message, updatedOptions);

    try {
      return await this.client.webPubSub.sendToAll(
        this.hubName,
        contentType,
        payload as any,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Send a text message to a specific user
   *
   * @param username - User name to send to
   * @param message - The text message to send
   * @param options - Additional options
   */
  public async sendToUser(
    username: string,
    message: string,
    options: HubSendTextToUserOptions
  ): Promise<void>;

  /**
   * Send a JSON message to a specific user
   *
   * @param username - User name to send to
   * @param message - The josn message to send
   * @param options - Additional options
   */
  public async sendToUser(
    username: string,
    message: JSONTypes,
    options?: HubSendToUserOptions
  ): Promise<void>;

  /**
   * Send a binary message to a specific user
   *
   * @param username - The user name to send to
   * @param message - The binary message to send
   * @param options - Additional options
   */
  public async sendToUser(
    username: string,
    message: RequestBodyType,
    options?: HubSendToUserOptions | HubSendTextToUserOptions
  ): Promise<void>;
  public async sendToUser(
    username: string,
    message: RequestBodyType | JSONTypes,
    options: HubSendToUserOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-hub-sendToUser", options);

    const { contentType, payload } = getPayloadForMessage(message, updatedOptions);
    try {
      return await this.client.webPubSub.sendToUser(
        this.hubName,
        username,
        contentType,
        payload as any,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Send a text message to a specific connection
   *
   * @param connectionId - Connection id to send to
   * @param message - The text message
   * @param options - Additional options
   */
  public async sendToConnection(
    connectionId: string,
    message: string,
    options: HubSendTextToConnectionOptions
  ): Promise<void>;

  /**
   * Send a binary message to a specific connection
   *
   * @param connectionId - Connection id to send to
   * @param message - The JSON message
   * @param options - Additional options
   */
  public async sendToConnection(
    connectionId: string,
    message: JSONTypes,
    options?: HubSendToConnectionOptions
  ): Promise<void>;

  /**
   * Send a binary message to a specific connection
   *
   * @param connectionId - Connection id to send to
   * @param message - The binary message
   * @param options - Additional options
   */
  public async sendToConnection(
    connectionId: string,
    message: RequestBodyType,
    options?: HubSendToConnectionOptions | HubSendTextToConnectionOptions
  ): Promise<void>;
  public async sendToConnection(
    connectionId: string,
    message: RequestBodyType | JSONTypes,
    options: HubSendToConnectionOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-sendToConnection",
      options
    );
    const { contentType, payload } = getPayloadForMessage(message, updatedOptions);

    try {
      return await this.client.webPubSub.sendToConnection(
        this.hubName,
        connectionId,
        contentType,
        payload as any,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Check if a specific connection is connected to this hub
   *
   * @param connectionId - Connection id to check
   * @param options - Additional options
   */
  public async hasConnection(
    connectionId: string,
    options: HasConnectionOptions = {}
  ): Promise<boolean> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-hasConnection",
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

      await this.client.webPubSub.connectionExists(this.hubName, connectionId, {
        ...updatedOptions,
        onResponse
      });

      if (response?.status === 200) {
        return true;
      } else if (response?.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(response?.bodyAsText!, {
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
   * Close a specific connection to this hub
   *
   * @param connectionId - Connection id to close
   * @param options - Additional options
   */
  public async closeConnection(
    connectionId: string,
    options: CloseConnectionOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-removeConnection",
      options
    );

    try {
      return await this.client.webPubSub.closeClientConnection(
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
   * @param userId - The user id to remove from all groups
   * @param options - Additional options
   */
  public async removeUserFromAllGroups(
    userId: string,
    options: CloseConnectionOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-removeUserFromAllGroups",
      options
    );

    try {
      await this.client.webPubSub.removeUserFromAllGroups(this.hubName, userId, updatedOptions);
    } finally {
      span.end();
    }
  }

  /**
   * Check if a particular group exists (i.e. has active connections).
   *
   * @param groupName - The group name to check for
   * @param options - Additional options
   */
  public async hasGroup(groupName: string, options: HubHasGroupOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-hub-hasGroup", options);

    try {
      let response: FullOperationResponse | undefined;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        response = rawResponse;
        if (updatedOptions.onResponse) {
          updatedOptions.onResponse(rawResponse, flatResponse);
        }
      }
      await this.client.webPubSub.groupExists(this.hubName, groupName, {
        ...updatedOptions,
        onResponse
      });

      if (response?.status === 200) {
        return true;
      } else if (response?.status === 404) {
        return false;
      } else {
        throw new RestError(response?.bodyAsText!, {
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
   * Check if a particular user is connected to this hub.
   *
   * @param username - The user name to check for
   * @param options - Additional options
   */
  public async hasUser(username: string, options: HubHasUserOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-hub-hasUser", options);

    try {
      let response: FullOperationResponse | undefined;
      function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
        response = rawResponse;
        if (updatedOptions.onResponse) {
          updatedOptions.onResponse(rawResponse, flatResponse);
        }
      }
      await this.client.webPubSub.userExists(this.hubName, username, {
        ...updatedOptions,
        onResponse
      });

      if (response?.status === 200) {
        return true;
      } else if (response?.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(response?.bodyAsText!, {
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
   * Grant permissions to a connection
   *
   * @param connectionId - The connection id to grant permissions to
   * @param Permission - The permission to grant
   * @param options - Additional options
   */
  public async grantPermission(
    connectionId: string,
    permission: Permission,
    options: HubGrantPermissionOptions = {}
  ) {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-grantPermission",
      options
    );

    try {
      return await this.client.webPubSub.grantPermission(
        this.hubName,
        permission,
        connectionId,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Revoke permissions from a connection
   *
   * @param connectionId - The connection id to revoke permissions from
   * @param Permission - The permission to revoke
   * @param options - Additional options
   */
  public async revokePermission(
    connectionId: string,
    permission: Permission,
    options: HubRevokePermissionOptions = {}
  ) {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-revokePermission",
      options
    );

    try {
      return await this.client.webPubSub.revokePermission(
        this.hubName,
        permission,
        connectionId,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Check if the connection has the specified permission
   *
   * @param connectionId - The connection id to check permission
   * @param Permission - The permission to check
   * @param options - Additional options
   */
  public async hasPermission(
    connectionId: string,
    permission: Permission,
    options: HubHasPermissionOptions = {}
  ): Promise<boolean> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-hasPermission",
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
      await this.client.webPubSub.checkPermission(this.hubName, permission, connectionId, {
        ...updatedOptions,
        onResponse
      });

      if (response?.status === 200) {
        return true;
      } else if (response?.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(response?.bodyAsText!, {
          statusCode: response?.status,
          request: response?.request,
          response: response
        });
      }
    } finally {
      span.end();
    }
  }
}
