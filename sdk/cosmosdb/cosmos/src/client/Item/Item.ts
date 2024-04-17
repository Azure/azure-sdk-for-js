// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
import {
  copyObject,
  createDocumentUri,
  getIdFromLink,
  getPathFromLink,
  isItemResourceValid,
  ResourceType,
  StatusCodes,
} from "../../common";
import { PartitionKey, PartitionKeyInternal, convertToInternalPartitionKey } from "../../documents";
import { RequestOptions, Response } from "../../request";
import { PatchRequestBody } from "../../utils/patch";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
import { setPartitionKeyIfUndefined } from "../../extractPartitionKey";

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
    partitionKey?: PartitionKey,
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
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );
      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        this.partitionKey = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
          this.partitionKey,
        );
        const url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
        path = getPathFromLink(url);
        id = getIdFromLink(url);
      }

      let response: Response<T & Resource>;
      try {
        response = await this.clientContext.read<T>({
          path,
          resourceType: ResourceType.item,
          resourceId: id,
          options,
          partitionKey: this.partitionKey,
          diagnosticNode,
        });
      } catch (error: any) {
        if (error.code !== StatusCodes.NotFound) {
          throw error;
        }
        response = error;
      }

      if (this.clientContext.enableEncyption) {
        response.result = await this.container.encryptionProcessor.decrypt(response.result);
      }

      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
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
    options?: RequestOptions,
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
    options?: RequestOptions,
  ): Promise<ItemResponse<T>>;
  public async replace<T extends ItemDefinition>(
    body: T,
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );
      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        body = copyObject(body);
        body = await this.container.encryptionProcessor.encrypt(body);
        this.partitionKey = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
          this.partitionKey,
        );
        const url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
        path = getPathFromLink(url);
        id = getIdFromLink(url);
      }
      const response = await this.clientContext.replace<T>({
        body,
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        options,
        partitionKey: this.partitionKey,
        diagnosticNode,
      });

      if (this.clientContext.enableEncyption) {
        response.result = await this.container.encryptionProcessor.decrypt(response.result);
      }
      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
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
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        this.partitionKey = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
          this.partitionKey,
        );
        const url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
        path = getPathFromLink(url);
        id = getIdFromLink(url);
      }

      const response = await this.clientContext.delete<T>({
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        options,
        partitionKey: this.partitionKey,
        diagnosticNode,
      });

      if (this.clientContext.enableEncyption) {
        response.result = await this.container.encryptionProcessor.decrypt(response.result);
      }

      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
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
    options: RequestOptions = {},
  ): Promise<ItemResponse<T>> {
    return withDiagnostics(async (diagnosticNode: DiagnosticNodeInternal) => {
      this.partitionKey = await setPartitionKeyIfUndefined(
        diagnosticNode,
        this.container,
        this.partitionKey,
      );

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        body = copyObject(body);
        const operations = Array.isArray(body) ? body : body.operations;
        for (const operation of operations) {
          if ("value" in operation) {
            operation.value = await this.container.encryptionProcessor.encryptProperty(
              operation.path,
              operation.value,
            );
          }
        }
        this.partitionKey = await this.container.encryptionProcessor.getEncryptedPartitionKeyValue(
          this.partitionKey,
        );
        const url = await this.container.encryptionProcessor.getEncryptedUrl(this.url);
        path = getPathFromLink(url);
        id = getIdFromLink(url);
      }

      const response = await this.clientContext.patch<T>({
        body,
        path,
        resourceType: ResourceType.item,
        resourceId: id,
        options,
        partitionKey: this.partitionKey,
        diagnosticNode,
      });

      if (this.clientContext.enableEncyption) {
        response.result = await this.container.encryptionProcessor.decrypt(response.result);
      }

      return new ItemResponse(
        response.result,
        response.headers,
        response.code,
        response.substatus,
        this,
        getEmptyCosmosDiagnostics(),
      );
    }, this.clientContext);
  }
}
