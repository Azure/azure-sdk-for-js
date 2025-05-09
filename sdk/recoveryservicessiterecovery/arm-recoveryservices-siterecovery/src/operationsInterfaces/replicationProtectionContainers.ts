/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  ProtectionContainer,
  ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
  ReplicationProtectionContainersListOptionalParams,
  ReplicationProtectionContainersGetOptionalParams,
  ReplicationProtectionContainersGetResponse,
  CreateProtectionContainerInput,
  ReplicationProtectionContainersCreateOptionalParams,
  ReplicationProtectionContainersCreateResponse,
  DiscoverProtectableItemRequest,
  ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ReplicationProtectionContainersDiscoverProtectableItemResponse,
  ReplicationProtectionContainersDeleteOptionalParams,
  SwitchClusterProtectionInput,
  ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ReplicationProtectionContainersSwitchClusterProtectionResponse,
  SwitchProtectionInput,
  ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ReplicationProtectionContainersSwitchProtectionResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a ReplicationProtectionContainers. */
export interface ReplicationProtectionContainers {
  /**
   * Lists the protection containers in the specified fabric.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param options The options parameters.
   */
  listByReplicationFabrics(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    options?: ReplicationProtectionContainersListByReplicationFabricsOptionalParams,
  ): PagedAsyncIterableIterator<ProtectionContainer>;
  /**
   * Lists the protection containers in a vault.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    resourceName: string,
    options?: ReplicationProtectionContainersListOptionalParams,
  ): PagedAsyncIterableIterator<ProtectionContainer>;
  /**
   * Gets the details of a protection container.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainersGetOptionalParams,
  ): Promise<ReplicationProtectionContainersGetResponse>;
  /**
   * Operation to create a protection container.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Unique fabric ARM name.
   * @param protectionContainerName Unique protection container ARM name.
   * @param creationInput Creation input.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    creationInput: CreateProtectionContainerInput,
    options?: ReplicationProtectionContainersCreateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ReplicationProtectionContainersCreateResponse>,
      ReplicationProtectionContainersCreateResponse
    >
  >;
  /**
   * Operation to create a protection container.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Unique fabric ARM name.
   * @param protectionContainerName Unique protection container ARM name.
   * @param creationInput Creation input.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    creationInput: CreateProtectionContainerInput,
    options?: ReplicationProtectionContainersCreateOptionalParams,
  ): Promise<ReplicationProtectionContainersCreateResponse>;
  /**
   * The operation to a add a protectable item to a protection container(Add physical server).
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName The name of the fabric.
   * @param protectionContainerName The name of the protection container.
   * @param discoverProtectableItemRequest The request object to add a protectable item.
   * @param options The options parameters.
   */
  beginDiscoverProtectableItem(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    discoverProtectableItemRequest: DiscoverProtectableItemRequest,
    options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ReplicationProtectionContainersDiscoverProtectableItemResponse>,
      ReplicationProtectionContainersDiscoverProtectableItemResponse
    >
  >;
  /**
   * The operation to a add a protectable item to a protection container(Add physical server).
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName The name of the fabric.
   * @param protectionContainerName The name of the protection container.
   * @param discoverProtectableItemRequest The request object to add a protectable item.
   * @param options The options parameters.
   */
  beginDiscoverProtectableItemAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    discoverProtectableItemRequest: DiscoverProtectableItemRequest,
    options?: ReplicationProtectionContainersDiscoverProtectableItemOptionalParams,
  ): Promise<ReplicationProtectionContainersDiscoverProtectableItemResponse>;
  /**
   * Operation to remove a protection container.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Unique fabric ARM name.
   * @param protectionContainerName Unique protection container ARM name.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainersDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Operation to remove a protection container.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Unique fabric ARM name.
   * @param protectionContainerName Unique protection container ARM name.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectionContainersDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Operation to switch protection from one container to another.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param switchInput Switch protection input.
   * @param options The options parameters.
   */
  beginSwitchClusterProtection(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchClusterProtectionInput,
    options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ReplicationProtectionContainersSwitchClusterProtectionResponse>,
      ReplicationProtectionContainersSwitchClusterProtectionResponse
    >
  >;
  /**
   * Operation to switch protection from one container to another.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Fabric name.
   * @param protectionContainerName Protection container name.
   * @param switchInput Switch protection input.
   * @param options The options parameters.
   */
  beginSwitchClusterProtectionAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchClusterProtectionInput,
    options?: ReplicationProtectionContainersSwitchClusterProtectionOptionalParams,
  ): Promise<ReplicationProtectionContainersSwitchClusterProtectionResponse>;
  /**
   * Operation to switch protection from one container to another or one replication provider to another.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Unique fabric name.
   * @param protectionContainerName Protection container name.
   * @param switchInput Switch protection input.
   * @param options The options parameters.
   */
  beginSwitchProtection(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchProtectionInput,
    options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<ReplicationProtectionContainersSwitchProtectionResponse>,
      ReplicationProtectionContainersSwitchProtectionResponse
    >
  >;
  /**
   * Operation to switch protection from one container to another or one replication provider to another.
   * @param resourceGroupName The name of the resource group where the recovery services vault is
   *                          present.
   * @param resourceName The name of the recovery services vault.
   * @param fabricName Unique fabric name.
   * @param protectionContainerName Protection container name.
   * @param switchInput Switch protection input.
   * @param options The options parameters.
   */
  beginSwitchProtectionAndWait(
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    switchInput: SwitchProtectionInput,
    options?: ReplicationProtectionContainersSwitchProtectionOptionalParams,
  ): Promise<ReplicationProtectionContainersSwitchProtectionResponse>;
}
