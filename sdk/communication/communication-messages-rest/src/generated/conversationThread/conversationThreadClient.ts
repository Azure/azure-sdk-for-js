// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConversationThreadContext,
  ConversationThreadClientOptionalParams,
  createConversationThread,
} from "./api/index.js";
import {
  CommunicationConversation,
  ConversationMessageItem,
  AddParticipantsOptions,
  AddParticipantsResult,
  RemoveParticipantsOptions,
  RemoveParticipantsResult,
  GetConversationThreadAnalysisResult,
  SendConversationMessageOptions,
  SendConversationMessageResult,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  analyzeConversation,
  sendMessage,
  listMessages,
  listConversations,
  removeParticipants,
  addParticipants,
} from "./api/operations.js";
import {
  AnalyzeConversationOptionalParams,
  SendMessageOptionalParams,
  ListMessagesOptionalParams,
  ListConversationsOptionalParams,
  RemoveParticipantsOptionalParams,
  AddParticipantsOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ConversationThreadClientOptionalParams } from "./api/conversationThreadContext.js";

export class ConversationThreadClient {
  private _client: ConversationThreadContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential | KeyCredential,
    options: ConversationThreadClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createConversationThread(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** Get AI Analysis of a conversation. */
  analyzeConversation(
    conversationId: string,
    options: AnalyzeConversationOptionalParams = { requestOptions: {} },
  ): Promise<GetConversationThreadAnalysisResult> {
    return analyzeConversation(this._client, conversationId, options);
  }

  /** Sends a conversation message from Business to User. */
  sendMessage(
    conversationId: string,
    options: SendConversationMessageOptions,
    optionalParams: SendMessageOptionalParams = { requestOptions: {} },
  ): Promise<SendConversationMessageResult> {
    return sendMessage(this._client, conversationId, options, optionalParams);
  }

  /** Retrieves list of conversation messages. */
  listMessages(
    conversationId: string,
    options: ListMessagesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<ConversationMessageItem> {
    return listMessages(this._client, conversationId, options);
  }

  /** Retrieves list of conversations. */
  listConversations(
    options: ListConversationsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<CommunicationConversation> {
    return listConversations(this._client, options);
  }

  /** remove a participant from a conversation */
  removeParticipants(
    conversationId: string,
    options: RemoveParticipantsOptions,
    optionalParams: RemoveParticipantsOptionalParams = { requestOptions: {} },
  ): Promise<RemoveParticipantsResult> {
    return removeParticipants(this._client, conversationId, options, optionalParams);
  }

  /** Adds participants to a specific conversation. */
  addParticipants(
    conversationId: string,
    options: AddParticipantsOptions,
    optionalParams: AddParticipantsOptionalParams = { requestOptions: {} },
  ): Promise<AddParticipantsResult> {
    return addParticipants(this._client, conversationId, options, optionalParams);
  }
}
