import { Base } from "../base";
import { Document, PartitionKey } from "../documents";
import { PartitionKeyExtractor, PartitionKeyExtractorFunction } from "../range";
import { ConsistentHashRing } from "./consistentHashRing";

export class HashPartitionResolver {
    private partitionKeyExtractor: PartitionKeyExtractor; // TODO: Function could be more specific
    private consistentHashRing: ConsistentHashRing;
    private collectionLinks: any[]; // TODO: any

    /**
     * HashPartitionResolver implements partitioning based on the value of a hash function,
     * allowing you to evenly distribute requests and data across a number of partitions for
     * the Azure Cosmos DB database service.
     * @class HashPartitionResolver
     * @param {string | function} partitionKeyExtractor   - If partitionKeyExtractor is a string, it should be the \
     * name of the property in the document to execute the hashing on.
     *                                                      If partitionKeyExtractor is a function, it should be a \
     * function to extract the partition key from an object.
     */
    constructor(
        partitionKeyExtractor: PartitionKeyExtractor, collectionLinks: string[], options?: any) { // TODO: options
        HashPartitionResolver._throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor);
        HashPartitionResolver._throwIfInvalidCollectionLinks(collectionLinks);
        this.partitionKeyExtractor = partitionKeyExtractor;

        options = options || {};
        this.consistentHashRing = new ConsistentHashRing(collectionLinks, options);
        this.collectionLinks = collectionLinks;
    }
    /**
     * Extracts the partition key from the specified document using the partitionKeyExtractor
     * @memberof HashPartitionResolver
     * @instance
     * @param {object} document - The document from which to extract the partition key.
     * @returns {object}
     */
    public getPartitionKey(document: Document) {
        return (typeof this.partitionKeyExtractor === "string")
            ? document[this.partitionKeyExtractor]
            : this.partitionKeyExtractor(document);
    }
    /**
     * Given a partition key, returns a list of collection links to read from.
     * @memberof HashPartitionResolver
     * @instance
     * @param {any} partitionKey - The partition key used to determine the target collection for query
     */
    public resolveForRead(partitionKey: PartitionKey) {
        if (partitionKey === undefined || partitionKey === null) {
            return this.collectionLinks;
        }

        return [this._resolve(partitionKey)];
    }
    /**
     * Given a partition key, returns the correct collection link for creating a document.
     * @memberof HashPartitionResolver
     * @instance
     * @param {any} partitionKey - The partition key used to determine the target collection for create
     * @returns {string}         - The target collection link that will be used for document creation.
     */
    public resolveForCreate(partitionKey: PartitionKey) {
        return this._resolve(partitionKey);
    }

    // TODO: chrande made this public to satisfy a test. Shouldn't be testing private apis
    public _resolve(partitionKey: PartitionKey) {
        HashPartitionResolver._throwIfInvalidPartitionKey(partitionKey);
        return this.consistentHashRing.getNode(partitionKey as string); // TODO: code smell, type assertion
    }

    // TODO: chrande made this public to satisfy a test. Shouldn't be testing private apis
    public static _throwIfInvalidPartitionKeyExtractor(partitionKeyExtractor: PartitionKeyExtractor) {
        if (partitionKeyExtractor === undefined || partitionKeyExtractor === null) {
            throw new Error("partitionKeyExtractor cannot be null or undefined");
        }

        if (typeof partitionKeyExtractor !== "string" && typeof partitionKeyExtractor !== "function") {
            throw new Error("partitionKeyExtractor must be either a 'string' or a 'function'");
        }
    }

    // TODO: chrande made this public to satisfy a test. Shouldn't be testing private apis
    public static _throwIfInvalidPartitionKey(partitionKey: PartitionKey) {
        const partitionKeyType = typeof partitionKey;
        if (partitionKeyType !== "string") {
            throw new Error("partitionKey must be a 'string'");
        }
    }

    // TODO: chrande made this public for tests, but it's implementation detail and shouldn't tested
    /** @ignore */
    public static _throwIfInvalidCollectionLinks(collectionLinks: any[]) {
        if (!Array.isArray(collectionLinks)) {
            throw new Error("collectionLinks must be an array.");
        }

        if (collectionLinks.some((collectionLink) => !Base._isValidCollectionLink(collectionLink))) {
            throw new Error("All elements of collectionLinks must be collection links.");
        }
    }
}
