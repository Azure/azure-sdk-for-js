/**
 * Items in Cosmos DB are simply JSON objects.
 * Most of the Item operations allow for your to provide your own type
 * that extends the very simple ItemDefinition.
 *
 * You cannot use any reserved keys. You can see the reserved key list
 * in {@link ItemBody}
 */
export interface ItemDefinition {
    /** The id of the item. User settable property. Uniquely identifies the item along with the partition key */
    id?: string;
    /** Time to live in seconds for collections with TTL enabled */
    ttl?: number;
    [key: string]: any;
}
//# sourceMappingURL=ItemDefinition.d.ts.map