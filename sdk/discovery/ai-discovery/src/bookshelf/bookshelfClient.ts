// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { BookshelfClientOptionalParams, BookshelfContext, createBookshelf } from "./api/index.js";
import {
  KnowledgeBasesOperations,
  _getKnowledgeBasesOperations,
} from "./classic/knowledgeBases/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { BookshelfClientOptionalParams } from "./api/bookshelfContext.js";

/**
 * Client for the Microsoft Discovery Bookshelf service. Exposes the `knowledgeBases`
 * operation group for managing and querying knowledge bases.
 */
export class BookshelfClient {
  private _client: BookshelfContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Creates an instance of `BookshelfClient`.
   *
   * @param endpointParam - The Discovery Bookshelf endpoint, for example
   *   `https://<region>.bookshelf.discovery.microsoft.com`.
   * @param credential - Credential used to authenticate requests to the service.
   * @param options - Optional parameters for configuring the client.
   */
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
