// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext.js";
import { ResourceType } from "../../common/index.js";
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
export class Offers {
  /**
   * @hidden
   * @param client - The parent {@link CosmosClient} for the offers.
   */
  constructor(
    public readonly client: CosmosClient,
    private readonly clientContext: ClientContext,
  ) {}

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
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all offers.
   * @param query - Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    return new QueryIterator(this.clientContext, query, options, (diagnosticNode, innerOptions) => {
      return this.clientContext.queryFeed<T>({
        path: "/offers",
        resourceType: ResourceType.offer,
        resourceId: "",
        resultFn: (result) => result.Offers,
        query,
        options: innerOptions,
        diagnosticNode,
      });
    });
  }

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
  public readAll(options?: FeedOptions): QueryIterator<OfferDefinition & Resource> {
    return this.query<OfferDefinition & Resource>(undefined, options);
  }
}
