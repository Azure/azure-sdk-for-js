// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Container } from "../client/index.js";
import type { ClientContext } from "../ClientContext.js";
import { Constants, ResourceType } from "../common/constants.js";
import {
  DiagnosticNodeInternal,
  DiagnosticNodeType,
} from "../diagnostics/DiagnosticNodeInternal.js";
import type { SqlQuerySpec, FetchFunctionCallback } from "../queryExecutionContext/index.js";
import { QueryIterator } from "../queryIterator.js";
import type { FeedOptions, FeedResponse } from "../request/index.js";
import { withDiagnostics } from "../utils/diagnostics.js";

/**
 * @internal
 * Provides the iterator for handling encrypted items in the Azure Cosmos DB database service.
 * extends @see {@link QueryIterator}
 */
export class EncryptionItemQueryIterator<Item> extends QueryIterator<Item> {
  private container: Container;
  private encryptionClientContext: ClientContext;
  private encryptionOptions: FeedOptions;
  private originalQuery: SqlQuerySpec | string;

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
    this.originalQuery = query;
  }

  /**
   * Gets an async iterator that will yield results until completion.
   */
  public override async *getAsyncIterator(): AsyncIterable<FeedResponse<Item>> {
    const diagnosticNode = new DiagnosticNodeInternal(
      this.encryptionClientContext.diagnosticLevel,
      DiagnosticNodeType.CLIENT_REQUEST_NODE,
      null,
    );

    try {
      // Get the parent's async iterator
      const parentIterator = QueryIterator.prototype.getAsyncIteratorInternal.call(
        this,
        diagnosticNode,
      );

      // Iterate through each response from the parent
      for await (const response of parentIterator) {
        // Apply shared decryption logic to each response
        const decryptedResponse = await this.decryptResponse(
          response as FeedResponse<Item>,
          diagnosticNode,
        );
        yield decryptedResponse;
      }
    } catch (error) {
      await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
    }
  }

  /**
   * Fetch all pages for the query and return a single FeedResponse.
   */
  public override async fetchAll(): Promise<FeedResponse<Item>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      let response: FeedResponse<Item>;
      try {
        response = await QueryIterator.prototype.fetchAllInternal.call(this, diagnosticNode);
      } catch (error) {
        await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
      }

      // Apply shared decryption logic
      return this.decryptResponse(response, diagnosticNode);
    }, this.encryptionClientContext);
  }

  /**
   * Retrieve the next batch from the feed.
   */
  public override async fetchNext(): Promise<FeedResponse<Item>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      let response: FeedResponse<Item>;
      try {
        response = await QueryIterator.prototype.fetchNextInternal.call(this, diagnosticNode);
      } catch (error) {
        await this.container.throwIfRequestNeedsARetryPostPolicyRefresh(error);
      }

      // Apply shared decryption logic
      return this.decryptResponse(response, diagnosticNode);
    }, this.encryptionClientContext);
  }

  /**
   * @internal
   */
  public override async init(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    await this.container.checkAndInitializeEncryption();
    this.encryptionOptions.containerRid = this.container._rid;
    await QueryIterator.prototype.init.call(this, diagnosticNode);
  }

  /**
   * Shared decryption logic for all iterator methods
   */
  private async decryptResponse<T>(
    response: FeedResponse<T>,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<FeedResponse<T>> {
    if (response?.resources?.length > 0) {
      let count = 0;

      diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsDecryptOperation);

      // Check if this is a single-field SELECT VALUE query
      const fieldPath = this.getSelectValueFieldPath();

      if (fieldPath) {
        // Check if this field is actually encrypted
        const isFieldEncrypted =
          await this.container.encryptionProcessor.isPathEncrypted(fieldPath);

        if (isFieldEncrypted) {
          // Decrypt each value using the identified field path
          for (let i = 0; i < response.resources.length; i++) {
            const decryptedValue = await this.container.encryptionProcessor.decryptProperty(
              fieldPath,
              response.resources[i] as any,
            );
            response.resources[i] = decryptedValue;
            count++;
          }
        }
      } else {
        // Regular object decryption
        for (let i = 0; i < response.resources.length; i++) {
          const { body, propertiesDecryptedCount } =
            await this.container.encryptionProcessor.decrypt(response.resources[i]);
          response.resources[i] = body;
          count += propertiesDecryptedCount;
        }
      }

      diagnosticNode.endEncryptionDiagnostics(
        Constants.Encryption.DiagnosticsDecryptOperation,
        count,
      );
    }
    return response;
  }

  /**
   * Extract field path from SELECT VALUE query (single field only)
   * Only returns a field path if this is a simple field selection, not a function or expression
   */
  private getSelectValueFieldPath(): string | null {
    const queryText =
      typeof this.originalQuery === "string" ? this.originalQuery : this.originalQuery.query;

    // Match simple field SELECT VALUE patterns only:
    // SELECT VALUE c.fieldName - YES
    // SELECT DISTINCT VALUE c.fieldName - YES
    // SELECT VALUE UPPER(c.fieldName) - NO (function call)
    // SELECT VALUE c.field + 1 - NO (expression)
    // SELECT VALUE { ... } - NO (object constructor)
    const simpleFieldMatch = queryText.match(
      /SELECT\s+(?:DISTINCT\s+)?VALUE\s+(\w+)\.(\w+)\s*(?:FROM|WHERE|ORDER|GROUP|$)/i,
    );

    if (simpleFieldMatch) {
      return `/${simpleFieldMatch[2]}`;
    }

    return null;
  }
}
