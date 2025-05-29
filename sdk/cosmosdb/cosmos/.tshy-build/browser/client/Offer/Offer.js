import { Constants, isResourceValid, ResourceType } from "../../common/index.js";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics.js";
import { OfferResponse } from "./OfferResponse.js";
/**
 * Use to read or replace an existing {@link Offer} by id.
 *
 * @see {@link Offers} to query or read all offers.
 */
export class Offer {
    /**
     * Returns a reference URL to the resource. Used for linking in Permissions.
     */
    get url() {
        return `/${Constants.Path.OffersPathSegment}/${this.id}`;
    }
    /**
     * @hidden
     * @param client - The parent {@link CosmosClient} for the Database Account.
     * @param id - The id of the given {@link Offer}.
     */
    constructor(client, id, clientContext) {
        this.client = client;
        this.id = id;
        this.clientContext = clientContext;
    }
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
    async read(options) {
        return withDiagnostics(async (diagnosticNode) => {
            const response = await this.clientContext.read({
                path: this.url,
                resourceType: ResourceType.offer,
                resourceId: this.id,
                options,
                diagnosticNode,
            });
            return new OfferResponse(response.result, response.headers, response.code, getEmptyCosmosDiagnostics(), this);
        }, this.clientContext);
    }
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
    async replace(body, options) {
        return withDiagnostics(async (diagnosticNode) => {
            const err = {};
            if (!isResourceValid(body, err)) {
                throw err;
            }
            const response = await this.clientContext.replace({
                body,
                path: this.url,
                resourceType: ResourceType.offer,
                resourceId: this.id,
                options,
                diagnosticNode,
            });
            return new OfferResponse(response.result, response.headers, response.code, getEmptyCosmosDiagnostics(), this);
        }, this.clientContext);
    }
}
//# sourceMappingURL=Offer.js.map