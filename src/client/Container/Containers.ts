import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions } from "../../request";
import { Database } from "../Database";
import { Container } from "./Container";
import { ContainerDefinition } from "./ContainerDefinition";
import { ContainerResponse } from "./ContainerResponse";

/**
 * Operations for creating new containers, and reading/querying all containers
 *
 * @see {@link Container} for reading, replacing, or deleting an existing container; use `.container(id)`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `containers.readAll()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export class Containers {
  constructor(public readonly database: Database) {}

  /**
   * Queries all containers.
   * @param query Query configuration for the operation. See {@link SqlQuerySpec} for more info on how to configure a query.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return specific contaienrs in an array or iterate over them one at a time.
   * @example Read all containers to array.
   * ```typescript
   * const querySpec: SqlQuerySpec = {
   *   query: "SELECT * FROM root r WHERE r.id = @container",
   *   parameters: [
   *     {name: "@container", value: "Todo"}
   *   ]
   * };
   * const {body: containerList} = await client.database("<db id>").containers.query(querySpec).toArray();
   * ```
   */
  public query(query: SqlQuerySpec, options?: FeedOptions): QueryIterator<ContainerDefinition> {
    return this.database.client.documentClient.queryCollections(this.database.url, query, options);
  }

  /**
   * Creates a container.
   * <p>
   * A container is a named logical container for items. <br>
   * A database may contain zero or more named containers and each container consists of \
   * zero or more JSON items. <br>
   * Being schema-free, the items in a container do not need to share the same structure or fields. <br>
   * Since containers are application resources, they can be authorized using either the \
   * master key or resource keys. <br>
   * </p>
   * @param body                          - Represents the body of the container.
   */
  public async create(body: ContainerDefinition, options?: RequestOptions): Promise<ContainerResponse> {
    const response = await this.database.client.documentClient.createCollection(this.database.url, body, options);
    const ref = new Container(this.database, response.result.id);
    return {
      body: response.result,
      headers: response.headers,
      ref,
      container: ref
    };
  }

  /**
   * Read all containers.
   * @param options Use to set options like response page size, continuation tokens, etc.
   * @returns {@link QueryIterator} Allows you to return all containers in an array or iterate over them one at a time.
   * @example Read all containers to array.
   * ```typescript
   * const {body: containerList} = await client.database("<db id>").containers.readAll().toArray();
   * ```
   */
  public readAll(options?: FeedOptions): QueryIterator<ContainerDefinition> {
    return this.database.client.documentClient.readCollections(this.database.url, options);
  }
}
