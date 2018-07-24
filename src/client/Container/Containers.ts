import { StatusCodes } from "../../common";
import { HeaderUtils, SqlQuerySpec } from "../../queryExecutionContext";
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
   *
   * A container is a named logical container for items.
   *
   * A database may contain zero or more named containers and each container consists of
   * zero or more JSON items.
   *
   * Being schema-free, the items in a container do not need to share the same structure or fields.
   *
   *
   * Since containers are application resources, they can be authorized using either the
   * master key or resource keys.
   *
   * @param body Represents the body of the container.
   * @param options Use to set options like response page size, continuation tokens, etc.
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
   * Checks if a Container exists, and, if it doesn't, creates it.
   * This will make a read operation based on the id in the `body`, then if it is not found, a create operation.
   * You should confirm that the output matches the body you passed in for non-default properties (i.e. indexing policy/etc.)
   *
   * A container is a named logical container for items.
   *
   * A database may contain zero or more named containers and each container consists of
   * zero or more JSON items.
   *
   * Being schema-free, the items in a container do not need to share the same structure or fields.
   *
   *
   * Since containers are application resources, they can be authorized using either the
   * master key or resource keys.
   *
   * @param body Represents the body of the container.
   * @param options Use to set options like response page size, continuation tokens, etc.
   */
  public async createIfNotExists(body: ContainerDefinition, options?: RequestOptions): Promise<ContainerResponse> {
    if (!body || body.id === null || body.id === undefined) {
      throw new Error("body parameter must be an object with an id property");
    }
    /*
      1. Attempt to read the Database (based on an assumption that most databases will already exist, so its faster)
      2. If it fails with NotFound error, attempt to create the db. Else, return the read results.
    */
    try {
      const readResponse = await this.database.container(body.id).read(options);
      return readResponse;
    } catch (err) {
      if (err.code === StatusCodes.NotFound) {
        const createResponse = await this.create(body, options);
        // Must merge the headers to capture RU costskaty
        HeaderUtils.mergeHeaders(createResponse.headers, err.headers);
        return createResponse;
      } else {
        throw err;
      }
    }
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
