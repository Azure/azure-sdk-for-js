import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
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
  constructor(public readonly container: Container, private readonly clientContext: ClientContext) {}

  /**
   * Queries all conflicts.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Queries all conflicts.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return results in an array or iterate over them one at a time.
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = Helper.getPathFromLink(this.container.url, "conflicts");
    const id = Helper.getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, innerOptions => {
      return this.clientContext.queryFeed(path, "conflicts", id, result => result.Conflicts, query, innerOptions);
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
