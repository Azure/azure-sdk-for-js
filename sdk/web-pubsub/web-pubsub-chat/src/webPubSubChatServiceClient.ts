// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  WebPubSubChatServiceContext,
  WebPubSubChatServiceClientOptionalParams,
} from "./api/index.js";
import { createWebPubSubChatService } from "./api/index.js";
import {
  generateClientToken as generatedGenerateClientToken,
  deleteUser,
  createOrReplaceUser,
  getUser,
  deleteRoomMember,
  createOrReplaceRoomMember,
  listRoomMembers,
  deleteRoom,
  getRoom,
  createOrReplaceRoom,
  deleteRole,
  createOrReplaceRole,
  getRole,
  listRoles,
  updateMessage,
  deleteMessage,
  listMessages,
  getConversation,
} from "./api/operations.js";
import type {
  DeleteUserOptionalParams,
  CreateOrReplaceUserOptionalParams,
  GetUserOptionalParams,
  DeleteRoomMemberOptionalParams,
  CreateOrReplaceRoomMemberOptionalParams,
  ListRoomMembersOptionalParams,
  DeleteRoomOptionalParams,
  GetRoomOptionalParams,
  CreateOrReplaceRoomOptionalParams,
  DeleteRoleOptionalParams,
  CreateOrReplaceRoleOptionalParams,
  GetRoleOptionalParams,
  ListRolesOptionalParams,
  UpdateMessageOptionalParams,
  DeleteMessageOptionalParams,
  ListMessagesOptionalParams,
  GetConversationOptionalParams,
} from "./api/options.js";
import type {
  ChatConversation,
  ChatMessage,
  ChatMessageInput,
  ChatRole,
  ChatRoleInput,
  ChatRoom,
  ChatRoomInput,
  ChatRoomMember,
  ChatRoomMemberInput,
  ChatUserInputUnion,
  ChatUserUnion,
} from "./models/models.js";
import type { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import type { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { isKeyCredential, isTokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";
import { parseConnectionString } from "./parseConnectionString.js";
import { webPubSubChatCredentialPolicy } from "./webPubSubChatCredentialPolicy.js";
import { webPubSubReverseProxyPolicy } from "./reverseProxyPolicy.js";
import type { ClientAccessToken, GetClientAccessTokenOptions } from "./models/clientToken.js";
import { tracingClient } from "./tracing.js";
import jwt from "jsonwebtoken";

export type { WebPubSubChatServiceClientOptionalParams } from "./api/webPubSubChatServiceContext.js";

/** Options for configuring the Web PubSub Chat service client. */
export interface WebPubSubChatServiceClientOptions extends WebPubSubChatServiceClientOptionalParams {
  /** The reverse proxy endpoint (e.g. APIM gateway URL). */
  reverseProxyEndpoint?: string;
}

const chatClientRoles = ["webpubsub.getGroupState", "webpubsub.setGroupState"];

/** A client for managing chat resources in an Azure Web PubSub Chat hub. */
export class WebPubSubChatServiceClient {
  private _client: WebPubSubChatServiceContext;
  readonly #credential: TokenCredential | AzureKeyCredential;
  private endpoint: string;
  private hub: string;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Create from connection string */
  constructor(connectionString: string, hub: string, options?: WebPubSubChatServiceClientOptions);
  /** Create from endpoint and credential */
  constructor(
    endpointParam: string,
    credential: TokenCredential | AzureKeyCredential,
    hub: string,
    options?: WebPubSubChatServiceClientOptions,
  );
  constructor(
    endpointOrConnectionString: string,
    credentialOrHub: TokenCredential | AzureKeyCredential | string,
    hubOrOptions?: string | WebPubSubChatServiceClientOptions,
    maybeOptions?: WebPubSubChatServiceClientOptions,
  ) {
    const isConnectionString = typeof credentialOrHub === "string";

    let endpoint: string;
    let credential: TokenCredential | AzureKeyCredential;
    let hub: string;
    let options: WebPubSubChatServiceClientOptions;

    if (isConnectionString) {
      const parsed = parseConnectionString(endpointOrConnectionString);
      endpoint = parsed.endpoint;
      credential = parsed.credential;
      hub = credentialOrHub;
      options = (hubOrOptions as WebPubSubChatServiceClientOptions) ?? {};
    } else {
      endpoint = endpointOrConnectionString;
      credential = credentialOrHub as TokenCredential | AzureKeyCredential;
      hub = hubOrOptions as string;
      options = maybeOptions ?? {};
    }

    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;

    if (isKeyCredential(credential)) {
      const { credentials: _creds, ...restOptions } = options;
      this._client = createWebPubSubChatService(
        endpoint,
        undefined as unknown as TokenCredential,
        hub,
        {
          ...restOptions,
          userAgentOptions: { userAgentPrefix },
          credentials: undefined,
        },
      );
      this._client.pipeline.addPolicy(webPubSubChatCredentialPolicy(credential));
    } else {
      this._client = createWebPubSubChatService(endpoint, credential, hub, {
        ...options,
        userAgentOptions: { userAgentPrefix },
      });
    }

    if (options.reverseProxyEndpoint) {
      this._client.pipeline.addPolicy(webPubSubReverseProxyPolicy(options.reverseProxyEndpoint));
    }

    this.#credential = credential;
    this.endpoint = endpoint;
    this.hub = hub;
    this.pipeline = this._client.pipeline;
  }

  /** Delete a user. */
  deleteUser(
    userId: string,
    options: DeleteUserOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.deleteUser",
      options,
      (updatedOptions) => deleteUser(this._client, userId, updatedOptions),
    );
  }

  /** Create or replace a user. The request body is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
  createOrReplaceUser(
    userId: string,
    resource: ChatUserInputUnion,
    options: CreateOrReplaceUserOptionalParams = { requestOptions: {} },
  ): Promise<ChatUserUnion> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.createOrReplaceUser",
      options,
      (updatedOptions) => createOrReplaceUser(this._client, userId, resource, updatedOptions),
    );
  }

  /** Get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
  getUser(
    userId: string,
    options: GetUserOptionalParams = { requestOptions: {} },
  ): Promise<ChatUserUnion> {
    return tracingClient.withSpan("WebPubSubChatServiceClient.getUser", options, (updatedOptions) =>
      getUser(this._client, userId, updatedOptions),
    );
  }

  /** Delete a room member. */
  deleteRoomMember(
    roomId: string,
    userId: string,
    options: DeleteRoomMemberOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.deleteRoomMember",
      options,
      (updatedOptions) => deleteRoomMember(this._client, roomId, userId, updatedOptions),
    );
  }

  /** Create or replace a room member. */
  createOrReplaceRoomMember(
    roomId: string,
    userId: string,
    resource: ChatRoomMemberInput,
    options: CreateOrReplaceRoomMemberOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoomMember> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.createOrReplaceRoomMember",
      options,
      (updatedOptions) =>
        createOrReplaceRoomMember(this._client, roomId, userId, resource, updatedOptions),
    );
  }

  /** Get room members. */
  listRoomMembers(
    roomId: string,
    options: ListRoomMembersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRoomMember> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "WebPubSubChatServiceClient.listRoomMembers",
      options,
    );
    try {
      return listRoomMembers(this._client, roomId, updatedOptions);
    } catch (error: unknown) {
      span.setStatus({ status: "error", error: error instanceof Error ? error : String(error) });
      throw error;
    } finally {
      span.end();
    }
  }

  /** Delete a room. */
  deleteRoom(
    roomId: string,
    options: DeleteRoomOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.deleteRoom",
      options,
      (updatedOptions) => deleteRoom(this._client, roomId, updatedOptions),
    );
  }

  /** Get room information. */
  getRoom(
    roomId: string,
    options: GetRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return tracingClient.withSpan("WebPubSubChatServiceClient.getRoom", options, (updatedOptions) =>
      getRoom(this._client, roomId, updatedOptions),
    );
  }

  /** Create or replace a room with a client-specified ID. */
  createOrReplaceRoom(
    roomId: string,
    resource: ChatRoomInput,
    options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.createOrReplaceRoom",
      options,
      (updatedOptions) => createOrReplaceRoom(this._client, roomId, resource, updatedOptions),
    );
  }

  /** Delete a role. */
  deleteRole(
    roleName: string,
    options: DeleteRoleOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.deleteRole",
      options,
      (updatedOptions) => deleteRole(this._client, roleName, updatedOptions),
    );
  }

  /** Create or replace a role. */
  createOrReplaceRole(
    roleName: string,
    resource: ChatRoleInput,
    options: CreateOrReplaceRoleOptionalParams = { requestOptions: {} },
  ): Promise<ChatRole> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.createOrReplaceRole",
      options,
      (updatedOptions) => createOrReplaceRole(this._client, roleName, resource, updatedOptions),
    );
  }

  /** Get role information. */
  getRole(
    roleName: string,
    options: GetRoleOptionalParams = { requestOptions: {} },
  ): Promise<ChatRole> {
    return tracingClient.withSpan("WebPubSubChatServiceClient.getRole", options, (updatedOptions) =>
      getRole(this._client, roleName, updatedOptions),
    );
  }

  /** Query roles in a hub. */
  listRoles(
    options: ListRolesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRole> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "WebPubSubChatServiceClient.listRoles",
      options,
    );
    try {
      return listRoles(this._client, updatedOptions);
    } catch (error: unknown) {
      span.setStatus({ status: "error", error: error instanceof Error ? error : String(error) });
      throw error;
    } finally {
      span.end();
    }
  }

  /** Update a message. */
  updateMessage(
    conversationId: string,
    messageId: string,
    resource: ChatMessageInput,
    options: UpdateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ChatMessage> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.updateMessage",
      options,
      (updatedOptions) =>
        updateMessage(this._client, conversationId, messageId, resource, updatedOptions),
    );
  }

  /** Delete a message. */
  deleteMessage(
    conversationId: string,
    messageId: string,
    options: DeleteMessageOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.deleteMessage",
      options,
      (updatedOptions) => deleteMessage(this._client, conversationId, messageId, updatedOptions),
    );
  }

  /** Query messages in a conversation from latest to earliest. */
  listMessages(
    conversationId: string,
    options: ListMessagesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatMessage> {
    const { span, updatedOptions } = tracingClient.startSpan(
      "WebPubSubChatServiceClient.listMessages",
      options,
    );
    try {
      return listMessages(this._client, conversationId, updatedOptions);
    } catch (error: unknown) {
      span.setStatus({ status: "error", error: error instanceof Error ? error : String(error) });
      throw error;
    } finally {
      span.end();
    }
  }

  /** Get conversation information. */
  getConversation(
    conversationId: string,
    options: GetConversationOptionalParams = { requestOptions: {} },
  ): Promise<ChatConversation> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.getConversation",
      options,
      (updatedOptions) => getConversation(this._client, conversationId, updatedOptions),
    );
  }

  /**
   * Generate a token for a client to connect to the Azure Web PubSub service.
   *
   * When using AzureKeyCredential, the token is generated locally using JWT signing.
   * When using TokenCredential, the token is generated by calling the Web PubSub
   * service's REST API.
   */
  async getClientAccessToken(
    options: GetClientAccessTokenOptions = {},
  ): Promise<ClientAccessToken> {
    return tracingClient.withSpan(
      "WebPubSubChatServiceClient.getClientAccessToken",
      options,
      async (updatedOptions) => {
        const endpoint = this.endpoint.endsWith("/") ? this.endpoint : this.endpoint + "/";
        const clientEndpoint = endpoint.replace(/(http)(s?:\/\/)/gi, "ws$2");
        const clientPath = `client/hubs/${this.hub}`;
        const baseUrl = clientEndpoint + clientPath;

        let token: string;
        if (isTokenCredential(this.#credential)) {
          const response = await generatedGenerateClientToken(this._client, {
            ...updatedOptions,
            minutesToExpire: updatedOptions.expirationTimeInMinutes,
            role: chatClientRoles,
          });
          token = response.token;
        } else {
          const key = this.#credential.key;
          const audience = endpoint + clientPath;
          const payload = { role: chatClientRoles };
          const signOptions: jwt.SignOptions = {
            audience,
            expiresIn:
              updatedOptions.expirationTimeInMinutes === undefined
                ? "1h"
                : `${updatedOptions.expirationTimeInMinutes}m`,
            algorithm: "HS256",
          };
          if (updatedOptions.userId) {
            signOptions.subject = updatedOptions.userId;
          }
          token = jwt.sign(payload, key, signOptions);
        }

        return {
          token,
          baseUrl,
          url: `${baseUrl}?access_token=${token}`,
        };
      },
    );
  }
}
