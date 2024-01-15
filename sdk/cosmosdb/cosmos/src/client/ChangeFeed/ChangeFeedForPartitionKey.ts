// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import { Container, Resource } from "../../client";
import { ClientContext } from "../../ClientContext";
import { Constants, ResourceType } from "../../common";
import { FeedOptions, Response, ErrorResponse } from "../../request";
import { ContinuationTokenForPartitionKey } from "./ContinuationTokenForPartitionKey";
import { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator";
import { PartitionKey } from "../../documents";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
/**
 * @hidden
 * Provides iterator for change feed for one partition key.
 *
 * Use `Items.getChangeFeedIterator()` to get an instance of the iterator.
 */
export class ChangeFeedForPartitionKey<T> implements ChangeFeedPullModelIterator<T> {
  private continuationToken: ContinuationTokenForPartitionKey;
  private startTime: string;
  private rId: string;
  private isInstantiated: boolean;
  /**
   * @internal
   */
  constructor(
    private clientContext: ClientContext,
    private container: Container,
    private resourceId: string,
    private resourceLink: string,
    private partitionKey: PartitionKey,
    private changeFeedOptions: InternalChangeFeedIteratorOptions,
  ) {
    this.continuationToken = changeFeedOptions.continuationToken
      ? JSON.parse(changeFeedOptions.continuationToken)
      : undefined;
    this.isInstantiated = false;

    if (changeFeedOptions.startTime) {
      this.startTime = changeFeedOptions.startTime.toUTCString();
    }
  }

  private async instantiateIterator(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    await this.setIteratorRid(diagnosticNode);
    if (this.continuationToken) {
      if (!this.continuationTokenRidMatchContainerRid()) {
        throw new ErrorResponse("The continuation is not for the current container definition.");
      }
    } else {
      this.continuationToken = new ContinuationTokenForPartitionKey(
        this.rId,
        this.partitionKey,
        "",
      );
    }

    this.isInstantiated = true;
  }

  private continuationTokenRidMatchContainerRid(): boolean {
    if (this.continuationToken.rid !== this.rId) {
      return false;
    }
    return true;
  }

  private async setIteratorRid(diagnosticNode: DiagnosticNodeInternal): Promise<void> {
    const { resource } = await this.container.readInternal(diagnosticNode);
    this.rId = resource._rid;
  }

  /**
   * Change feed is an infinite feed. hasMoreResults is always true.
   */
  get hasMoreResults(): boolean {
    return true;
  }

  /**
   * Gets an async iterator which will yield change feed results.
   */
  public async *getAsyncIterator(): AsyncIterable<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    do {
      const result = await this.readNext();
      yield result;
    } while (this.hasMoreResults);
  }

  /**
   * Returns the result of change feed from Azure Cosmos DB.
   */
  public async readNext(): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      if (!this.isInstantiated) {
        await this.instantiateIterator(diagnosticNode);
      }
      const result = await this.fetchNext(diagnosticNode);
      return result;
    }, this.clientContext);
  }

  /**
   * Read feed and retrieves the next set of results in Azure Cosmos DB.
   */
  private async fetchNext(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    const response = await this.getFeedResponse(diagnosticNode);
    this.continuationToken.Continuation = response.headers[Constants.HttpHeaders.ETag];
    response.headers[Constants.HttpHeaders.ContinuationToken] = JSON.stringify(
      this.continuationToken,
    );
    return response;
  }

  private async getFeedResponse(
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<ChangeFeedIteratorResponse<Array<T & Resource>>> {
    const feedOptions: FeedOptions = { initialHeaders: {}, useIncrementalFeed: true };

    if (typeof this.changeFeedOptions.maxItemCount === "number") {
      feedOptions.maxItemCount = this.changeFeedOptions.maxItemCount;
    }

    if (this.changeFeedOptions.sessionToken) {
      feedOptions.sessionToken = this.changeFeedOptions.sessionToken;
    }

    const continuation = this.continuationToken.Continuation;
    if (continuation) {
      feedOptions.accessCondition = {
        type: Constants.HttpHeaders.IfNoneMatch,
        condition: continuation,
      };
    }

    if (this.startTime) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.startTime;
    }

    const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
      path: this.resourceLink,
      resourceType: ResourceType.item,
      resourceId: this.resourceId,
      resultFn: (result) => (result ? result.Documents : []),
      diagnosticNode,
      query: undefined,
      options: feedOptions,
      partitionKey: this.partitionKey,
    }) as Promise<any>);

    return new ChangeFeedIteratorResponse(
      response.result,
      response.result ? response.result.length : 0,
      response.code,
      response.headers,
      getEmptyCosmosDiagnostics(),
    );
  }
}
