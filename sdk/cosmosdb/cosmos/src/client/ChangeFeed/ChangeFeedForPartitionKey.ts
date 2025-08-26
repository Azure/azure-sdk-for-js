// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { InternalChangeFeedIteratorOptions } from "./InternalChangeFeedOptions.js";
import { ChangeFeedIteratorResponse } from "./ChangeFeedIteratorResponse.js";
import { Container, Resource } from "../../client/index.js";
import { ClientContext } from "../../ClientContext.js";
import { Constants, copyObject, ResourceType, StatusCodes } from "../../common/index.js";
import { FeedOptions, Response, ErrorResponse } from "../../request/index.js";
import { ContinuationTokenForPartitionKey } from "./ContinuationTokenForPartitionKey.js";
import { ChangeFeedPullModelIterator } from "./ChangeFeedPullModelIterator.js";
import { PartitionKey, convertToInternalPartitionKey } from "../../documents/index.js";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
import { ChangeFeedMode } from "./ChangeFeedMode.js";
import { decryptChangeFeedResponse } from "./changeFeedUtils.js";
import { computePartitionKeyRangeId } from "../ClientUtils.js";
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
    if (this.clientContext.enableEncryption) {
      await this.container.checkAndInitializeEncryption();
      // returns copy of object to avoid encryption of original partition key passed
      this.partitionKey = copyObject(this.partitionKey);
      diagnosticNode.beginEncryptionDiagnostics(Constants.Encryption.DiagnosticsEncryptOperation);
      const { partitionKeyList, encryptedCount } =
        await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
          convertToInternalPartitionKey(this.partitionKey),
        );
      this.partitionKey = partitionKeyList;
      diagnosticNode.endEncryptionDiagnostics(
        Constants.Encryption.DiagnosticsEncryptOperation,
        encryptedCount,
      );
    }
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
        if (this.clientContext.enableEncryption) {
          await decryptChangeFeedResponse(
            result,
            diagnosticNode,
            this.changeFeedOptions.changeFeedMode,
            this.container.encryptionProcessor,
          );
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

    if (this.changeFeedOptions.excludedLocations) {
      feedOptions.excludedLocations = this.changeFeedOptions.excludedLocations;
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
    if (this.clientContext.enableEncryption) {
      feedOptions.containerRid = this.container._rid;
    }
    try {
      const isPartitionLevelFailOverEnabled = this.clientContext.isPartitionLevelFailOverEnabled();
      const partitionKeyRangeId = await computePartitionKeyRangeId(
        diagnosticNode,
        convertToInternalPartitionKey(this.partitionKey),
        this.clientContext.partitionKeyRangeCache,
        isPartitionLevelFailOverEnabled,
        this.container,
      );
      const response: Response<Array<T & Resource>> = await (this.clientContext.queryFeed<T>({
        path: this.resourceLink,
        resourceType: ResourceType.item,
        resourceId: this.resourceId,
        resultFn: (result) => (result ? result.Documents : []),
        diagnosticNode,
        query: undefined,
        options: feedOptions,
        partitionKey: this.partitionKey,
        partitionKeyRangeId,
      }) as Promise<any>);
      return new ChangeFeedIteratorResponse(
        response.result,
        response.result ? response.result.length : 0,
        response.code,
        response.headers,
        getEmptyCosmosDiagnostics(),
      );
    } catch (err) {
      // If any errors are encountered, throw the error.
      const errorResponse = new ErrorResponse(err.message);
      errorResponse.code = err.code;
      errorResponse.headers = err.headers;
      throw errorResponse;
    }
  }
}
