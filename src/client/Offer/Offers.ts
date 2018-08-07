import { ClientContext } from "../../ClientContext";
import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions } from "../../request";
import { OfferDefinition } from "./OfferDefinition";

/**
 * Use to query or read all Offers.
 *
 * @see {@link Offer} to read or replace an existing {@link Offer} by id.
 */
export class Offers {
  /**
   * @hidden
   * @param client The parent {@link CosmosClient} for the Database Account.
   */
  constructor(public readonly client: CosmosClient, private readonly clientContext: ClientContext) {}

  /**
   * Query all offers.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<OfferDefinition> {
    return new QueryIterator(this.clientContext, query, options, innerOptions => {
      return this.clientContext.queryFeed("/offers", "offers", "", result => result.Offers, query, innerOptions);
    });
  }

  /**
   * Read all offers.
   * @param options
   * @example Read all offers to array.
   * ```typescript
   * const {body: offerList} = await client.offers.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<OfferDefinition> {
    return this.query(undefined, options);
  }
}
