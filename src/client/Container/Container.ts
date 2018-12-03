import { PartitionKey } from "../..";
import { ClientContext } from "../../ClientContext";
import { Helper, UriFactory } from "../../common";
import { PartitionKeyDefinition } from "../../documents";
import { CosmosResponse, FeedOptions, RequestOptions } from "../../request";
import { Conflict, Conflicts } from "../Conflict";
import { Database } from "../Database";
import { Item, Items } from "../Item";
import { StoredProcedure, StoredProcedures } from "../StoredProcedure";
import { Trigger, Triggers } from "../Trigger";
import { UserDefinedFunction, UserDefinedFunctions } from "../UserDefinedFunction";
import { ContainerDefinition } from "./ContainerDefinition";
import { ContainerResponse } from "./ContainerResponse";

/**
 * Operations for reading, replacing, or deleting a specific, existing container by id.
 *
 * @see {@link Containers} for creating new containers, and reading/querying all containers; use `.containers`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `container(id).read()` before every single `item.read()` call, to ensure the container exists;
 * do this once on application start up.
 */
export class Container {
  /**
   * Operations for creating new items, and reading/querying all items
   *
   * For reading, replacing, or deleting an existing item, use `.item(id)`.
   *
   * @example Create a new item
   * ```typescript
   * const {body: createdItem} = await container.items.create({id: "<item id>", properties: {}});
   * ```
   */
  public readonly items: Items;
  /**
   * Operations for creating new stored procedures, and reading/querying all stored procedures.
   *
   * For reading, replacing, or deleting an existing stored procedure, use `.storedProcedure(id)`.
   */
  public readonly storedProcedures: StoredProcedures;
  /**
   * Operations for creating new triggers, and reading/querying all triggers.
   *
   * For reading, replacing, or deleting an existing trigger, use `.trigger(id)`.
   */
  public readonly triggers: Triggers;
  /**
   * Operations for creating new user defined functions, and reading/querying all user defined functions.
   *
   * For reading, replacing, or deleting an existing user defined function, use `.userDefinedFunction(id)`.
   */
  public readonly userDefinedFunctions: UserDefinedFunctions;

  public readonly conflicts: Conflicts;

  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url() {
    return UriFactory.createDocumentCollectionUri(this.database.id, this.id);
  }

  /**
   * Returns a container instance. Note: You should get this from `database.container(id)`, rather than creating your own object.
   * @param database The parent {@link Database}.
   * @param id The id of the given container.
   * @hidden
   */
  constructor(
    public readonly database: Database,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {
    this.items = new Items(this, this.clientContext);
    this.storedProcedures = new StoredProcedures(this, this.clientContext);
    this.triggers = new Triggers(this, this.clientContext);
    this.userDefinedFunctions = new UserDefinedFunctions(this, this.clientContext);
    this.conflicts = new Conflicts(this, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Item} by id.
   *
   * Use `.items` for creating new items, or querying/reading all items.
   *
   * @param id The id of the {@link Item}.
   * @param partitionKey The partition key of the {@link Item}. (Required for partitioned containers).
   * @example Replace an item
   * const {body: replacedItem} = await container.item("<item id>").replace({id: "<item id>", title: "Updated post", authorID: 5});
   */
  public item(id: string, partitionKey?: string): Item {
    return new Item(this, id, partitionKey, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link UserDefinedFunction} by id.
   *
   * Use `.userDefinedFunctions` for creating new user defined functions, or querying/reading all user defined functions.
   * @param id The id of the {@link UserDefinedFunction}.
   */
  public userDefinedFunction(id: string): UserDefinedFunction {
    return new UserDefinedFunction(this, id, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Conflict} by id.
   *
   * Use `.conflicts` for creating new conflicts, or querying/reading all conflicts.
   * @param id The id of the {@link Conflict}.
   */
  public conflict(id: string): Conflict {
    return new Conflict(this, id, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link StoredProcedure} by id.
   *
   * Use `.storedProcedures` for creating new stored procedures, or querying/reading all stored procedures.
   * @param id The id of the {@link StoredProcedure}.
   */
  public storedProcedure(id: string): StoredProcedure {
    return new StoredProcedure(this, id, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Trigger} by id.
   *
   * Use `.triggers` for creating new triggers, or querying/reading all triggers.
   * @param id The id of the {@link Trigger}.
   */
  public trigger(id: string): Trigger {
    return new Trigger(this, id, this.clientContext);
  }

  /** Read the container's definition */
  public async read(options?: RequestOptions): Promise<ContainerResponse> {
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.read<ContainerDefinition>(path, "colls", id, undefined, options);
    this.clientContext.partitionKeyDefinitionCache[this.url] = response.result.partitionKey;
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      container: this
    };
  }

  /** Replace the container's definition */
  public async replace(body: ContainerDefinition, options?: RequestOptions): Promise<ContainerResponse> {
    const err = {};
    if (!Helper.isResourceValid(body, err)) {
      throw err;
    }

    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.replace<ContainerDefinition>(body, path, "colls", id, undefined, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      container: this
    };
  }

  /** Delete the container */
  public async delete(options?: RequestOptions): Promise<ContainerResponse> {
    const path = Helper.getPathFromLink(this.url);
    const id = Helper.getIdFromLink(this.url);

    const response = await this.clientContext.delete<ContainerDefinition>(path, "colls", id, undefined, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      container: this
    };
  }

  /**
   * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
   * @ignore
   * @param {string} collectionLink   - Link to the collection whose partition key needs to be extracted.
   * @param {function} callback       - \
   * The arguments to the callback are(in order): error, partitionKeyDefinition, response object and response headers
   */
  public async getPartitionKeyDefinition(): Promise<CosmosResponse<PartitionKeyDefinition, Container>> {
    // $ISSUE-felixfan-2016-03-17: Make name based path and link based path use the same key
    // $ISSUE-felixfan-2016-03-17: Refresh partitionKeyDefinitionCache when necessary
    if (this.url in this.clientContext.partitionKeyDefinitionCache) {
      return {
        body: this.clientContext.partitionKeyDefinitionCache[this.url],
        ref: this
      };
    }

    const { headers } = await this.read();
    return {
      body: this.clientContext.partitionKeyDefinitionCache[this.url],
      headers,
      ref: this
    };
  }

  public readPartitionKeyRanges(feedOptions?: FeedOptions) {
    feedOptions = feedOptions || {};
    return this.clientContext.queryPartitionKeyRanges(this.url, undefined, feedOptions);
  }

  // TODO: The ParitionKey type is REALLY weird. Now that it's being exported, we should clean it up.
  public extractPartitionKey(document: any, partitionKeyDefinition: PartitionKeyDefinition): PartitionKey[] {
    // TODO: any
    if (partitionKeyDefinition && partitionKeyDefinition.paths && partitionKeyDefinition.paths.length > 0) {
      const partitionKey: PartitionKey[] = [];
      partitionKeyDefinition.paths.forEach((path: string) => {
        const pathParts = Helper.parsePath(path);

        let obj = document;
        for (const part of pathParts) {
          if (!(typeof obj === "object" && part in obj)) {
            obj = {};
            break;
          }

          obj = obj[part];
        }

        partitionKey.push(obj);
      });

      return partitionKey;
    }

    return undefined;
  }
}
