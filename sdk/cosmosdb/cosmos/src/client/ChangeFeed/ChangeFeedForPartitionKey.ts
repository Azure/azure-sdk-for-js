// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse";
import { Container, Resource } from "../../client";
import { ClientContext } from "../../ClientContext";
import { Constants, ResourceType, StatusCodes } from "../../common";
import { FeedOptions, Response, ErrorResponse } from "../../request";
import { ContinuationTokenForPartitionKey } from "./ContinuationTokenForPartitionKey";
import { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator";
import { PartitionKey, convertToInternalPartitionKey } from "../../documents";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
import { ChangeFeedMode } from "./ChangeFeedMode";
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
  private startFromNow: boolean;
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
    // startTime is used to store and specify time from which change feed should start reading new changes. StartFromNow flag is used to indicate fetching changes from now.
    if (changeFeedOptions.startFromNow) {
      this.startFromNow = true;
    } else if (changeFeedOptions.startTime) {
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

      if (result.statusCode === StatusCodes.Ok) {
        if (this.clientContext.enableEncyption) {
          for (let item of result.result) {
            item = await this.container.encryptionProcessor.decrypt(item);
          }
        }
      }
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
    const feedOptions: FeedOptions = {
      initialHeaders: {},
      useLatestVersionFeed: true,
      useAllVersionsAndDeletesFeed: false,
    };
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
    } else if (this.startFromNow) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfNoneMatch] =
        Constants.ChangeFeedIfNoneMatchStartFromNowHeader;
    }

    if (this.startTime) {
      feedOptions.initialHeaders[Constants.HttpHeaders.IfModifiedSince] = this.startTime;
    }
    if (
      this.changeFeedOptions.changeFeedMode &&
      this.changeFeedOptions.changeFeedMode === ChangeFeedMode.AllVersionsAndDeletes
    ) {
      feedOptions.useAllVersionsAndDeletesFeed = true;
      feedOptions.useLatestVersionFeed = false;
    }
    if (this.clientContext.enableEncyption) {
      this.partitionKey = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
        convertToInternalPartitionKey(this.partitionKey),
      );
    }
    try {
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
    } catch (err) {
      if (err.code >= StatusCodes.BadRequest && err.code !== StatusCodes.Gone) {
        const errorResponse = new ErrorResponse(err.message);
        errorResponse.code = err.code;
        errorResponse.headers = err.headers;
        throw errorResponse;
      }
      return new ChangeFeedIteratorResponse(
        [],
        0,
        err.code,
        err.headers,
        getEmptyCosmosDiagnostics(),
      );
    }
  }
}
