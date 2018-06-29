import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions } from "../../request";
import { Offer } from "./Offer";
import { OfferDefinition } from "./OfferDefinition";

export class Offers {
    constructor(public readonly client: CosmosClient) {}

    public get(id: string) {
        return new Offer(this.client, id);
    }
    public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<OfferDefinition> {
        return this.client.documentClient.queryOffers(query, options);
    }

    public readAll(options?: FeedOptions): QueryIterator<OfferDefinition> {
        return this.client.documentClient.readOffers(options);
    }
}
