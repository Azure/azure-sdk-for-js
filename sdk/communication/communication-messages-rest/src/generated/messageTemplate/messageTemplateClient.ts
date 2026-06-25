// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  MessageTemplateContext,
  MessageTemplateClientOptionalParams,
  createMessageTemplate,
} from "./api/index.js";
import { MessageTemplateItemUnion } from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { listTemplates } from "./api/operations.js";
import { ListTemplatesOptionalParams } from "./api/options.js";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MessageTemplateClientOptionalParams } from "./api/messageTemplateContext.js";

export class MessageTemplateClient {
  private _client: MessageTemplateContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential | KeyCredential,
    options: MessageTemplateClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMessageTemplate(endpointParam, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** List all templates for given Azure Communication Services channel */
  listTemplates(
    channelId: string,
    options: ListTemplatesOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<MessageTemplateItemUnion> {
    return listTemplates(this._client, channelId, options);
  }
}
