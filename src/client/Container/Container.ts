import { Constants, UriFactory } from "../../common";
import { RequestOptions, Response } from "../../request";
import { Conflict } from "../Conflict";
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
  constructor(public readonly database: Database, public readonly id: string) {
    this.items = new Items(this);
    this.storedProcedures = new StoredProcedures(this);
    this.triggers = new Triggers(this);
    this.userDefinedFunctions = new UserDefinedFunctions(this);
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
    return new Item(this, id, partitionKey);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link UserDefinedFunction} by id.
   *
   * Use `.userDefinedFunctions` for creating new user defined functions, or querying/reading all user defined functions.
   * @param id The id of the {@link UserDefinedFunction}.
   */
  public userDefinedFunction(id: string): UserDefinedFunction {
    return new UserDefinedFunction(this, id);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Conflict} by id.
   *
   * Use `.conflicts` for creating new conflicts, or querying/reading all conflicts.
   * @param id The id of the {@link Conflict}.
   */
  public conflict(id: string): Conflict {
    return new Conflict(this, id);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link StoredProcedure} by id.
   *
   * Use `.storedProcedures` for creating new stored procedures, or querying/reading all stored procedures.
   * @param id The id of the {@link StoredProcedure}.
   */
  public storedProcedure(id: string): StoredProcedure {
    return new StoredProcedure(this, id);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Trigger} by id.
   *
   * Use `.triggers` for creating new triggers, or querying/reading all triggers.
   * @param id The id of the {@link Trigger}.
   */
  public trigger(id: string): Trigger {
    return new Trigger(this, id);
  }

  /** Read the container's definition */
  public async read(options?: RequestOptions): Promise<ContainerResponse> {
    const response = await this.database.client.documentClient.readCollection(this.url, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      container: this
    };
  }

  /** Replace the container's definition */
  public async replace(body: ContainerDefinition, options?: RequestOptions): Promise<ContainerResponse> {
    const response = await this.database.client.documentClient.replaceCollection(this.url, body, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      container: this
    };
  }

  /** Delete the container */
  public async delete(options?: RequestOptions): Promise<ContainerResponse> {
    const response = await this.database.client.documentClient.deleteCollection(this.url, options);
    return {
      body: response.result,
      headers: response.headers,
      ref: this,
      container: this
    };
  }
}
