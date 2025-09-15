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
  private collectionRoutingMapByCollectionId: {
    [key: string]: Promise<InMemoryCollectionRoutingMap>;
  };

  constructor(private clientContext: ClientContext) {
    this.collectionRoutingMapByCollectionId = {};
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
    if (this.collectionRoutingMapByCollectionId[collectionId] === undefined || forceRefresh) {
      this.collectionRoutingMapByCollectionId[collectionId] = this.requestCollectionRoutingMap(
        collectionLink,
        diagnosticNode,
      );
    }
    return this.collectionRoutingMapByCollectionId[collectionId];
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
