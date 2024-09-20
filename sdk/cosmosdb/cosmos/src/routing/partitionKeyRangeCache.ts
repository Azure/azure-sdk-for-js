// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { MetadataLookUpType } from "../CosmosDiagnostics";
import { PartitionKeyRange } from "../client/Container/PartitionKeyRange";
import { ClientContext } from "../ClientContext";
import { getIdFromLink } from "../common/helper";
import { DiagnosticNodeInternal } from "../diagnostics/DiagnosticNodeInternal";
import { withMetadataDiagnostics } from "../utils/diagnostics";
import { createCompleteRoutingMap } from "./CollectionRoutingMapFactory";
import { InMemoryCollectionRoutingMap } from "./inMemoryCollectionRoutingMap";
import { QueryRange } from "./QueryRange";

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
}
