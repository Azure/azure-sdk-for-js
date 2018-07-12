import { Base } from "../base";
import { Key, MurmurHash } from "./murmurHash";

export { Key } from "./murmurHash";

export class ConsistentHashRing {
  private computeHash: any; // TODO: any
  public partitions: any[]; // TODO: any , public

  /**
   * Initializes a new instance of the ConsistentHashRing
   * @param {string[]} nodes - Array of collection links
   * @param {object} options - Options to initialize the ConsistentHashRing
   * @param {function} options.computeHash - Function to compute the hash for a given link or partition key
   * @param {function} options.numberOfVirtualNodesPerCollection - Number of points in the ring to assign \
   * to each collection link
   */
  constructor(nodes: string[], options?: any) {
    // TODO: options
    ConsistentHashRing._throwIfInvalidNodes(nodes);

    options = options || {};
    options.numberOfVirtualNodesPerCollection = options.numberOfVirtualNodesPerCollection || 128;
    options.computeHash = options.computeHash || MurmurHash.hash;

    this.computeHash = options.computeHash;
    this.partitions = ConsistentHashRing.constructPartitions(
      nodes,
      options.numberOfVirtualNodesPerCollection,
      options.computeHash
    );
  }

  public getNode(key: Key) {
    const hash = this.computeHash(key);
    const partition = ConsistentHashRing.search(this.partitions, hash);
    return this.partitions[partition].node;
  }

  private static constructPartitions(nodes: string[], partitionsPerNode: number, computeHashFunction: any) {
    // TODO: computeHashFunction
    const partitions = nodes.reduce((p, node) => {
      let hashValue = computeHashFunction(node);
      for (let j = 0; j < partitionsPerNode; j++) {
        p.push({
          hashValue,
          node
        });

        hashValue = computeHashFunction(hashValue);
      }
      return p;
    }, []);

    partitions.sort((x, y) => {
      return ConsistentHashRing.compareHashes(x.hashValue, y.hashValue);
    });
    return partitions;
  }

  private static compareHashes(x: number, y: number) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  }

  private static search(partitions: any[], hashValue: string) {
    // TODO: Partitions
    for (let i = 0; i < partitions.length - 1; i++) {
      if (hashValue >= partitions[i].hashValue && hashValue < partitions[i + 1].hashValue) {
        return i;
      }
    }

    return partitions.length - 1;
  }

  private static _throwIfInvalidNodes(nodes: string[]) {
    if (Array.isArray(nodes)) {
      return;
    }

    throw new Error("Invalid argument: 'nodes' has to be an array.");
  }
}
