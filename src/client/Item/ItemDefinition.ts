/**
 * Items in Cosmos DB are simply JSON objects.
 * Most of the Item operations allow for your to provide your own type
 * that extends the very simple ItemDefinition.
 *
 * You cannot use any reserved keys. You can see the reserved key list
 * in {@link ItemBody}
 */
export interface ItemDefinition {
  [key: string]: any;
}
