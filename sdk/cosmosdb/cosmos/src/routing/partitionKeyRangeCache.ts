// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PartitionKeyRange } from "../client/Container/PartitionKeyRange";
import { ClientContext } from "../ClientContext";
import { getIdFromLink } from "../common/helper";
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
    forceRefresh: boolean = false
  ): Promise<InMemoryCollectionRoutingMap> {
    const collectionId = getIdFromLink(collectionLink);
    if (this.collectionRoutingMapByCollectionId[collectionId] === undefined || forceRefresh) {
      this.collectionRoutingMapByCollectionId[collectionId] =
        this.requestCollectionRoutingMap(collectionLink);
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
    forceRefresh: boolean = false
  ): Promise<PartitionKeyRange[]> {
    const crm = await this.onCollectionRoutingMap(collectionLink, forceRefresh);
    return crm.getOverlappingRanges(queryRange);
  }

  private async requestCollectionRoutingMap(
    collectionLink: string
  ): Promise<InMemoryCollectionRoutingMap> {
    const { resources } = await this.clientContext
      .queryPartitionKeyRanges(collectionLink)
      .fetchAll();
    return createCompleteRoutingMap(resources.map((r) => [r, true]));
  }
}
