// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { ClientContext } from "../../ClientContext";
import { DiagnosticNodeInternal } from "../../diagnostics/DiagnosticNodeInternal";
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
import { readPartitionKeyDefinition } from "../ClientUtils";
import { Container } from "../Container";
import { Resource } from "../Resource";
import { ItemDefinition } from "./ItemDefinition";
import { ItemResponse } from "./ItemResponse";
import { getEmptyCosmosDiagnostics, withDiagnostics } from "../../utils/diagnostics";
import { EncryptionProcessor } from "../../encryption";

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
      if (this.partitionKey === undefined) {
        const partitionKeyDefinition = await readPartitionKeyDefinition(
          diagnosticNode,
          this.container,
        );
        this.partitionKey = undefinedPartitionKey(partitionKeyDefinition);
      }

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        this.partitionKey = await this.getEncryptedPartitionKeyIfEncrypted(this.partitionKey);
        id = await this.getEncryptedIdIfEncrypted(id);
        path = await this.getEncryptedIdIfEncrypted(path);
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
        response.result = await this.decryptItem(response.result);
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
      if (this.partitionKey === undefined) {
        const partitionKeyResponse = await readPartitionKeyDefinition(
          diagnosticNode,
          this.container,
        );
        this.partitionKey = extractPartitionKeys(body, partitionKeyResponse);
      }

      const err = {};
      if (!isItemResourceValid(body, err)) {
        throw err;
      }

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        body = await this.encryptItem(body);
        this.partitionKey = await this.getEncryptedPartitionKeyIfEncrypted(this.partitionKey);
        id = await this.getEncryptedIdIfEncrypted(id);
        path = await this.getEncryptedIdIfEncrypted(path);
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
        response.result = await this.decryptItem(response.result);
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
      if (this.partitionKey === undefined) {
        const partitionKeyResponse = await readPartitionKeyDefinition(
          diagnosticNode,
          this.container,
        );
        this.partitionKey = undefinedPartitionKey(partitionKeyResponse);
      }

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        this.partitionKey = await this.getEncryptedPartitionKeyIfEncrypted(this.partitionKey);
        id = await this.getEncryptedIdIfEncrypted(id);
        path = await this.getEncryptedIdIfEncrypted(path);
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
        response.result = await this.decryptItem(response.result);
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
      if (this.partitionKey === undefined) {
        const partitionKeyResponse = await readPartitionKeyDefinition(
          diagnosticNode,
          this.container,
        );
        this.partitionKey = extractPartitionKeys(body, partitionKeyResponse);
      }

      let path = getPathFromLink(this.url);
      let id = getIdFromLink(this.url);

      if (this.clientContext.enableEncyption) {
        const operations = Array.isArray(body) ? body : body.operations;
        for (const operation of operations) {
          if ("value" in operation) {
            operation.value = await this.encryptValue(operation.path, operation.value);
          }
        }
        this.partitionKey = await this.getEncryptedPartitionKeyIfEncrypted(this.partitionKey);
        id = await this.getEncryptedIdIfEncrypted(id);
        path = await this.getEncryptedIdIfEncrypted(path);
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
        response.result = await this.decryptItem(response.result);
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

  async encryptItem<T extends ItemDefinition>(item: T): Promise<T> {
    const key = this.container.database.id + "/" + this.container.id;
    let encryptionSettings = this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    if (encryptionSettings === undefined) {
      await this.container.initializeEncryption();
      encryptionSettings = this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    }

    if (encryptionSettings.pathsToEncrypt.length === 0) return item;
    const encryptedItem = await EncryptionProcessor.encrypt(
      item,
      encryptionSettings,
      this.clientContext.encryptionKeyStoreProvider,
      this.container,
    );
    return encryptedItem;
  }

  async getEncryptedPartitionKeyIfEncrypted(
    partitionKeyList: PartitionKeyInternal,
  ): Promise<PartitionKeyInternal> {
    const key = this.container.database.id + "/" + this.container.id;
    let encryptionSettings = this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);

    if (encryptionSettings === undefined) {
      await this.container.initializeEncryption();
      encryptionSettings = this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    }
    const partitionKeyPaths = encryptionSettings.partitionKeyPaths;
    for (let i = 0; i < partitionKeyPaths.length; i++) {
      if (encryptionSettings.pathsToEncrypt.includes(partitionKeyPaths[i])) {
        const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(
          partitionKeyPaths[i],
        );
        const clientEncryptionKeyProperties = await this.container.getClientEncryptionKeyProperties(
          partitionKeyPaths[i],
        );
        partitionKeyList[i] = await EncryptionProcessor.encryptToken(
          partitionKeyList[i],
          settingForProperty,
          partitionKeyPaths[i] === "/id",
          this.clientContext.encryptionKeyStoreProvider,
          clientEncryptionKeyProperties,
        );
      }
    }
    return partitionKeyList;
  }

  async IdEncryptionHelper(id: string): Promise<string> {
    const key = this.container.database.id + "/" + this.container.id;
    const encryptionSettings =
      this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty("/id");

    if (settingForProperty == null) return id;
    const clientEncryptionKeyProperties =
      await this.container.getClientEncryptionKeyProperties("/id");
    if (settingForProperty != null) {
      id = await EncryptionProcessor.encryptToken(
        id,
        settingForProperty,
        true,
        this.clientContext.encryptionKeyStoreProvider,
        clientEncryptionKeyProperties,
      );
    }
    return id;
  }

  async getEncryptedIdIfEncrypted(id: string): Promise<string> {
    const parts = id.split("/");
    const lastPart = parts[parts.length - 1];
    const encryptedLastPart = await this.IdEncryptionHelper(lastPart);
    parts[parts.length - 1] = encryptedLastPart;
    return parts.join("/");
  }

  async decryptItem<T extends ItemDefinition>(item: T): Promise<T> {
    const key = this.container.database.id + "/" + this.container.id;
    const encryptionSettings =
      this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    item = await EncryptionProcessor.decrypt(
      item,
      encryptionSettings,
      this.clientContext.encryptionKeyStoreProvider,
      this.container,
    );
    return item;
  }

  async encryptValue(
    property: string,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    value: any,
  ): Promise<any> {
    const key = this.container.database.id + "/" + this.container.id;
    let encryptionSettings = this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    if (encryptionSettings === undefined) {
      await this.container.initializeEncryption();
      encryptionSettings = this.clientContext.encryptionSettingsCache.getEncryptionSettings(key);
    }
    const settingForProperty = encryptionSettings.getEncryptionSettingForProperty(property);
    if (settingForProperty == null) {
      return value;
    }
    const clientEncryptionKeyProperties =
      await this.container.getClientEncryptionKeyProperties(property);
    value = await EncryptionProcessor.encryptToken(
      value,
      settingForProperty,
      property === "/id",
      this.clientContext.encryptionKeyStoreProvider,
      clientEncryptionKeyProperties,
    );
    return value;
  }
}
