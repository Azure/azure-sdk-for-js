// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BookshelfClientOptionalParams, createBookshelf } from "./api/index.js";
import {
  KnowledgeBasesOperations,
  _getKnowledgeBasesOperations,
} from "./classic/knowledgeBases/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { BookshelfClientOptionalParams } from "./api/bookshelfContext.js";

export class BookshelfClient {
  private _client: Client.BookshelfContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    endpointParam: string,
    credential: TokenCredential,
    options: BookshelfClientOptionalParams = {},
  ) {
    this._client = createBookshelf(endpointParam, credential, options);
    this.pipeline = this._client.pipeline;
    this.knowledgeBases = _getKnowledgeBasesOperations(this._client);
  }

  /** The operation groups for knowledgeBases */
  public readonly knowledgeBases: KnowledgeBasesOperations;
}
