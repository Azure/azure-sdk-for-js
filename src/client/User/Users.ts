import { CosmosClient } from "../../CosmosClient";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Database } from "../Database";
import { User } from "./User";
import { UserDefinition } from "./UserDefinition";
import { UserResponse } from "./UserResponse";

export class Users {
  private client: CosmosClient;
  constructor(public readonly database: Database) {
    this.client = this.database.client;
  }

  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<UserDefinition> {
    return this.client.documentClient.queryUsers(this.database.url, query, options);
  }

  public readAll(options?: FeedOptions): QueryIterator<UserDefinition> {
    return this.client.documentClient.readUsers(this.database.url, options);
  }

  /**
   * Create a database user.
   * @param body                 - Represents the body of the user.
   */
  public async create(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const response = await this.client.documentClient.createUser(this.database.url, body, options);
    const ref = new User(this.database, response.result.id);
    return { body: response.result, headers: response.headers, ref, user: ref };
  }

  public async upsert(body: UserDefinition, options?: RequestOptions): Promise<UserResponse> {
    const response = await this.client.documentClient.upsertUser(this.database.url, body, options);
    const ref = new User(this.database, response.result.id);
    return { body: response.result, headers: response.headers, ref, user: ref };
  }
}
