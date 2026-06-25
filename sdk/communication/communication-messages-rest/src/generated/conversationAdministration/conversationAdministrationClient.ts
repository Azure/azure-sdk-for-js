// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ConversationAdministrationContext,
  ConversationAdministrationClientOptionalParams,
  createConversationAdministration,
} from "./api/index.js";
import {
  CommunicationConversation,
  ConversationMessageItem,
  AddParticipantsOptions,
  AddParticipantsResult,
  RemoveParticipantsOptions,
  RemoveParticipantsResult,
  GetConversationThreadAnalysisResult,
} from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import {
  analyzeConversation,
  removeParticipants,
  addParticipants,
  listMessages,
  listConversations,
  terminateConversation,
  deleteConversation,
  getConversation,
  createConversation,
} from "./api/operations.js";
import {
  AnalyzeConversationOptionalParams,
  RemoveParticipantsOptionalParams,
  AddParticipantsOptionalParams,
  ListMessagesOptionalParams,
  ListConversationsOptionalParams,
  TerminateConversationOptionalParams,
  DeleteConversationOptionalParams,
  GetConversationOptionalParams,
  CreateConversationOptionalParams,
} from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { ConversationAdministrationClientOptionalParams } from "./api/conversationAdministrationContext.js";

export class ConversationAdministrationClient {
  private _client: ConversationAdministrationContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential | KeyCredential,
    options: ConversationAdministrationClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createConversationAdministration(endpointParam, credential, {
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

  /** Terminates a specific conversation. */
  terminateConversation(
    conversationId: string,
    options: TerminateConversationOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return terminateConversation(this._client, conversationId, options);
  }

  /** Deletes a specific conversation. */
  deleteConversation(
    conversationId: string,
    options: DeleteConversationOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return deleteConversation(this._client, conversationId, options);
  }

  /** Gets the details of a specific conversation. */
  getConversation(
    conversationId: string,
    options: GetConversationOptionalParams = { requestOptions: {} },
  ): Promise<CommunicationConversation> {
    return getConversation(this._client, conversationId, options);
  }

  /** Creates a new conversation. This is only for create operation. */
  createConversation(
    conversation: CommunicationConversation,
    options: CreateConversationOptionalParams = { requestOptions: {} },
  ): Promise<CommunicationConversation> {
    return createConversation(this._client, conversation, options);
  }
}
