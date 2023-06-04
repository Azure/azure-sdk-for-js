// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import {
  createDocumentUri,
  getIdFromLink,
  getPathFromLink,
  isItemResourceValid,
  ResourceType,
  StatusCodes,
} from "../../common";
import { PartitionKey, PartitionKeyInternal, convertToInternalPartitionKey } from "../../documents";
import { extractPartitionKeys, undefinedPartitionKey } from "../../extractPartitionKey";
import { RequestOptions, Response } from "../../request";
import { PatchRequestBody } from "../../utils/patch";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";

/**
 * Used to perform operations on a specific item.
 *
 * @see {@link Items} for operations on all items; see `container.items`.
 */
export class Item {
  private partitionKey: PartitionKeyInternal;
  /**
   * Returns a reference URL to the resource. Used for linking in Permissions.
   */
  public get url(): string {
    return createDocumentUri(this.container.database.id, this.container.id, this.id);
  }

  /**
   * @hidden
   * @param container - The parent {@link Container}.
   * @param id - The id of the given {@link Item}.
   * @param partitionKey - The primary key of the given {@link Item} (only for partitioned containers).
   */
  constructor(
    public readonly container: Container,
    public readonly id: string,
    private readonly clientContext: ClientContext,
    partitionKey?: PartitionKey
  ) {
    this.partitionKey =
      partitionKey === undefined ? undefined : convertToInternalPartitionKey(partitionKey);
  }

  /**
   * Read the item's definition.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   * If the type, T, is a class, it won't pass `typeof` comparisons, because it won't have a match prototype.
   * It's recommended to only use interfaces.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param options - Additional options for the request
   *
   * @example Using custom type for response
   * ```typescript
   * interface TodoItem {
   *   title: string;
   *   done: bool;
   *   id: string;
   * }
   *
   * let item: TodoItem;
   * ({body: item} = await item.read<TodoItem>());
   * ```
   */
  public async read<T extends ItemDefinition = any>(
    options: RequestOptions = {}
  ): Promise<ItemResponse<T>> {
    if (this.partitionKey === undefined) {
      const { resource: partitionKeyDefinition } =
        await this.container.readPartitionKeyDefinition();
      this.partitionKey = undefinedPartitionKey(partitionKeyDefinition);
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);
    let response: Response<T & Resource>;
    try {
      response = await this.clientContext.read<T>({
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        options,
        partitionKey: this.partitionKey,
      });
    } catch (error: any) {
      if (error.code !== StatusCodes.NotFound) {
        throw error;
      }
      response = error;
    }

    return new ItemResponse(
      response.result,
      response.headers,
      response.code,
      response.substatus,
      this,
      response.diagnostics
    );
  }

  /**
   * Replace the item's definition.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - The definition to replace the existing {@link Item}'s definition with.
   * @param options - Additional options for the request
   */
  public replace(
    body: ItemDefinition,
    options?: RequestOptions
  ): Promise<ItemResponse<ItemDefinition>>;
  /**
   * Replace the item's definition.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * There is no set schema for JSON items. They may contain any number of custom properties.
   *
   * @param body - The definition to replace the existing {@link Item}'s definition with.
   * @param options - Additional options for the request
   */
  public replace<T extends ItemDefinition>(
    body: T,
    options?: RequestOptions
  ): Promise<ItemResponse<T>>;
  public async replace<T extends ItemDefinition>(
    body: T,
    options: RequestOptions = {}
  ): Promise<ItemResponse<T>> {
    if (this.partitionKey === undefined) {
      const { resource: partitionKeyDefinition } =
        await this.container.readPartitionKeyDefinition();
      this.partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
    }

    const err = {};
    if (!isItemResourceValid(body, err)) {
      throw err;
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.replace<T>({
      body,
      path,
      resourceType: ResourceType.item,
      resourceId: id,
      options,
      partitionKey: this.partitionKey,
    });
    return new ItemResponse(
      response.result,
      response.headers,
      response.code,
      response.substatus,
      this,
      response.diagnostics
    );
  }

  /**
   * Delete the item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * @param options - Additional options for the request
   */
  public async delete<T extends ItemDefinition = any>(
    options: RequestOptions = {}
  ): Promise<ItemResponse<T>> {
    if (this.partitionKey === undefined) {
      const { resource: partitionKeyDefinition } =
        await this.container.readPartitionKeyDefinition();
      this.partitionKey = undefinedPartitionKey(partitionKeyDefinition);
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.delete<T>({
      path,
      resourceType: ResourceType.item,
      resourceId: id,
      options,
      partitionKey: this.partitionKey,
    });
    return new ItemResponse(
      response.result,
      response.headers,
      response.code,
      response.substatus,
      this,
      response.diagnostics
    );
  }

  /**
   * Perform a JSONPatch on the item.
   *
   * Any provided type, T, is not necessarily enforced by the SDK.
   * You may get more or less properties and it's up to your logic to enforce it.
   *
   * @param options - Additional options for the request
   */
  public async patch<T extends ItemDefinition = any>(
    body: PatchRequestBody,
    options: RequestOptions = {}
  ): Promise<ItemResponse<T>> {
    if (this.partitionKey === undefined) {
      const { resource: partitionKeyDefinition } =
        await this.container.readPartitionKeyDefinition();
      this.partitionKey = extractPartitionKeys(body, partitionKeyDefinition);
    }

    const path = getPathFromLink(this.url);
    const id = getIdFromLink(this.url);

    const response = await this.clientContext.patch<T>({
      body,
      path,
      resourceType: ResourceType.item,
      resourceId: id,
      options,
      partitionKey: this.partitionKey,
    });
    return new ItemResponse(
      response.result,
      response.headers,
      response.code,
      response.substatus,
      this,
      response.diagnostics
    );
  }
}
