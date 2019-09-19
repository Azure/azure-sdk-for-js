// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions } from "../../request";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { ConflictDefinition } from "./ConflictDefinition";

/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export class Conflicts {
  constructor(
    public readonly container: Container,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Queries all conflicts.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
   */
  public query(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Queries all conflicts.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
   */
  public query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: string | SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = getPathFromLink(this.container.url, ResourceType.conflicts);
    const id = getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, (innerOptions) => {
      return this.clientContext.queryFeed({
        path,
        resourceType: ResourceType.conflicts,
        resourceId: id,
        resultFn: (result) => result.Conflicts,
        query,
        options: innerOptions
      });
    });
  }

  /**
   * Reads all conflicts
   * @param options Use to set options like response page size, continuation tokens, etc.
   */
  public readAll(options?: FeedOptions): QueryIterator<ConflictDefinition & Resource> {
    return this.query<ConflictDefinition & Resource>(undefined, options);
  }
}
