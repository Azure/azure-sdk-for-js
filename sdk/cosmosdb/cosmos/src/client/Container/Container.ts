// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  createDocumentCollectionUri,
  getIdFromLink,
  getPathFromLink,
  HTTPMethod,
  isResourceValid,
  ResourceType,
} from "../../common";
import { PartitionKey, PartitionKeyDefinition } from "../../documents";
import { SqlQuerySpec } from "../../queryExecutionContext";
import { QueryIterator } from "../../queryIterator";
import { FeedOptions, RequestOptions, ResourceResponse, Response } from "../../request";
import { PartitionedQueryExecutionInfo } from "../../request/ErrorResponse";
import { Conflict, Conflicts } from "../Conflict";
import { Database } from "../Database";
import { Item, Items } from "../Item";
import { Scripts } from "../Script/Scripts";
import { ContainerDefinition } from "./ContainerDefinition";
import { ContainerResponse } from "./ContainerResponse";
import { PartitionKeyRange } from "./PartitionKeyRange";
import { Offer, OfferDefinition } from "../Offer";
import { OfferResponse } from "../Offer/OfferResponse";
import { Resource } from "../Resource";
import { getEmptyCosmosDiagnostics } from "../../CosmosDiagnostics";

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
  private $items: Items;
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
  public get items(): Items {
    if (!this.$items) {
      this.$items = new Items(this, this.clientContext);
    }
    return this.$items;
  }

  private $scripts: Scripts;
  /**
   * All operations for Stored Procedures, Triggers, and User Defined Functions
   */
  public get scripts(): Scripts {
    if (!this.$scripts) {
      this.$scripts = new Scripts(this, this.clientContext);
    }
    return this.$scripts;
  }

  private $conflicts: Conflicts;
  /**
   * Operations for reading and querying conflicts for the given container.
   *
   * For reading or deleting a specific conflict, use `.conflict(id)`.
   */
  public get conflicts(): Conflicts {
    if (!this.$conflicts) {
      this.$conflicts = new Conflicts(this, this.clientContext);
    }
    return this.$conflicts;
  }

  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createDocumentCollectionUri(this.database.id, this.id);
  }

  /**
   * Returns a container instance. Note: You should get this from `database.container(id)`, rather than creating your own object.
   * @param database - The parent {@link Database}.
   * @param id - The id of the given container.
   * @hidden
   */
  constructor(
    public readonly database: Database,
    public readonly id: string,
    private readonly clientContext: ClientContext
  ) {}

  /**
   * Used to read, replace, or delete a specific, existing {@link Item} by id.
   *
   * Use `.items` for creating new items, or querying/reading all items.
   *
   * @param id - The id of the {@link Item}.
   * @param partitionKeyValue - The value of the {@link Item} partition key
   * @example Replace an item
   * `const {body: replacedItem} = await container.item("<item id>", "<partition key value>").replace({id: "<item id>", title: "Updated post", authorID: 5});`
   */
  public item(id: string, partitionKeyValue?: PartitionKey): Item {
    return new Item(this, id, this.clientContext, partitionKeyValue);
  }

  /**
   * Used to read, replace, or delete a specific, existing {@link Conflict} by id.
   *
   * Use `.conflicts` for creating new conflicts, or querying/reading all conflicts.
   * @param id - The id of the {@link Conflict}.
   */
  public conflict(id: string, partitionKey?: PartitionKey): Conflict {
    return new Conflict(this, id, this.clientContext, partitionKey);
  }

  /** Read the container's definition */
  public async read(options?: RequestOptions): Promise<ContainerResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.read<ContainerDefinition>({
      path,
      resourceType: ResourceType.container,
      resourceId: id,
      options,
    });
    this.clientContext.partitionKeyDefinitionCache[this.url] = response.result.partitionKey;
    return new ContainerResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }

  /** Replace the container's definition */
  public async replace(
    body: ContainerDefinition,
    options?: RequestOptions
  ): Promise<ContainerResponse> {
    const err = {};
    if (!isResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace<ContainerDefinition>({
      body,
      path,
      resourceType: ResourceType.container,
      resourceId: id,
      options,
    });
    return new ContainerResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }

  /** Delete the container */
  public async delete(options?: RequestOptions): Promise<ContainerResponse> {
    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<ContainerDefinition>({
      path,
      resourceType: ResourceType.container,
      resourceId: id,
      options,
    });
    return new ContainerResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }

  /**
   * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
   * @deprecated This method has been renamed to readPartitionKeyDefinition.
   */
  public async getPartitionKeyDefinition(): Promise<ResourceResponse<PartitionKeyDefinition>> {
    return this.readPartitionKeyDefinition();
  }

  /**
   * Gets the partition key definition first by looking into the cache otherwise by reading the collection.
   * @hidden
   */
  public async readPartitionKeyDefinition(): Promise<ResourceResponse<PartitionKeyDefinition>> {
    // $ISSUE-felixfan-2016-03-17: Make name based path and link based path use the same key
    // $ISSUE-felixfan-2016-03-17: Refresh partitionKeyDefinitionCache when necessary
    if (this.url in this.clientContext.partitionKeyDefinitionCache) {
      return new ResourceResponse<PartitionKeyDefinition>(
        this.clientContext.partitionKeyDefinitionCache[this.url],
        {},
        0,
        getEmptyCosmosDiagnostics()
      );
    }

    const { headers, statusCode, diagnostics } = await this.read();
    return new ResourceResponse<PartitionKeyDefinition>(
      this.clientContext.partitionKeyDefinitionCache[this.url],
      headers,
      statusCode,
      diagnostics
    );
  }

  /**
   * Gets offer on container. If none exists, returns an OfferResponse with undefined.
   */
  public async readOffer(options: RequestOptions = {}): Promise<OfferResponse> {
    const { resource: container } = await this.read();
    const path = "/offers";
    const url = container._self;
    const response = await this.clientContext.queryFeed<OfferDefinition & Resource[]>({
      path,
      resourceId: "",
      resourceType: ResourceType.offer,
      query: `SELECT * from root where root.resource = "${url}"`,
      resultFn: (result) => result.Offers,
      options,
    });
    const offer = response.result[0]
      ? new Offer(this.database.client, response.result[0].id, this.clientContext)
      : undefined;
    return new OfferResponse(
      response.result[0],
      response.headers,
      response.code,
      response.diagnostics,
      offer
    );
  }

  public async getQueryPlan(
    query: string | SqlQuerySpec
  ): Promise<Response<PartitionedQueryExecutionInfo>> {
    const path = getPathFromLink(this.url);
    return this.clientContext.getQueryPlan(
      path + "/docs",
      ResourceType.item,
      getIdFromLink(this.url),
      query
    );
  }

  public readPartitionKeyRanges(feedOptions?: FeedOptions): QueryIterator<PartitionKeyRange> {
    feedOptions = feedOptions || {};
    return this.clientContext.queryPartitionKeyRanges(this.url, undefined, feedOptions);
  }

  /**
   * Delete all documents belong to the container for the provided partition key value
   * @param partitionKey - The partition key value of the items to be deleted
   */
  public async deleteAllItemsForPartitionKey(
    partitionKey: PartitionKey,
    options?: RequestOptions
  ): Promise<ContainerResponse> {
    let path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    path = path + "/operations/partitionkeydelete";
    const response = await this.clientContext.delete<ContainerDefinition>({
      path,
      resourceType: ResourceType.container,
      resourceId: id,
      options,
      partitionKey: partitionKey,
      method: HTTPMethod.post,
    });
    return new ContainerResponse(
      response.result,
      response.headers,
      response.code,
      this,
      response.diagnostics
    );
  }
}
