import type { ClientContext } from "../../ClientContext.js";
import type { CosmosClient } from "../../CosmosClient.js";
import type { SqlQuerySpec } from "../../queryExecutionContext/index.js";
import { QueryIterator } from "../../queryIterator.js";
import type { FeedOptions } from "../../request/index.js";
import type { Resource } from "../Resource.js";
import type { OfferDefinition } from "./OfferDefinition.js";
/**
 * Use to query or read all Offers.
 *
 * @see {@link Offer} to read or replace an existing {@link Offer} by id.
 */
export declare class Offers {
    readonly client: CosmosClient;
    private readonly clientContext;
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the offers.
     */
    constructor(client: CosmosClient, clientContext: ClientContext);
    /**
     * Query all offers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     * @example Read offer for a specific id.
     * ```ts snippet:OffersQuery
     * import { CosmosClient, SqlQuerySpec } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const querySpec: SqlQuerySpec = {
     *   query: `SELECT * FROM root r WHERE r.id = @offer`,
     *   parameters: [{ name: "@offer", value: "<offer-id>" }],
     * };
     * const { resources: offer } = await client.offers.query(querySpec).fetchAll();
     * ```
     */
    query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
    /**
     * Query all offers.
     * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
     */
    query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
    /**
     * Read all offers.
     * @example Read all offers to array.
     * ```ts snippet:OffersReadAll
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resources: offerList } = await client.offers.readAll().fetchAll();
     * ```
     */
    readAll(options?: FeedOptions): QueryIterator<OfferDefinition & Resource>;
}
//# sourceMappingURL=Offers.d.ts.map