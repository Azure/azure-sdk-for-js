import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions } from "../../request";
import { Container } from "../Container";
import { ConflictDefinition } from "./ConflictDefinition";

/**
 * Use to query or read all conflicts.
 *
 * @see {@link Conflict} to read or delete a given {@link Conflict} by id.
 */
export class Conflicts {
  constructor(public readonly container: Container, private readonly clientContext: ClientContext) {}

  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<ConflictDefinition> {
    const path = Helper.getPathFromLink(this.container.url);
    const id = Helper.getIdFromLink(this.container.url);

    return new QueryIterator(this.clientContext, query, options, innerOptions => {
      return this.clientContext.queryFeed(path, "conflicts", id, result => result.Conflicts, query, innerOptions);
    });
  }

  public readAll(options?: FeedOptions): QueryIterator<ConflictDefinition> {
    return this.query(undefined, options);
  }
}
