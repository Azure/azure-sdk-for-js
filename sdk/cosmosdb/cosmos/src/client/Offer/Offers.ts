// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ClientContext } from "../../ClientContext";
import { ResourceType } from "../../common";
import type { CosmosClient } from "../../CosmosClient";
import type { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import type { FeedOptions } from "../../request";
import type { Resource } from "../Resource";
import type { OfferDefinition } from "./OfferDefinition";

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
   * ```typescript
   * const {body: offerList} = await client.offers.readAll().fetchAll();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<OfferDefinition & Resource> {
    return this.query<OfferDefinition & Resource>(undefined, options);
  }
}
