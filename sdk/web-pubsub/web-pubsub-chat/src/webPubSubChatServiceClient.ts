// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebPubSubChatServiceContext,
  WebPubSubChatServiceClientOptionalParams,
  createWebPubSubChatService,
} from "./api/index.js";
import {
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
import {
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
import {
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
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { TokenCredential, AzureKeyCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { parseConnectionString } from "./parseConnectionString.js";
import { webPubSubChatCredentialPolicy } from "./webPubSubChatCredentialPolicy.js";
import { webPubSubReverseProxyPolicy } from "./reverseProxyPolicy.js";
import type { ClientAccessToken, GetClientAccessTokenOptions } from "./models/clientToken.js";

export type { WebPubSubChatServiceClientOptionalParams } from "./api/webPubSubChatServiceContext.js";

export interface WebPubSubChatServiceClientOptions extends WebPubSubChatServiceClientOptionalParams {
  /** The reverse proxy endpoint (e.g. APIM gateway URL). */
  reverseProxyEndpoint?: string;
}

const chatClientRoles = ["webpubsub.getGroupState", "webpubsub.setGroupState"];

/** A client for managing chat resources in an Azure Web PubSub Chat hub. */
export class WebPubSubChatServiceClient {
  private _client: WebPubSubChatServiceContext;
  private _webPubSubServiceClient: WebPubSubServiceClient;
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
      credential = new AzureKeyCredential(parsed.accessKey);
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

    if (credential instanceof AzureKeyCredential) {
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

    // Create an internal WebPubSubServiceClient for token generation.
    // TODO: In the next version, consider propagating the remaining compatible client options
    // or sharing the pipeline.
    const webPubSubOptions = options.reverseProxyEndpoint
      ? { reverseProxyEndpoint: options.reverseProxyEndpoint }
      : undefined;
    if (isConnectionString) {
      this._webPubSubServiceClient = new WebPubSubServiceClient(
        endpointOrConnectionString,
        hub,
        webPubSubOptions,
      );
    } else {
      this._webPubSubServiceClient = new WebPubSubServiceClient(
        endpoint,
        credential,
        hub,
        webPubSubOptions,
      );
    }

    this.pipeline = this._client.pipeline;
  }

  /** Delete a user. */
  deleteUser(
    userId: string,
    options: DeleteUserOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteUser(this._client, userId, options);
  }

  /** Create or replace a user. The request body is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
  createOrReplaceUser(
    userId: string,
    resource: ChatUserInputUnion,
    options: CreateOrReplaceUserOptionalParams = { requestOptions: {} },
  ): Promise<ChatUserUnion> {
    return createOrReplaceUser(this._client, userId, resource, options);
  }

  /** Get a user's profile. The response is a polymorphic `ChatUser` (e.g. `HumanChatUser`) selected by the `kind` discriminator. */
  getUser(
    userId: string,
    options: GetUserOptionalParams = { requestOptions: {} },
  ): Promise<ChatUserUnion> {
    return getUser(this._client, userId, options);
  }

  /** Delete a room member. */
  deleteRoomMember(
    roomId: string,
    userId: string,
    options: DeleteRoomMemberOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteRoomMember(this._client, roomId, userId, options);
  }

  /** Create or replace a room member. */
  createOrReplaceRoomMember(
    roomId: string,
    userId: string,
    resource: ChatRoomMemberInput,
    options: CreateOrReplaceRoomMemberOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoomMember> {
    return createOrReplaceRoomMember(this._client, roomId, userId, resource, options);
  }

  /** Get room members. */
  listRoomMembers(
    roomId: string,
    options: ListRoomMembersOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRoomMember> {
    return listRoomMembers(this._client, roomId, options);
  }

  /** Delete a room. */
  deleteRoom(
    roomId: string,
    options: DeleteRoomOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteRoom(this._client, roomId, options);
  }

  /** Get room information. */
  getRoom(
    roomId: string,
    options: GetRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return getRoom(this._client, roomId, options);
  }

  /** Create or replace a room with a client-specified ID. */
  createOrReplaceRoom(
    roomId: string,
    resource: ChatRoomInput,
    options: CreateOrReplaceRoomOptionalParams = { requestOptions: {} },
  ): Promise<ChatRoom> {
    return createOrReplaceRoom(this._client, roomId, resource, options);
  }

  /** Delete a role. */
  deleteRole(
    roleName: string,
    options: DeleteRoleOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteRole(this._client, roleName, options);
  }

  /** Create or replace a role. */
  createOrReplaceRole(
    roleName: string,
    resource: ChatRoleInput,
    options: CreateOrReplaceRoleOptionalParams = { requestOptions: {} },
  ): Promise<ChatRole> {
    return createOrReplaceRole(this._client, roleName, resource, options);
  }

  /** Get role information. */
  getRole(
    roleName: string,
    options: GetRoleOptionalParams = { requestOptions: {} },
  ): Promise<ChatRole> {
    return getRole(this._client, roleName, options);
  }

  /** Query roles in a hub. */
  listRoles(
    options: ListRolesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatRole> {
    return listRoles(this._client, options);
  }

  /** Update a message. */
  updateMessage(
    conversationId: string,
    messageId: string,
    resource: ChatMessageInput,
    options: UpdateMessageOptionalParams = { requestOptions: {} },
  ): Promise<ChatMessage> {
    return updateMessage(this._client, conversationId, messageId, resource, options);
  }

  /** Delete a message. */
  deleteMessage(
    conversationId: string,
    messageId: string,
    options: DeleteMessageOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteMessage(this._client, conversationId, messageId, options);
  }

  /** Query messages in a conversation from latest to earliest. */
  listMessages(
    conversationId: string,
    options: ListMessagesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ChatMessage> {
    return listMessages(this._client, conversationId, options);
  }

  /** Get conversation information. */
  getConversation(
    conversationId: string,
    options: GetConversationOptionalParams = { requestOptions: {} },
  ): Promise<ChatConversation> {
    return getConversation(this._client, conversationId, options);
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
    return this._webPubSubServiceClient.getClientAccessToken({
      ...options,
      roles: chatClientRoles,
    });
  }
}
