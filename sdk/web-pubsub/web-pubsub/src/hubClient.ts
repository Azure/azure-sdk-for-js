// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommonClientOptions, FullOperationResponse, OperationOptions } from "@azure/core-client";
import { RestError, RequestBodyType } from "@azure/core-rest-pipeline";
import { GeneratedClient } from "./generated/generatedClient";
import { WebPubSubGroup, WebPubSubGroupImpl } from "./groupClient";
import { AzureKeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { webPubSubKeyCredentialPolicy } from "./webPubSubCredentialPolicy";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { parseConnectionString } from "./parseConnectionString";
import jwt from "jsonwebtoken";
import { getPayloadForMessage } from "./utils";
import { GeneratedClientOptionalParams } from "./generated";
import { webPubSubReverseProxyPolicy } from "./reverseProxyPolicy";

/**
 * Options for closing a connection to a hub.
 */
export interface HubCloseConnectionOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * Options for closing all connections to a hub.
 */
export interface HubCloseAllConnectionsOptions extends OperationOptions {
  /**
   * Reason the connection is being closed.
   */
  reason?: string;
}

/**
 * Options for closing all of a user's connections to a hub.
 */
export interface HubCloseUserConnectionsOptions extends OperationOptions {
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
// eslint-disable-next-line @typescript-eslint/ban-types
export type JSONTypes = string | number | boolean | object;

/**
 * Options for constructing a HubAdmin client.
 */
export interface WebPubSubServiceClientOptions extends CommonClientOptions {
  /**
   * Reverse proxy endpoint (for example, your Azure API management endpoint)
   */
  reverseProxyEndpoint?: string;
}

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
export interface HubRemoveUserFromAllGroupsOptions extends HubCloseConnectionOptions {}

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
 * Options for checking if a connection has the specified permission
 */
export interface HubHasPermissionOptions extends OperationOptions {
  /**
   * The meaning of the target depends on the specific permission.
   * For joinLeaveGroup and sendToGroup, targetName is a required parameter standing for the group name.
   */
  targetName?: string;
}

/**
 * Options for generating a token to connect a client to the Azure Web Pubsub service.
 */
export interface GenerateClientTokenOptions extends OperationOptions {
  /**
   * The userId for the client.
   */
  userId?: string;

  /**
   * The roles that the connection with the generated token will have.
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
   * Minutes until the token expires.
   */
  expirationTimeInMinutes?: number;
}

/**
 * A response containing the client token.
 */
export interface ClientTokenResponse {
  /**
   * The client token.
   */
  token: string;
  /**
   * The URL client connects to
   */
  baseUrl: string;
  /**
   * The URL client connects to with access_token query string
   */
  url: string;
}

/**
 * Client for connecting to a Web PubSub hub
 */
export class WebPubSubServiceClient {
  private readonly client: GeneratedClient;
  private credential!: AzureKeyCredential | TokenCredential;
  private readonly clientOptions?: WebPubSubServiceClientOptions;

  /**
   * The name of the hub this client is connected to
   */
  public readonly hubName: string;
  /**
   * The Web PubSub API version being used by this client
   */
  public readonly apiVersion: string = "2021-10-01";

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
  constructor(connectionString: string, hubName: string, options?: WebPubSubServiceClientOptions);

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
    credential: AzureKeyCredential | TokenCredential,
    hubName: string,
    options?: WebPubSubServiceClientOptions
  );
  constructor(
    endpointOrConnectionString: string,
    credsOrHubName?: AzureKeyCredential | TokenCredential | string,
    hubNameOrOpts?: string | WebPubSubServiceClientOptions,
    opts?: WebPubSubServiceClientOptions
  ) {
    // unpack constructor arguments
    if (typeof credsOrHubName === "object") {
      this.endpoint = endpointOrConnectionString;
      this.hubName = hubNameOrOpts as string;
      this.clientOptions = opts;
      this.credential = credsOrHubName;
    } else {
      const parsedCs = parseConnectionString(endpointOrConnectionString);
      this.endpoint = parsedCs.endpoint;
      this.credential = parsedCs.credential;
      this.hubName = credsOrHubName as string;
      this.clientOptions = hubNameOrOpts as WebPubSubServiceClientOptions;
    }

    const internalPipelineOptions: GeneratedClientOptionalParams = {
      ...this.clientOptions,
      ...{
        apiVersion: this.apiVersion,
        loggingOptions: {
          logger: logger.info
        }
      },
      ...(isTokenCredential(this.credential)
        ? {
            credential: this.credential,
            credentialScopes: ["https://webpubsub.azure.com/.default"]
          }
        : {})
    };

    this.client = new GeneratedClient(this.endpoint, internalPipelineOptions);

    if (!isTokenCredential(this.credential)) {
      this.client.pipeline.addPolicy(webPubSubKeyCredentialPolicy(this.credential));
    }

    if (this.clientOptions?.reverseProxyEndpoint) {
      this.client.pipeline.addPolicy(
        webPubSubReverseProxyPolicy(this.clientOptions?.reverseProxyEndpoint)
      );
    }
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
  // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
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
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-hub-sendToAll", options);

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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
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
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
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
  public async connectionExists(
    connectionId: string,
    options: HasConnectionOptions = {}
  ): Promise<boolean> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-hasConnection",
      options
    );

    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (updatedOptions.onResponse) {
        updatedOptions.onResponse(rawResponse, flatResponse);
      }
    }

    try {
      await this.client.webPubSub.connectionExists(this.hubName, connectionId, {
        ...updatedOptions,
        onResponse
      });

      if (response!.status === 200) {
        return true;
      } else if (response!.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(response!.bodyAsText!, {
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
    options: HubCloseConnectionOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-closeConnection",
      options
    );

    try {
      return await this.client.webPubSub.closeConnection(
        this.hubName,
        connectionId,
        updatedOptions
      );
    } finally {
      span.end();
    }
  }

  /**
   * Close all connections to this hub
   *
   * @param options - Additional options
   */
  public async closeAllConnections(options: HubCloseAllConnectionsOptions = {}): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-closeAllConnections",
      options
    );

    try {
      return await this.client.webPubSub.closeAllConnections(this.hubName, updatedOptions);
    } finally {
      span.end();
    }
  }

  /**
   * Close all connections with the given user id
   *
   * @param user - User id to close
   * @param options - Additional options
   */
  public async closeUserConnections(
    userId: string,
    options: HubCloseUserConnectionsOptions = {}
  ): Promise<void> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-closeUserConnections",
      options
    );

    try {
      return await this.client.webPubSub.closeUserConnections(this.hubName, userId, updatedOptions);
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
    options: HubCloseConnectionOptions = {}
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
  public async groupExists(groupName: string, options: HubHasGroupOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-hub-hasGroup", options);
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (updatedOptions.onResponse) {
        updatedOptions.onResponse(rawResponse, flatResponse);
      }
    }

    try {
      await this.client.webPubSub.groupExists(this.hubName, groupName, {
        ...updatedOptions,
        onResponse
      });

      if (response!.status === 200) {
        return true;
      } else if (response!.status === 404) {
        return false;
      } else {
        throw new RestError(response!.bodyAsText!, {
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
  public async userExists(username: string, options: HubHasUserOptions = {}): Promise<boolean> {
    const { span, updatedOptions } = createSpan("WebPubSubServiceClient-hub-hasUser", options);

    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (updatedOptions.onResponse) {
        updatedOptions.onResponse(rawResponse, flatResponse);
      }
    }

    try {
      await this.client.webPubSub.userExists(this.hubName, username, {
        ...updatedOptions,
        onResponse
      });

      if (response!.status === 200) {
        return true;
      } else if (response!.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(response!.bodyAsText!, {
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
  ): Promise<void> {
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
  ): Promise<void> {
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
    let response: FullOperationResponse | undefined;
    function onResponse(rawResponse: FullOperationResponse, flatResponse: unknown): void {
      response = rawResponse;
      if (updatedOptions.onResponse) {
        updatedOptions.onResponse(rawResponse, flatResponse);
      }
    }

    try {
      await this.client.webPubSub.checkPermission(this.hubName, permission, connectionId, {
        ...updatedOptions,
        onResponse
      });

      if (response!.status === 200) {
        return true;
      } else if (response!.status === 404) {
        return false;
      } else {
        // this is sad - wish this was handled by autorest.
        throw new RestError(response!.bodyAsText!, {
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
   * Generate a token for a client to connect to the Azure Web PubSub service.
   *
   * @param options - Additional options
   */
  public async getClientAccessToken(
    options: GenerateClientTokenOptions = {}
  ): Promise<ClientTokenResponse> {
    const { span, updatedOptions } = createSpan(
      "WebPubSubServiceClient-hub-generateClientToken",
      options
    );

    try {
      const endpoint = this.endpoint.endsWith("/") ? this.endpoint : this.endpoint + "/";
      const clientEndpoint = endpoint.replace(/(http)(s?:\/\/)/gi, "ws$2");
      const baseUrl = `${clientEndpoint}client/hubs/${this.hubName}`;

      let token: string;
      if (isTokenCredential(this.credential)) {
        const response = await this.client.webPubSub.generateClientToken(
          this.hubName,
          updatedOptions
        );
        token = response.token!;
      } else {
        const key = this.credential.key;
        const audience = `${endpoint}client/hubs/${this.hubName}`;
        const payload = { role: options?.roles };
        const signOptions: jwt.SignOptions = {
          audience: audience,
          expiresIn:
            options?.expirationTimeInMinutes === undefined
              ? "1h"
              : `${options.expirationTimeInMinutes}m`,
          algorithm: "HS256"
        };
        if (options?.userId) {
          signOptions.subject = options?.userId;
        }
        token = jwt.sign(payload, key, signOptions);
      }

      return {
        token,
        baseUrl,
        url: `${baseUrl}?access_token=${token}`
      };
    } finally {
      span.end();
    }
  }
}
