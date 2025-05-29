import type { ClientContext } from "../../ClientContext.js";
import type { CosmosClient } from "../../CosmosClient.js";
import type { RequestOptions } from "../../request/index.js";
import type { OfferDefinition } from "./OfferDefinition.js";
import { OfferResponse } from "./OfferResponse.js";
/**
 * Use to read or replace an existing {@link Offer} by id.
 *
 * @see {@link Offers} to query or read all offers.
 */
export declare class Offer {
    readonly client: CosmosClient;
    readonly id: string;
    private readonly clientContext;
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url(): string;
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database Account.
     * @param id - The id of the given {@link Offer}.
     */
    constructor(client: CosmosClient, id: string, clientContext: ClientContext);
    /**
     * Read the {@link OfferDefinition} for the given {@link Offer}.
     * @example
     * ```ts snippet:OfferRead
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     *
     * const { resource: offer } = await client.offer("<offer-id>").read();
     * ```
     */
    read(options?: RequestOptions): Promise<OfferResponse>;
    /**
     * Replace the given {@link Offer} with the specified {@link OfferDefinition}.
     * @param body - The specified {@link OfferDefinition}
     * @example replace offer with a new offer definition with updated throughput
     * ```ts snippet:OfferReplace
     * import { CosmosClient } from "@azure/cosmos";
     *
     * const endpoint = "https://your-account.documents.azure.com";
     * const key = "<database account masterkey>";
     * const client = new CosmosClient({ endpoint, key });
     * const { resource: offer } = await client.offer("<offer-id>").read();
     * // @ts-preservewhitespace
     * offer.content.offerThroughput = 1000;
     * await client.offer("<offer-id>").replace(offer);
     * ```
     */
    replace(body: OfferDefinition, options?: RequestOptions): Promise<OfferResponse>;
}
//# sourceMappingURL=Offer.d.ts.map