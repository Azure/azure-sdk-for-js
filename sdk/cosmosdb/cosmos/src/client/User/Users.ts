import { ClientContext } from "../../ClientContext";
import { Helper } from "../../common";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Database } from "../Database";
import { Resource } from "../Resource";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";
import { UserResponse } from "./UserResponse";

/**
 * Used to create, upsert, query, and read all users.
 *
 * @see {@link User} to read, replace, or delete a specific User by id.
 */
export class Users {
  /**
   * @hidden
   * @param database The parent {@link Database}.
   */
  constructor(public readonly database: Database, private readonly clientContext: ClientContext) {}

  /**
   * Query all users.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<any>;
  /**
   * Query all users.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options
   */
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T>;
  public query<T>(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<T> {
    const path = Helper.getPathFromLink(this.database.url, "users");
    const id = Helper.getIdFromLink(this.database.url);

    return new QueryIterator(this.clientContext, query, options, innerOptions => {
      return this.clientContext.queryFeed(path, "users", id, result => result.Users, query, innerOptions);
    });
  }

  /**
   * Read all users.
   * @param options
   * @example Read all users to array.
   * ```typescript
   * const {body: usersList} = await database.users.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<UserDefinition & Resource> {
    return this.query<UserDefinition & Resource>(undefined, options);
  }

  /**
   * Create a database user with the specified {@link UserDefinition}.
   * @param body The specified {@link UserDefinition}.
   * @param options
   */
  public async create(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.database.url, "users");
    const id = Helper.getIdFromLink(this.database.url);
    const response = await this.clientContext.create<UserDefinition>(body, path, "users", id, undefined, options);
    const ref = new User(this.database, response.result.id, this.clientContext);
    return { body: response.result, headers: response.headers, ref, user: ref };
  }

  /**
   * Upsert a database user with a specified {@link UserDefinition}.
   * @param body The specified {@link UserDefinition}.
   * @param options
   */
  public async upsert(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.database.url, "users");
    const id = Helper.getIdFromLink(this.database.url);

    const response = await this.clientContext.upsert<UserDefinition>(body, path, "users", id, undefined, options);
    const ref = new User(this.database, response.result.id, this.clientContext);
    return { body: response.result, headers: response.headers, ref, user: ref };
  }
}
