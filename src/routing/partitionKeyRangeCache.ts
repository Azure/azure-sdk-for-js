import * as semaphore from "semaphore";
import { Base } from "../base";
import { QueryIterator } from "../queryIterator";
import { CollectionRoutingMapFactory, InMemoryCollectionRoutingMap, QueryRange } from "./";

export class PartitionKeyRangeCache {
  private documentclient: any;
  private collectionRoutingMapByCollectionId: {
    [key: string]: InMemoryCollectionRoutingMap;
  };
  private sem: semaphore.Semaphore;

  /**
   * Represents a PartitionKeyRangeCache.
   * PartitionKeyRangeCache provides list of effective partition key ranges for a collection.
   * This implementation loads and caches the collection routing map per collection on demand.
   * @constructor PartitionKeyRangeCache
   * @param {object} documentclient - The documentclient object.
   * @ignore
   */
  constructor(documentclient: any) {
    // TODO: documentClient
    this.documentclient = documentclient;
    this.collectionRoutingMapByCollectionId = {};
    this.sem = semaphore(1);
  }
  /**
   * Finds or Instantiates the requested Collection Routing Map and invokes callback
   * @param {callback} callback                - Function to execute for the collection routing map.
   *                                             the function takes two parameters error, collectionRoutingMap.
   * @param {string} collectionLink            - Requested collectionLink
   * @ignore
   */
  public async onCollectionRoutingMap(collectionLink: string): Promise<InMemoryCollectionRoutingMap> {
    const isNameBased = Base.isLinkNameBased(collectionLink);
    const collectionId = this.documentclient.getIdFromLink(collectionLink, isNameBased);

    let collectionRoutingMap = this.collectionRoutingMapByCollectionId[collectionId];
    if (collectionRoutingMap === undefined) {
      // attempt to consturct collection routing map
      collectionRoutingMap = await new Promise<InMemoryCollectionRoutingMap>((resolve, reject) => {
        const semaphorizedFuncCollectionMapInstantiator = async () => {
          let crm: InMemoryCollectionRoutingMap = this.collectionRoutingMapByCollectionId[collectionId];
          if (crm === undefined) {
            try {
              const partitionKeyRangesIterator: QueryIterator<any> = this.documentclient.readPartitionKeyRanges(
                collectionLink
              );
              const { result: resources } = await partitionKeyRangesIterator.toArray();

              crm = CollectionRoutingMapFactory.createCompleteRoutingMap(resources.map(r => [r, true]), collectionId);

              this.collectionRoutingMapByCollectionId[collectionId] = crm;
              this.sem.leave();
              resolve(crm);
            } catch (err) {
              this.sem.leave();
              reject(err);
            }
          } else {
            // sanity gaurd
            this.sem.leave();
            // TODO: it looks like this code should never be reached...
            // return resolve(collectionRoutingMap.getOverlappingRanges(partitionKeyRanges));
            reject(new Error("Not yet implemented"));
          }
        };

        // We want only one attempt to construct collectionRoutingMap
        // so we pass the consturction in the semaphore take
        this.sem.take(semaphorizedFuncCollectionMapInstantiator);
      });
    }
    return collectionRoutingMap;
  }

  /**
   * Given the query ranges and a collection, invokes the callback on the list of overlapping partition key ranges
   * @param {callback} callback - Function execute on the overlapping partition key ranges result,
   *                                  takes two parameters error, partition key ranges
   * @param collectionLink
   * @param queryRanges
   * @ignore
   */
  public async getOverlappingRanges(collectionLink: string, queryRanges: QueryRange) {
    const crm = await this.onCollectionRoutingMap(collectionLink);
    return crm.getOverlappingRanges(queryRanges);
  }
}
