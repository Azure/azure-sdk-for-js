// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MetadataLookUpType } from "../CosmosDiagnostics.js";
import type { PartitionKeyRange } from "../client/Container/PartitionKeyRange.js";
import type { ClientContext } from "../ClientContext.js";
import { getIdFromLink } from "../common/helper.js";
import type { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal.js";
import { withMetadataDiagnostics } from "../utils/diagnostics.js";
import { createCompleteRoutingMap } from "./CollectionRoutingMapFactory.js";
import type { InMemoryCollectionRoutingMap } from "./inMemoryCollectionRoutingMap.js";
import type { QueryRange } from "./QueryRange.js";
import type { PartitionKeyDefinition } from "../documents/PartitionKeyDefinition.js";
import type { PartitionKeyInternal } from "../documents/PartitionKeyInternal.js";
import { hashPartitionKey, binarySearchOnPartitionKeyRanges } from "../utils/hashing/hash.js";

/** @hidden */
export class PartitionKeyRangeCache {
  // Resolved, known-good routing maps. Only successful fetches are published here.
  private collectionRoutingMapByCollectionId: {
    [key: string]: Promise<InMemoryCollectionRoutingMap>;
  };
  // In-flight fetches, so concurrent lookups (cold or forceRefresh) dedupe to a single request.
  private pendingByCollectionId: {
    [key: string]: Promise<InMemoryCollectionRoutingMap>;
  };

  constructor(private clientContext: ClientContext) {
    this.collectionRoutingMapByCollectionId = {};
    this.pendingByCollectionId = {};
  }
  /**
   * Finds or Instantiates the requested Collection Routing Map
   * @param collectionLink - Requested collectionLink
   * @hidden
   */
  public async onCollectionRoutingMap(
    collectionLink: string,
    diagnosticNode: DiagnosticNodeInternal,
    forceRefresh: boolean = false,
  ): Promise<InMemoryCollectionRoutingMap> {
    const collectionId = getIdFromLink(collectionLink);
    const cached = this.collectionRoutingMapByCollectionId[collectionId];
    if (cached !== undefined && !forceRefresh) {
      return cached;
    }
    // Dedupe concurrent fetches (cold or forceRefresh) onto a single in-flight request. The map
    // is published only on success, so a failed/in-flight fetch never poisons the cache or
    // discards the last known-good map; on failure all waiters get the error and the next call
    // retries. The prior good map keeps serving cache hits until the refresh resolves.
    if (this.pendingByCollectionId[collectionId] === undefined) {
      this.pendingByCollectionId[collectionId] = this.requestCollectionRoutingMap(
        collectionLink,
        diagnosticNode,
      )
        .then((map) => {
          this.collectionRoutingMapByCollectionId[collectionId] = Promise.resolve(map);
          return map;
        })
        .finally(() => {
          delete this.pendingByCollectionId[collectionId];
        });
    }
    return this.pendingByCollectionId[collectionId];
  }

  /**
   * Given the query ranges and a collection, invokes the callback on the list of overlapping partition key ranges
   * @hidden
   */
  public async getOverlappingRanges(
    collectionLink: string,
    queryRange: QueryRange,
    diagnosticNode: DiagnosticNodeInternal,
    forceRefresh: boolean = false,
  ): Promise<PartitionKeyRange[]> {
    const crm = await this.onCollectionRoutingMap(collectionLink, diagnosticNode, forceRefresh);
    return crm.getOverlappingRanges(queryRange);
  }

  private async requestCollectionRoutingMap(
    collectionLink: string,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<InMemoryCollectionRoutingMap> {
    const { resources } = await withMetadataDiagnostics(
      async (metadataDiagnostics: DiagnosticNodeInternal) => {
        return this.clientContext
          .queryPartitionKeyRanges(collectionLink)
          .fetchAllInternal(metadataDiagnostics);
      },
      diagnosticNode,
      MetadataLookUpType.PartitionKeyRangeLookUp,
    );
    return createCompleteRoutingMap(resources.map((r) => [r, true]));
  }

  /**
   * Given a partition key, returns the partition key range id
   * @internal
   */
  public async getPartitionKeyRangeIdFromPartitionKey(
    collectionLink: string,
    partitionKey: PartitionKeyInternal,
    partitionKeyDefinition: PartitionKeyDefinition,
    diagnosticNode: DiagnosticNodeInternal,
  ): Promise<string | undefined> {
    const hashedPartitionKey = hashPartitionKey(partitionKey, partitionKeyDefinition);
    const partitionKeyRanges = (
      await this.onCollectionRoutingMap(collectionLink, diagnosticNode)
    ).getOrderedParitionKeyRanges();

    const partitionKeyRangeId = binarySearchOnPartitionKeyRanges(
      partitionKeyRanges,
      hashedPartitionKey,
    );
    return partitionKeyRangeId;
  }
}
