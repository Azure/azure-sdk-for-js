// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "../client";
import type { ClientContext } from "../ClientContext";
import { ResourceType } from "../common/constants";
import { DiagnosticNodeInternal, DiagnosticNodeType } from "../diagnostics/DiagnosticNodeInternal";
import type { SqlQuerySpec, FetchFunctionCallback } from "../queryExecutionContext";
import { QueryIterator } from "../queryIterator";
import type { FeedOptions, FeedResponse } from "../request";
import { withDiagnostics } from "../utils/diagnostics";

/**
 * @internal
 * Provides the iterator for handling encrypted items in the Azure Cosmos DB database service.
 * extends @see {@link QueryIterator}
 */
export class EncryptionItemQueryIterator<Item> extends QueryIterator<Item> {
  private container: Container;
  private encryptionClientContext: ClientContext;
  private encryptionOptions: FeedOptions;

  constructor(
    clientContext: ClientContext,
    query: SqlQuerySpec | string,
    options: FeedOptions,
    fetchFunctions: FetchFunctionCallback | FetchFunctionCallback[],
    container: Container,
  ) {
    super(clientContext, query, options, fetchFunctions, container.url, ResourceType.item);
    this.container = container;
    this.encryptionClientContext = clientContext;
    this.encryptionOptions = options;
  }

  /**
   * Gets an async iterator that will yield results until completion.
   */
  public override async *getAsyncIterator(): AsyncIterable<FeedResponse<Item>> {
    let response: FeedResponse<Item>;
    const diagnosticNode = new DiagnosticNodeInternal(
      this.encryptionClientContext.diagnosticLevel,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );
    try {
      response = yield* super.getAsyncIteratorInternal(diagnosticNode);
    } catch (error) {
      await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
    }
    if (response.resources && response.resources.length > 0) {
      for (let resource of response.resources) {
        resource = await this.container.encryptionProcessor.decrypt(resource);
      }
    }
    yield response;
  }

  /**
   * Fetch all pages for the query and return a single FeedResponse.
   */
  public override async fetchAll(): Promise<FeedResponse<Item>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      let response: FeedResponse<Item>;
      try {
        response = await super.fetchAllInternal(diagnosticNode);
      } catch (error) {
        await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
      }
      if (response && response.resources && response.resources.length > 0) {
        for (let resource of response.resources) {
          resource = await this.container.encryptionProcessor.decrypt(resource, diagnosticNode);
        }
      }
      return response;
    }, this.encryptionClientContext);
  }

  /**
   * Retrieve the next batch from the feed.
   */
  public override async fetchNext(): Promise<FeedResponse<Item>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      let response: FeedResponse<Item>;
      try {
        response = await super.fetchNextInternal(diagnosticNode);
      } catch (error) {
        await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
      }
      if (response.resources && response.resources.length > 0) {
        for (let resource of response.resources) {
          resource = await this.container.encryptionProcessor.decrypt(resource, diagnosticNode);
        }
      }
      return response;
    }, this.encryptionClientContext);
  }

  protected override async init(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    // Ensure encryption is initialized and set rid in options
    if (!this.container.isEncryptionInitialized) {
      await this.container.initializeEncryption();
    }
    this.encryptionOptions.containerRid = this.container._rid;
    await super.init(diagnosticNode);
  }
}
