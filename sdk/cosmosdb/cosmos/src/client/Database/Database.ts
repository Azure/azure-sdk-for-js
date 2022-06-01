// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { createDatabaseUri, getIdFromLink, getPathFromLink, ResourceType } from "../../common";
import { CosmosClient } from "../../CosmosClient";
import { RequestOptions } from "../../request";
import { Container, Containers } from "../Container";
import { User, Users } from "../User";
import { DatabaseDefinition } from "./DatabaseDefinition";
import { DatabaseResponse } from "./DatabaseResponse";
import { OfferResponse, OfferDefinition, Offer } from "../Offer";
import { Resource } from "../Resource";

/**
 * Operations for reading or deleting an existing database.
 *
 * @see {@link Databases} for creating new databases, and reading/querying all databases; use `client.databases`.
 *
 * Note: all these operations make calls against a fixed budget.
 * You should design your system such that these calls scale sublinearly with your application.
 * For instance, do not call `database.read()` before every single `item.read()` call, to ensure the database exists;
 * do this once on application start up.
 */
export class Database {
  /**
   * Used for creating new containers, or querying/reading all containers.
   *
   * Use `.database(id)` to read, replace, or delete a specific, existing {@link Database} by id.
   *
   * @example Create a new container
   * ```typescript
   * const {body: containerDefinition, container} = await client.database("<db id>").containers.create({id: "<container id>"});
   * ```
   */
  public readonly containers: Containers;
  /**
   * Used for creating new users, or querying/reading all users.
   *
   * Use `.user(id)` to read, replace, or delete a specific, existing {@link User} by id.
   */
  public readonly users: Users;

  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createDatabaseUri(this.id);
  }

  /** Returns a new {@link Database} instance.
   *
   * Note: the intention is to get this object from {@link CosmosClient} via `client.database(id)`, not to instantiate it yourself.
   */
  constructor(
    public readonly client: CosmosClient,
    public readonly id: string,
    private clientContext: ClientContext
  ) {
    this.containers = new Containers(this, this.clientContext);
    this.users = new Users(this, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Database} by id.
   *
   * Use `.containers` creating new containers, or querying/reading all containers.
   *
   * @example Delete a container
   * ```typescript
   * await client.database("<db id>").container("<container id>").delete();
   * ```
   */
  public container(id: string): Container {
    return new Container(this, id, this.clientContext);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link User} by id.
   *
   * Use `.users` for creating new users, or querying/reading all users.
   */
  public user(id: string): User {
    return new User(this, id, this.clientContext);
  }

  /** Read the definition of the given Database. */
  public async read(options?: RequestOptions): Promise<DatabaseResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.read<DatabaseDefinition>({
      path,
      resourceType: ResourceType.database,
      resourceId: id,
      options,
    });
    return new DatabaseResponse(response.result, response.headers, response.code, this);
  }

  /** Delete the given Database. */
  public async delete(options?: RequestOptions): Promise<DatabaseResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    const response = await this.clientContext.delete<DatabaseDefinition>({
      path,
      resourceType: ResourceType.database,
      resourceId: id,
      options,
    });
    return new DatabaseResponse(response.result, response.headers, response.code, this);
  }

  /**
   * Gets offer on database. If none exists, returns an OfferResponse with undefined.
   */
  public async readOffer(options: RequestOptions = {}): Promise<OfferResponse> {
    const { resource: record } = await this.read();
    const path = "/offers";
    const url = record._self;
    const response = await this.clientContext.queryFeed<OfferDefinition & Resource[]>({
      path,
      resourceId: "",
      resourceType: ResourceType.offer,
      query: `SELECT * from root where root.resource = "${url}"`,
      resultFn: (result) => result.Offers,
      options,
    });
    const offer = response.result[0]
      ? new Offer(this.client, response.result[0].id, this.clientContext)
      : undefined;
    return new OfferResponse(response.result[0], response.headers, response.code, offer);
  }
}
